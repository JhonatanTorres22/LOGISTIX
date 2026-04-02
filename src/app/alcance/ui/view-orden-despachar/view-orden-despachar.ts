import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { ActualizarEstadoAtencionOrden, AnexosPorFaseOrdenCompra, OrdenCompraDetalle } from '@/proceso-compras/domain/models/ordenCompraDetalle.model';
import { SolicitudCompraRepository } from '@/proceso-compras/domain/repository/solicitud-compra.repository';
import { OrdenCompraDetalleSignal } from '@/proceso-compras/domain/signals/ordenCompraDetalle.signal';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, signal } from '@angular/core';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { TagModule } from "primeng/tag";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { DialogModule } from "primeng/dialog";
import { ProcesoComprasModule } from "@/proceso-compras/proceso-compras-module";
import { AumentarCantidadProductoAlmacen, DisminuirCantidadProductoAlmacen, InsertarFechaVencimientoProductoAlmacen } from '@/alcance/domain/models/producto-almacen.model';
import { ProductoAlmacenRepository } from '@/alcance/domain/repository/producto-almacen.repository';
import { ProductoAlmacenSignal } from '@/alcance/domain/signals/productoAlmacen.signal';
import { DatePickerModule } from 'primeng/datepicker';
import { UiDatePicker } from "@/core/components/ui-date-picker/ui-date-picker";
@Component({
  selector: 'app-view-orden-despachar',
  imports: [CommonModule, TagModule, ButtonModule, TableModule, DialogModule, ProcesoComprasModule, DatePickerModule, UiDatePicker],
  templateUrl: './view-orden-despachar.html',
  styleUrl: './view-orden-despachar.scss'
})
export class ViewOrdenDespachar implements OnInit {
  loading = false

  @Input() ordenId!: number | null;
  private alert = inject(AlertService)
  private repositorySolicitudCompra = inject(SolicitudCompraRepository)
  private repository = inject(ProductoAlmacenRepository)
  private signal = inject(OrdenCompraDetalleSignal)

  listOrdenCompra = this.signal.listOrdenCompraDetalle

  @Input() visible: boolean = false
  @Input() tipoMovimiento: string | null = ''
  @Output() visibleChange = new EventEmitter<boolean>();

  private signalProductoAlmacen = inject(ProductoAlmacenSignal);
  actionProductoAlmacen = this.signalProductoAlmacen.actionProductoAlmacen

  seleccionadosPorAnexo: Record<number, OrdenCompraDetalle[]> = {}
  seleccionados = signal<OrdenCompraDetalle[]>([])

  fechasVencimiento: Record<string, string | null> = {};

  ngOnInit(): void {
    if (this.ordenId) {
      this.obtenerOrdenCompra(this.ordenId);
    }
  }


  obtenerOrdenCompra(id: number): void {
    if (this.ordenId == null || this.ordenId == 0) { return }
    this.loading = true
    this.repositorySolicitudCompra.obtenerOrdenCompraDetalle(id).subscribe({
      next: (data) => {
        this.listOrdenCompra.set(data.data)
        this.inicializarSelecciones()
        this.loading = false
        this.alert.showAlert(`Listar Orden, ${data.message}`, 'success')
      },
      error: (err: ApiError) => {
        this.loading = false
        this.alert.showAlert(`Error, ${err.error.message}`, 'error')
      }
    })
  }

  private inicializarSelecciones(): void {
    const data = this.listOrdenCompra()
    if (!data?.length) return
    data[0].anexosPorFases.forEach((anexo: AnexosPorFaseOrdenCompra) => {
      this.seleccionadosPorAnexo[anexo.idAnexosPorFase] = [];

      anexo.ordenCompra.forEach(item => {
        this.fechasVencimiento[item.idProductoPorAlmacen] = null;
      });
    });
  }

  onSelectionChange(): void {
    const todos = Object.values(this.seleccionadosPorAnexo).flat()
    this.seleccionados.set(todos)
  }

  tieneSeleccionConFecha(): boolean {
  const items = this.seleccionados();

  if (items.length === 0) return false;

  return items.every(item =>
    this.fechasVencimiento[item.idProductoPorAlmacen]
  );
}

