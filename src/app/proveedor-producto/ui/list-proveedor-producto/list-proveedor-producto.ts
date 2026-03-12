import { UiLoadingProgressBarComponent } from '@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component';
import { ProductoRepository } from '@/producto/domain/repository/producto.repository';
import { ProductoSignal } from '@/producto/domain/signals/producto.signal';
import { ProveedorProductoRepository } from '@/proveedor-producto/domain/repositories/proveedor-producto.repository';
import { ProveedorProductoSignal } from '@/proveedor-producto/domain/signals/proveedor-producto.signal';
import { ProveedorRepository } from '@/proveedor/domain/repositories/proveedor.repository';
import { ProveedorSignal } from '@/proveedor/domain/signals/proveedor.signal';
import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { catchError, forkJoin, of } from 'rxjs';
import { Tag } from "primeng/tag";
import { UiCardNotItemsComponent } from "@/core/components/ui-card-not-items/ui-card-not-items.component";

import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from 'primeng/inputtext';
import { GraficoPrecioProductos } from "../grafico-precio-productos/grafico-precio-productos";
import { UiIconButton } from "@/core/components/ui-icon-button/ui-icon-button";
import { ProductoHistoricoRepository } from '@/proveedor-producto/domain/repositories/producto-historico.repository';
import { mapProveedorToView } from '@/proveedor-producto/domain/mappers/proveedor-producto-view.mapper';
import { ProductoView, ProveedorProductoView } from '@/proveedor-producto/domain/models/proveedor-producto-view.model';
import { AgregarProveedorProducto, EditarProveedorProducto, EliminarProveedorProducto, ProductoPP, ProveedorPP } from '@/proveedor-producto/domain/models/proveedor-producto.model';
import { GuardarHistorico, LimpiarPreciosProducto } from '@/proveedor-producto/domain/models/producto-historico.model';
import { DatePickerModule } from 'primeng/datepicker';
import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';

@Component({
  selector: 'app-list-proveedor-producto',
  imports: [UiLoadingProgressBarComponent, DatePickerModule, InputTextModule, UiButtonComponent, Tag, UiCardNotItemsComponent, TableModule, CommonModule, ButtonModule, CheckboxModule, FormsModule, InputNumberModule, IconFieldModule, InputIconModule, GraficoPrecioProductos, UiIconButton],
  templateUrl: './list-proveedor-producto.html',
  styleUrl: './list-proveedor-producto.scss'
})
export class ListProveedorProducto implements OnInit {
  private proveedorProductoRepository = inject(ProveedorProductoRepository)
  private proveedorProductoSignal = inject(ProveedorProductoSignal)
  listProveedorProducto = this.proveedorProductoSignal.listProveedorProducto

  private productoRepository = inject(ProductoRepository)
  private productoSignal = inject(ProductoSignal)
  listProducto = this.productoSignal.productoList

  private proveedorRepository = inject(ProveedorRepository)
  private proveedorSignal = inject(ProveedorSignal)
  listProveedor = this.proveedorSignal.proveedorList

  loading: boolean = false
  listProveedorConProductos: ProveedorProductoView[] = []

  visibleGraficoPrecio: boolean = false
  private productoHistoricoRepository = inject(ProductoHistoricoRepository)

  // En tu componente
  hoy: Date = new Date();

  fechaOptions = {
    minDate: this.hoy,
    showIcon: true,
    monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
    monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
    dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    today: 'Hoy',
    clear: 'Limpiar',
  };

