import { SharedModule } from '@/core/components/shared.module';
import { Component, computed, EventEmitter, inject, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { ProveedorProductoRepository } from '@/proveedor-producto/domain/repositories/proveedor-producto.repository';
import { ProveedorProductoSignal } from '@/proveedor-producto/domain/signals/proveedor-producto.signal';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { UiCardNotItemsComponent } from "@/core/components/ui-card-not-items/ui-card-not-items.component";
import { debounceTime, distinctUntilChanged, filter, Subject } from 'rxjs';
import { TagModule } from "primeng/tag";

@Component({
  selector: 'app-select-proveedor-producto',
  imports: [SharedModule, UiLoadingProgressBarComponent, UiCardNotItemsComponent, TagModule],
  templateUrl: './select-proveedor-producto.html',
  styleUrl: './select-proveedor-producto.scss'
})
export class SelectProveedorProducto implements OnInit {
  @Input() visible: boolean = false
  @Output() visibleChange = new EventEmitter<boolean>();

  repostory = inject(ProveedorProductoRepository)
  signal = inject(ProveedorProductoSignal)
  selectProveedroProducto = this.signal.selectProveedorProducto
  selectProveedorProductoEditar = this.signal.selectProveedorProductoEditar
  listProveedorProducto = this.signal.listProveedorProducto
  listProveedorProductoUnificado = this.signal.listProveedorProductoUnificado
  loading: boolean = false

  tempSelectedProveedorProductos: any[] = [];

  selectedProveedorProductos: any[] = [];

  constructor(
    private alert: AlertService,
  ) { }

  private searchProducto$ = new Subject<string>();
  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible']?.currentValue === true) {
      this.tempSelectedProveedorProductos = [
        ...this.selectProveedroProducto()
      ];
    }
  }

ngOnInit() {

  this.searchProducto$
    .pipe(
      debounceTime(500), 
      distinctUntilChanged(),
      filter(valor => valor.length >= 4)
    )
    .subscribe(valor => {
      this.obtenerPorNombreProducto(valor);
    });

}
buscarProducto(event: Event) {
  const valor = (event.target as HTMLInputElement).value.trim();

  if (valor.length < 4) {
    this.listProveedorProductoUnificado.set([]);
    return;
  }

  this.searchProducto$.next(valor);
}

obtenerPorNombreProducto(nombre: string) {
  this.loading = true;

  this.repostory.obtenerPorNombreProducto(nombre).subscribe({
    next: (data) => {

      const tabla = data.data.map(item => ({
        proveedor: item.proveedor?.nombreRs,
        tipoProveedor: item.proveedor?.tipoProveedor,
        ruc: item.proveedor?.ruc,
        direccion: item.proveedor?.direccionFiscal,
        evaluacion : item.proveedor?.estadoEvaluacion,

        idProveedorProducto: item.idProveedorProducto,
        vigencia: item.vigencia,
        precio: item.precio,

        productoNombre: item.producto?.nombre,
        modelo: item.producto?.modelo,
        descripcion: item.producto?.descripcion,
        unidad: item.producto?.unidadDeMedida,
        url: item.producto?.url,

        marca: item.producto?.marca ?? {
          idMarca: 0,
          nombreMarca: '',
          descripcionMarca: ''
        },
      }));


      const seleccionados = this.selectProveedorProductoEditar();

      let resultado = tabla;

      if (seleccionados) {

        const productoBase = seleccionados.productoNombre;
        const proveedorActual = seleccionados.proveedor;

        resultado = tabla.filter(item =>
          item.productoNombre?.trim().toLowerCase() ===
          productoBase.trim().toLowerCase() &&
          item.proveedor !== proveedorActual
        );
      }

      this.listProveedorProductoUnificado.set(resultado);
      this.loading = false;
    },
    error: () => {
      this.alert.showAlert('Error al listar los proveedores', 'error');
      this.loading = false;
    }
  });
}
  get esModoEditar(): boolean {
    return !!this.selectProveedorProductoEditar();
  }


  onSelectionChange(event: any[]) {

    // Filtrar los que sí tienen precio válido
    this.tempSelectedProveedorProductos = event.filter(
      item => item.precio > 0
    );

  }
  guardarSeleccionados() {
    const conCantidad = this.tempSelectedProveedorProductos.map(item => ({
      ...item,
      cantidad: item.cantidad ?? 1
    }));

    this.selectProveedroProducto.set(conCantidad);

    this.closeDialog()
  }


  closeDialog() {
    this.listProveedorProductoUnificado.set([]);
    this.visible = false;
    this.visibleChange.emit(false);
  }

  esVencido(vigencia: string): boolean {
  if (!vigencia) return false;

  const fechaVigencia = new Date(vigencia);
  const hoy = new Date();

  // Quitamos hora para comparar solo fecha
  hoy.setHours(0, 0, 0, 0);
  fechaVigencia.setHours(0, 0, 0, 0);

  return fechaVigencia < hoy;
}

getEvaluacionSeverity(estado: string): string {
  switch (estado) {
    case 'EVALUACIÓN EN PROCESO':
      return 'warn'; // amarillo
    case 'APROBADO':
      return 'info'; // azul
    case 'RECHAZADO':
      return 'danger'; // rojo
    default:
      return 'secondary';
  }
}
}