  despacharSeleccionados(): void {
    const items = this.seleccionados()

    if (!this.tipoMovimiento) {
      this.alert.showAlert(`No se ha seleccionado el tipo de movimiento`, 'error')
      return
    }

    const payload = items.map(item => ({
      idProductoPorAlmacen: item.idProductoPorAlmacen,
      cantidad: item.cantidad
    }))

    this.loading = true
    this.alert.sweetAlert('question', `¿CONFIRMAR ${this.tipoMovimiento}?`, `¿Está seguro que desea realizar ${this.tipoMovimiento} a los productos?`)
      .then(isConfirm => {
        if (!isConfirm) { return }

        switch (this.tipoMovimiento) {
          case 'ENTRADA': {
            this.aumentarProductoAlmacen(payload)
            
          }; break;

          case 'SALIDA': {
            this.disminuirProductoAlmacen(payload)
          }; break;
        }
      })

  }

  aumentarProductoAlmacen(aumentarProductos: AumentarCantidadProductoAlmacen[]) {
    this.repository.aumentarCantidadProductoAlmacen(aumentarProductos).subscribe({
      next: (res: ApiResponse) => {
        this.alert.showAlert(`Cantidad aumentada, ${res.message}`, 'success')
        if (res.isSuccess) {
          this.insertarFechaVencimientoProductoAlmacen()
        }
      },
      error: (err: ApiError) => {
        this.loading = false
        this.alert.showAlert(`Error al aumentar, ${err.error.message}`, 'error')
      }
    })
  }
  insertarFechaVencimientoProductoAlmacen() {
    const sinFecha = this.seleccionados().some(item =>
      !this.fechasVencimiento[item.idProductoPorAlmacen]
    );

    if (sinFecha) {
      this.alert.showAlert('Todos los productos deben tener fecha de vencimiento', 'error');
      return;
    }

    const productoConFecha = this.seleccionados().map(ordenCompra => ({
      idProductoPorAlmacen: ordenCompra.idProductoPorAlmacen,
      fechaVencimiento: this.fechasVencimiento[ordenCompra.idProductoPorAlmacen]!
    }));

    console.log(productoConFecha);
    
    this.repository.insertarFechaVencimientoProductoAlmacen(productoConFecha).subscribe({
      next: (res: ApiResponse) => {
        this.loading = false
        this.alert.showAlert(`Fecha de vencimiento registrada, ${res.message}`, 'success')
        this.actionProductoAlmacen.set(res.isSuccess)
        this.loading = false
        this.closeDialog()
      },
      error: (err: ApiError) => {
        this.loading = false
        this.alert.showAlert(`Error al registrar fecha de vencimiento, ${err.error.message}`, 'error')
      }
    })
  }

  disminuirProductoAlmacen(disminuirProducto: DisminuirCantidadProductoAlmacen[]) {
    this.repository.disminuirCantidadProductoAlmacen(disminuirProducto).subscribe({
      next: (res: ApiResponse) => {
        this.alert.showAlert(`Cantidad disminuida, ${res.message}`, 'success')
        if (res.isSuccess) {
          this.actualizarEstadoAtencionOrden()
        }
      },
      error: (err: ApiError) => {
        this.loading = false
        this.alert.showAlert(`Error al disminuir, ${err.error.message}`, 'error')
      }
    })
  }

  actualizarEstadoAtencionOrden() {
    const idsOrdenCompra = this.seleccionados().map(ordenCompra => ({
      idOrdenCompra: ordenCompra.idOrdenCompra
    }))

    this.repositorySolicitudCompra.actualizarEstadoAtencionOrden(idsOrdenCompra).subscribe({
      next: (res: ApiResponse) => {
        this.loading = false
        this.alert.showAlert(`Estados Actualizados, ${res.message}`, 'success')
        this.actionProductoAlmacen.set(res.isSuccess)
        this.closeDialog()
      },
      error: (err: ApiError) => {
        this.loading = false
        this.alert.showAlert(`Error al actualizar estado, ${err.error.message}`, 'error')
      }
    })
  }



  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}

