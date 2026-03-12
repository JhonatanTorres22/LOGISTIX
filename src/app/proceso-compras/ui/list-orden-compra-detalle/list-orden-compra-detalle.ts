import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { SolicitudCompraRepository } from '@/proceso-compras/domain/repository/solicitud-compra.repository';
import { OrdenCompraDetalleSignal } from '@/proceso-compras/domain/signals/ordenCompraDetalle.signal';
import { SolicitudCompraSignal } from '@/proceso-compras/domain/signals/solicitud-compra.signal';
import { ProcesoComprasModule } from '@/proceso-compras/proceso-compras-module';
import { Component, effect, ElementRef, inject, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { UiIconButton } from "@/core/components/ui-icon-button/ui-icon-button";
import { EditarOrdenCompraDetalle, EliminarOrdenCompraDetalle, OrdenCompraDetalle } from '@/proceso-compras/domain/models/ordenCompraDetalle.model';
import { InputNumber, InputNumberModule } from "primeng/inputnumber";
import { Table, TableModule } from 'primeng/table';
import { ListClonadorProductos } from "../list-clonador-productos/list-clonador-productos";
import { PdfOrdenCompra } from "../pdf-orden-compra/pdf-orden-compra";
import { AnexoPorFaseSignal } from '@/proceso-compras/domain/signals/anexoPorFase.signal';
import { ProveedorProductoSignal } from '@/proveedor-producto/domain/signals/proveedor-producto.signal';

@Component({
  selector: 'app-list-orden-compra-detalle',
  imports: [ProcesoComprasModule, UiIconButton, InputNumberModule, TableModule, ListClonadorProductos, PdfOrdenCompra],
  templateUrl: './list-orden-compra-detalle.html',
  styleUrl: './list-orden-compra-detalle.scss'
})
export class ListOrdenCompraDetalle implements OnInit {
  @Input() tablaSolicitudCompra: any[] = []
  loading: boolean = false
  private repository = inject(SolicitudCompraRepository)
  private alert = inject(AlertService)
  private signal = inject(OrdenCompraDetalleSignal)
  listOrdenCompra = this.signal.listOrdenCompraDetalle
  private solicitudCompraSignal = inject(SolicitudCompraSignal)
  listSolicitudCompra = this.solicitudCompraSignal.listSolicitud
  actionOrdenCompra = this.signal.actionOrdenCompra
  nuevaLista: any[] = []
  private anexoSignal = inject(AnexoPorFaseSignal)
  selectAnexo = this.anexoSignal.selectAnexo
  listAnexo = this.anexoSignal.listAnexos
  otalPresupuestoProgramado = this.anexoSignal.totalPresupuestoProgramado
  visibleGenerarOrden: boolean = false
  visiblePdfOrdenCompra: boolean = false

  constructor() {
    effect(() => {
      if (!this.actionOrdenCompra()) { return }
      if (this.actionOrdenCompra()) {
        this.obtenerOrdenCompraDetalle()
        this.actionOrdenCompra.set(false)
      }
    })
  }
  ngOnInit(): void {
    this.obtenerOrdenCompraDetalle();
  }

  verPdfOrdenCompra(rowData: any) {
    const grupo = rowData._grupoUnico;

    // SOLO productos del grupo (proveedor + anexo)
    const productosProveedor = (this.nuevaLista ?? [])
      .filter(p => p._grupoUnico === grupo)
      .map(p => ({
        idOrdenCompra: p.idOrdenCompra,
        proveedor: p.proveedor,
        cantidad: p.cantidad,
        unidadMedida: p.unidadMedida,
        descripcionDelBien: p.descripcionDelBien,
        precioUnitario: p.precioUnitario,
        precioTotal: p.precioTotal,
        direccion: p.direccion,
        ruc: p.ruc,
        idProveedor : p.idProveedor,
        idAnexoPorFaseCronograma : p.idAnexoPorFaseCronograma
        // si NO quieres proveedor/ruc acá, bórralos y listo
      }));

    this.selectProveedorProducto.set(productosProveedor);
    this.visiblePdfOrdenCompra = true
    // (opcional) si también necesitas metadatos del header para el PDF:
    // this.selectProveedor.set({ proveedor: rowData.proveedor, ruc: rowData.ruc, idAnexoPorFase: rowData.idAnexoPorFase });
  }

  obtenerOrdenCompraDetalle = () => {
    this.loading = true;

    this.repository.obtenerOrdenCompraDetalle(this.listSolicitudCompra()[0].idSolicitudCompra)
      .subscribe({
        next: (data) => {
          console.log(data.data);
          this.listOrdenCompra.set(data.data);
          this.loading = false;
          this.alert.showAlert(`Listando orden de compra, ${data.message}`, 'success');

          const ordenes: any[] = [];

          this.listOrdenCompra().forEach((solicitud) => {
            solicitud.anexosPorFases.forEach((anexo) => {

              anexo.ordenCompra.forEach((orden) => {

                ordenes.push({
                  ...orden,

                  proveedor: orden.nombreProveedor,
                  ruc: orden.ruc?.trim(),

                  idAnexoPorFase: anexo.idAnexosPorFase,

                  _grupoUnico:
                    `${anexo.idAnexosPorFase}-${orden.nombreProveedor}`,

                  idOrdenCompra: orden.idOrdenCompra
                });

              });

            });
          });

          this.nuevaLista = ordenes;
        },
        error: (err: ApiError) => {
          this.alert.showAlert(`Error, ${err.error.message}`, 'error');
          this.loading = false;
        }
      });
  }



  confirmEliminar(rowData: any) {
    this.alert.sweetAlert('question', '¿Confirmar?', '¿Está seguro que desea eliminar este grupo?')
      .then(isConfirm => {
        if (!isConfirm) { return; }

        const idsAEliminar = this.nuevaLista
          .filter(orden => orden._grupoUnico === rowData._grupoUnico)
          .map(orden => ({ idOrdenCompra: orden.idOrdenCompra }));

        console.log('IDs a eliminar:', idsAEliminar);

        this.repository.eliminarOrdenCompraDetalle(idsAEliminar).subscribe({
          next: (res: ApiResponse) => {
            this.loading = false
            this.alert.showAlert(`Eliminado, ${res.message}`, 'success')
            this.obtenerOrdenCompraDetalle()

          },
          error: (err: ApiError) => {
            this.alert.showAlert(`Error, ${err.error.message}`, 'error')
            this.loading = false
          }
        })
      });
  }
  proveedoresAgrupados: any[] = [];
  signalProveedorProducto = inject(ProveedorProductoSignal)
  selectProveedorProducto = this.signalProveedorProducto.selectProveedorProducto
  seleccionarProveedor(proveedorConAnexo: string) {
    const [nombreProveedor, idAnexoStr] = proveedorConAnexo.split(' - ');
    const idAnexo = Number(idAnexoStr);

    const list = this.listOrdenCompra();
    if (!list || list.length === 0) return;

    const anexo = list[0].anexosPorFases.find(a => a.idAnexosPorFase === idAnexo);
    console.log(anexo?.ordenCompra);

    if (anexo && anexo.ordenCompra?.length > 0) {
      const productosProveedor = anexo.ordenCompra.filter(
        o => o.nombreProveedor === nombreProveedor
      );

      this.proveedoresAgrupados = productosProveedor;
      this.visiblePdfOrdenCompra = true;
      this.selectProveedorProducto.set(productosProveedor);
    }
  }

  recalcularTotales() {
    // fuerza a Angular a detectar cambios
    this.nuevaLista = [...this.nuevaLista];
  }


  getTotalOrdenes(): number {
    return this.nuevaLista.reduce((acc, item) => {
      return acc + (item.precioUnitario * item.cantidad);
    }, 0);
  }

  cantidadOriginal: { [id: number]: number } = {};

iniciarEdicion(row: any) {
  this.cantidadOriginal[row.idOrdenCompra] = row.cantidad;
}

cancelarEdicion(row: any) {

  const original = this.cantidadOriginal[row.idOrdenCompra];

  if (original !== undefined) {
    row.cantidad = original;
  }

  delete this.cantidadOriginal[row.idOrdenCompra];

  this.recalcularTotales();
}

  editarOrdenCompra = (ordenCompraDetalle: any) => {
    if(this.getTotalOrdenes() >   this.listOrdenCompra()[0].presupuestoProgramado){
      this.alert.showAlert(`Está excediendo el presupuesto del POA`, 'error')
      return
    }
    console.log(ordenCompraDetalle, 'editar orden');

    let editar: EditarOrdenCompraDetalle[] = [
      {
        idOrdenCompra: ordenCompraDetalle.idOrdenCompra,
        cantidad: ordenCompraDetalle.cantidad,
        precioTotal: ordenCompraDetalle.precioUnitario * ordenCompraDetalle.cantidad
      }
    ];
    console.log(editar);
    this.repository.editarOrdenCompraDetalle(editar).subscribe({
      next: (res: ApiResponse) => {
        this.loading = false
        this.alert.showAlert(`Editado, ${res.message}`, 'success')
        this.obtenerOrdenCompraDetalle()

      },
      error: (err: ApiError) => {
        this.alert.showAlert(`Error, ${err.error.message}`, 'error')
        this.loading = false
      }
    })


  }
}