  constructor(
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {

    console.log('cargando datos');
    this.loading = true;

    forkJoin({
      proveedores: this.proveedorRepository.obtener(),
      proveedorProductos: this.proveedorProductoRepository.obtener(),
      categorias: this.productoRepository.obtener()
    })
      .pipe(
        catchError(err => {
          this.alert.showAlert('Error al cargar datos', 'error');
          return of(null);
        })
      )
      .subscribe(res => {

        if (!res) {
          this.loading = false;
          return;
        }

        // 1️⃣ Mapear proveedores con productos asignados
        this.listProveedorConProductos = mapProveedorToView(
          res.proveedores.data,
          res.proveedorProductos.data
        );

        // 2️⃣ Aplanar todos los productos de categorías (solo una vez)
        const todosProductos = res.categorias.data.flatMap((c: any) => c.productos);

        // 3️⃣ Generar productos disponibles por proveedor
        this.listProveedorConProductos.forEach(proveedor => {

          const productosAsignadosIds = new Set(
            proveedor.productos.map(p => p.id)
          );

          proveedor.productosDisponibles = todosProductos
            .filter(prod => !productosAsignadosIds.has(prod.id))
            .map(prod => ({
              id: prod.id,
              nombre: prod.nombreProducto,
              modelo: prod.modeloProducto || 'SIN MODELO',
              descripcion: prod.descripcionProducto || '',
              unidad: prod.unidad || 'UNIDAD',
              urlImagen: prod.urlImagen || 'assets/img/no-image.png',
              marca: prod.marca || {
                idMarca: 0,
                nombreMarca: 'SIN MARCA',
                descripcionMarca: ''
              },
              precio: 0,
              precioOriginal: 0,
              vigencia: '',
              selected: false,
              editado: false
            }));

          // 4️⃣ estado inicial UI
          proveedor.modoAgregar = proveedor.productos.length === 0;
          proveedor.puedeAgregar = false;

          this.actualizarEstadoEditar(proveedor);
        });

        this.loading = false;

      });
  }


  activarModoAgregar(proveedor: ProveedorProductoView) {
    proveedor.modoAgregar = true;
    proveedor.puedeAgregar = false;
  }

  toggleAll(proveedor: ProveedorProductoView, event: any) {

    const checked = event.checked;

    proveedor.productosDisponibles?.forEach(p => {
      p.selected = checked;
    });

    this.actualizarEstadoAgregar(proveedor);

  }
  actualizarEstadoAgregar(proveedor: ProveedorProductoView) {

    proveedor.puedeAgregar = proveedor.productosDisponibles?.some(p =>
      p.selected && p.precio > 0 && !!p.vigencia
    ) ?? false;

  }

  actualizarEstadoEditar(proveedor: ProveedorProductoView) {

    if (!proveedor.productos.length) {
      proveedor.puedeEditar = false;
      return;
    }

    proveedor.puedeEditar = proveedor.productos.every(p =>
      p.precioOriginal === 0 &&
      p.vigencia !== '0001-01-01T00:00:00'
    );

  }


  cancelarAgregar(proveedor: ProveedorProductoView) {

    proveedor.modoAgregar = false;
    proveedor.puedeAgregar = false;

    proveedor.productosDisponibles?.forEach(p => {
      p.selected = false;
      p.precio = 0;
      p.vigencia = '';
    });

  }

  agregarProductosMasivo(proveedor: ProveedorProductoView): void {
    console.log(proveedor);

    this.loading = true

    const agregarMasivo: AgregarProveedorProducto[] =
      (proveedor.productosDisponibles ?? [])
        .filter(p => p.selected && p.precio > 0 && p.id != null)
        .map(p => ({
          idProveedor: proveedor.idProveedor,
          idProducto: p.id!,
          precio: p.precio,
          vigencia: p.vigencia ? new Date(p.vigencia).toISOString() : ''
        }));

    console.log(agregarMasivo, '*');


    if (agregarMasivo.length === 0) {
      this.loading = false;
      this.alert.showAlert('Seleccione al menos un producto con precio válido', 'warning');
      return;
    }

    console.log(agregarMasivo);

    this.proveedorProductoRepository.agregarProveedorProducto(agregarMasivo).subscribe({
      next: () => {
        this.alert.showAlert('Productos agregados correctamente', 'success');
        proveedor.modoAgregar = false;
        proveedor.puedeAgregar = false;

        this.loading = false;
        this.cargarDatos();
      },
      error: () => {
        this.alert.showAlert('Error al agregar productos', 'error');
        this.loading = false;
      }
    });
  }


  onPrecioChange(prod: ProductoView, proveedor: ProveedorProductoView) {

    prod.precioModificado = true;

    this.actualizarEstadoAgregar(proveedor);

  }


  actualizarProductosMasivos(proveedor: ProveedorProductoView): void {

    const editarMasivo: EditarProveedorProducto[] =
      proveedor.productos
        .filter(p => p.idProveedorProducto != null)
        .map(p => ({
          idProveedorProducto: p.idProveedorProducto!,
          precio: p.precio,
          vigencia: p.vigencia ? new Date(p.vigencia).toISOString() : ''
        }));

    if (editarMasivo.length === 0) {
      this.alert.showAlert('No hay precios para actualizar', 'info');
      return;
    }

    this.loading = true;

    this.proveedorProductoRepository.editarProveedorProducto(editarMasivo).subscribe({
      next: () => {

        this.alert.showAlert('Precios actualizados correctamente', 'success');

        this.loading = false;

        // refrescar lista
        this.cargarDatos();
      },
      error: (err: { userMessage?: string }) => {

        this.loading = false;

        this.alert.showAlert(
          `Error al actualizar los precios${err?.userMessage ? `, ${err.userMessage}` : ''}`,
          'error'
        );
      }
    });

  }
  guardarProductoHistorico = (proveedor: ProveedorProductoView) => {
    this.loading = true
    const guardarHistorico: GuardarHistorico[] =
      proveedor.productos
        .filter(
          (p): p is ProductoView & { idProveedorProducto: number; vigencia: Date } =>
            p.idProveedorProducto != null && p.vigencia != null
        )
        .map(p => ({
          idProveedorProducto: p.idProveedorProducto,
          precio: p.precio,
          vigencia: p.vigencia
        }));

    console.log(guardarHistorico, 'guardar historico');

    this.productoHistoricoRepository.guardarHistorico(guardarHistorico).subscribe({
      next: () => {
        this.alert.showAlert('Precios actualizados', 'success');
        // this.loading = false
        this.limpiarPrecios(proveedor)
      },
      error: (err) => {
        this.loading = false;
        this.alert.showAlert(`Error, ${err.error.message}`, 'error');
      }
    });
  }


  limpiarPrecios = (proveedor: ProveedorProductoView) => {
    let limpiar: LimpiarPreciosProducto = {
      idProveedor: proveedor.idProveedor
    }
    console.log(limpiar);

    this.productoHistoricoRepository.limpiarPrecios(limpiar).subscribe({
      next: () => {
        this.loading = false
        this.alert.showAlert('Precios actualizados', 'success');
        this.cargarDatos();
      },
      error: (err) => {
        this.loading = false
        this.alert.showAlert(`Error, ${err.error.message}`, 'error')
      }
    })
  }

  eliminarProveedorProducto = (producto: ProductoView) => {
    this.loading = true
    console.log(producto);
    const eliminar: EliminarProveedorProducto[] = [
      {
        idProveedorProducto: producto.idProveedorProducto!
      }
    ];

    this.proveedorProductoRepository.eliminarProveedorProducto(eliminar).subscribe({
      next: (res: ApiResponse) => {
        this.loading = false
        this.alert.showAlert(`Eliminado, ${res.message}`, 'success')
        this.cargarDatos();
      },
      error: (err: ApiError) => {
        this.loading = false
        this.alert.showAlert(`Error, ${err.error.message}`, `error`)
      }
    })
    console.log(eliminar)
  }

  onVigenciaChange(_: ProductoView, proveedor: ProveedorProductoView) {
    this.actualizarEstadoAgregar(proveedor);
  }
}
