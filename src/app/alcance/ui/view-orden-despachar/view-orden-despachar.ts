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
import { AumentarCantidadProductoAlmacen, DisminuirCantidadProductoAlmacen } from '@/alcance/domain/models/producto-almacen.model';
import { ProductoAlmacenRepository } from '@/alcance/domain/repository/producto-almacen.repository';
import { ProductoAlmacenSignal } from '@/alcance/domain/signals/productoAlmacen.signal';

@Component({
  selector: 'app-view-orden-despachar',
  imports: [CommonModule, TagModule, ButtonModule, TableModule, DialogModule, ProcesoComprasModule],
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
      this.seleccionadosPorAnexo[anexo.idAnexosPorFase] = []
    })
  }

  onSelectionChange(): void {
    const todos = Object.values(this.seleccionadosPorAnexo).flat()
    this.seleccionados.set(todos)
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

    console.log('Payload limpio:', payload)
    this.loading = true
    this.alert.sweetAlert('question', `¿CONFIRMAR ${this.tipoMovimiento}?`,  `'¿Está seguro que desea realizar ${this.tipoMovimiento} a los productos?`)
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
        this.loading = false
        this.alert.showAlert(`Cantidad aumentada, ${res.message}`, 'success')
        this.actionProductoAlmacen.set(res.isSuccess)
        this.closeDialog()
      },
      error: (err: ApiError) => {
        this.loading = false
        this.alert.showAlert(`Error al aumentar, ${err.error.message}`, 'error')
      }
    })
  }

  disminuirProductoAlmacen(disminuirProducto: DisminuirCantidadProductoAlmacen[]) {
    this.repository.disminuirCantidadProductoAlmacen(disminuirProducto).subscribe({
      next: (res: ApiResponse) => {
        this.alert.showAlert(`Cantidad disminuida, ${res.message}`, 'success')
        if(res.isSuccess){
          this.actualizarEstadoAtencionOrden()
        }
      },
      error: (err: ApiError) => {
        this.loading = false
        this.alert.showAlert(`Error al disminuir, ${err.error.message}`, 'error')
      }
    })
  }

  actualizarEstadoAtencionOrden (){
    const idsOrdenCompra = this.seleccionados().map(ordenCompra => ({
      idOrdenCompra : ordenCompra.idOrdenCompra
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

