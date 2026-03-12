import { Component, effect, EventEmitter, inject, Input, Output } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { InputNumberModule } from "primeng/inputnumber";
import { TableModule } from "primeng/table";
import { ProcesoComprasModule } from '@/proceso-compras/proceso-compras-module';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { AnexoPorFase, InsertarAnexoPorFase, ResponseAnexoPorFase } from '@/proceso-compras/domain/models/anexoPorFase.model';
import { AnexoPorFaseRepository } from '@/proceso-compras/domain/repository/anexoSolicitud.repository';
import { AnexoPorFaseSignal } from '@/proceso-compras/domain/signals/anexoPorFase.signal';
import { AgregarOrdenCompraDetalle } from '@/proceso-compras/domain/models/ordenCompraDetalle.model';
import { switchMap } from 'rxjs';
import { SolicitudCompraSignal } from '@/proceso-compras/domain/signals/solicitud-compra.signal';
import { PdfOrdenCompra } from "../pdf-orden-compra/pdf-orden-compra";
import { ProveedorProductoSignal } from '@/proveedor-producto/domain/signals/proveedor-producto.signal';
import { SolicitudCompraRepository } from '@/proceso-compras/domain/repository/solicitud-compra.repository';
import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { DialogModule } from "primeng/dialog";
import { OrdenCompraDetalleSignal } from '@/proceso-compras/domain/signals/ordenCompraDetalle.signal';
@Component({
  selector: 'app-list-clonador-productos',
  imports: [DragDropModule, InputNumberModule, TableModule, ProcesoComprasModule, PdfOrdenCompra, DialogModule],
  templateUrl: './list-clonador-productos.html',
  styleUrl: './list-clonador-productos.scss'
})
export class ListClonadorProductos {
  loading: boolean = false
  @Input() tablaSolicitudCompra: any[] = []
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  private alert = inject(AlertService)
  private anexoRepository = inject(AnexoPorFaseRepository)
  private anexoSignal = inject(AnexoPorFaseSignal)
  listAnexo = this.anexoSignal.listAnexos
  selectAnexo = this.anexoSignal.selectAnexo

  idNuevoAnexoPorFase: number = 0
  mostrarPdfOrdenCompra: boolean = false

  private ordenCompraRepository = inject(SolicitudCompraRepository)


  clonados: any[] = [];

  private signal = inject(OrdenCompraDetalleSignal)
  listOrdenCompra = this.signal.listOrdenCompraDetalle
  actionOrdenCompra = this.signal.actionOrdenCompra
  actionAnexo = this.anexoSignal.actionAnexo
  totalPresupuestoProgramado = this.anexoSignal.totalPresupuestoProgramado

  constructor() {

  }

  drop(event: CdkDragDrop<any>) {

    if (this.clonados.length > 0) {
      this.alert.showAlert(`Tiene ${this.clonados.length} productos`, 'warning')
      return;
    }

    const proveedor = event.item.data;

    if (this.clonados.some(p => p.proveedor === proveedor)) return;

    const productosDelProveedor = event.previousContainer.data
      .filter((p: any) => p.proveedor === proveedor);

    const clones = productosDelProveedor.map((producto: any) => ({
      ...producto,
      idTemp: this.generarId()
    }));

    this.clonados = [...this.clonados, ...clones];

    this.clonados.sort((a, b) => a.proveedor.localeCompare(b.proveedor));
  }

  generarId(): string {
    return 'id-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);
  }

  generarAnexoPorFase = () => {
    if(this.getTotalClonados() > this.totalPresupuestoProgramado()){
      this.alert.showAlert(`Se ha excedido el presupuesto programado`, 'error')
      return
    }

    const generar: InsertarAnexoPorFase = {
      idAnexo: 3,
      idSolicitudCompra: this.listAnexo()[0].idSolicitudCompra
    };

    console.log(generar);

    this.anexoRepository.insertarAnexoPorFase(generar).subscribe({
      next: (res: ResponseAnexoPorFase) => {
        this.idNuevoAnexoPorFase = res.data
        this.loading = false
        console.log(res);
        this.alert.showAlert(`Agregado, ${res.message}`, 'success')
        if (res.isSuccess) {
          this.generarOrdenDeCompra()
        }
      },
      error: (err: ApiError) => {
        this.alert.showAlert(`Error, ${err.error.message}`)
        this.loading = false
      }
    })
  }



  generarOrdenDeCompra() {
    this.listAnexo()[0].fases[1].anexos[1]

    console.log(this.idNuevoAnexoPorFase);

    const idSolicitud = this.listAnexo()[0].idSolicitudCompra;

    const generarOrden: AgregarOrdenCompraDetalle[] =
      this.clonados.map(p => ({
        idSolicitudCompra: idSolicitud,
        idProveedorProducto: p.idProveedorProducto,
        idAnexoPorFase: this.idNuevoAnexoPorFase,
        cantidad: p.cantidad,
        unidadMedida: p.unidad,
        nombreProducto: p.productoNombre,
        precioUnitario: p.precio,
        precioTotal: (p.precio * p.cantidad)
      }));

    console.log(generarOrden, 'generarOrden');

    this.ordenCompraRepository.agregarOrdenCompraDetalle(generarOrden).subscribe({
      next: (res: ApiResponse) => {
        this.loading = false
        this.alert.showAlert(`Agregar Orden Compra, ${res.message}`, 'success')
        this.actionOrdenCompra.set(res.isSuccess)
        this.actionAnexo.set('REFRESH')
        this.close()
      },
      error: (err: ApiError) => {
        console.log(err);
        this.loading = false
        this.alert.showAlert(`Error, ${err.error.message}`, 'error')
      }
    })
  }


  isProveedorBloqueado(proveedor: string): boolean {
    return this.tablaSolicitudCompra
      .filter(p => p.proveedor === proveedor)
      .some(p => p.ordenCompra);
  }

  getTotalClonados(): number {
  return this.clonados.reduce((acc, item) => {
    return acc + (item.precio * item.cantidad);
  }, 0);
}

  close = () => {
    this.visible = false
    this.visibleChange.emit(false);
  }

}


