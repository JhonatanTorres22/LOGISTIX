import { Component, inject, signal } from '@angular/core';
import { ProcesoComprasModule } from "@/proceso-compras/proceso-compras-module";
import { AddProductoAlmacen } from "../add-producto-almacen/add-producto-almacen";
import { ProductoAlmacenRepository } from '@/alcance/domain/repository/producto-almacen.repository';
import { ProductoAlmacenSignal } from '@/alcance/domain/signals/productoAlmacen.signal';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { TagModule } from "primeng/tag";
import { ListarProductoPorAlmacen } from '@/alcance/domain/models/producto-almacen.model';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { forkJoin } from 'rxjs';
import { ImageModule } from 'primeng/image';
import { ViewOrdenDespachar } from "../view-orden-despachar/view-orden-despachar";

@Component({
  selector: 'app-list-producto-almacen',
  imports: [ProcesoComprasModule, AddProductoAlmacen,ImageModule, TagModule, InputNumberModule, InputTextModule, ViewOrdenDespachar],
  templateUrl: './list-producto-almacen.html',
  styleUrl: './list-producto-almacen.scss'
})
export class ListProductoAlmacen {

  loading = false;
  visibleAddProductoAlmacen = false;

  private repository = inject(ProductoAlmacenRepository);
  private signal = inject(ProductoAlmacenSignal);
  private alert = inject(AlertService);

  listProductoPorAlmacen = this.signal.listProductoPorAlmacen;
  totalRegistros = this.signal.totalRegistros;
  tamanioPagina = this.signal.tamanioPagina;

  readonly opcionesListadoTabla = [6, 12, 24, 50, 100, 1000];

  buscarProducto = '';

  get listaFiltrada(): ListarProductoPorAlmacen[] {
    const q = this.buscarProducto.toLowerCase().trim();
    if (!q) return this.listProductoPorAlmacen();
    return this.listProductoPorAlmacen().filter(p =>
      String(p.idProductoServicio).includes(q)
    );
  }

  activarCeldaId: string | null = null;

  pendingChanges: Record<number, { aumentar: number, comprometer: number }> = {};

  get cantidadCambios(): number {
    return Object.keys(this.pendingChanges).length;
  }

  ngOnInit(): void {
    this.obtenerProductoPorAlmacen();
  }

  obtenerProductoPorAlmacen(pagina = 1, rows = this.tamanioPagina()): void {
    this.loading = true;
    this.repository.obtenerProductoPorAlmacen(3, pagina, rows).subscribe({
      next: (data) => {
        console.log(data.data);
        
        this.loading = false;
        this.signal.totalRegistros.set(data.totalRegistros);
        this.signal.listProductoPorAlmacen.set(data.data);
        this.pendingChanges = {};
        this.activarCeldaId = null;
      },
      error: (err: ApiError) => {
        this.loading = false;
        this.alert.showAlert(`Error: ${err.error.message}`, 'error');
      },
    });
  }

  cambioDePagina(event: any): void {
    const pagina = Math.floor(event.first / event.rows) + 1;
    this.signal.tamanioPagina.set(event.rows);
    this.obtenerProductoPorAlmacen(pagina, event.rows);
  }

  actualizarCambio(id: number, tipo: 'aumentar' | 'comprometer', valor: number): void {
    const item = this.listProductoPorAlmacen()
      .find(p => p.idProductoPorAlmacen === id);

    if (!item) return;

    let val = Math.max(0, valor ?? 0);

    if (tipo === 'comprometer') {
      val = Math.min(val, item.comprometido);
    }

    if (!this.pendingChanges[id]) {
      this.pendingChanges[id] = { aumentar: 0, comprometer: 0 };
    }

    this.pendingChanges[id][tipo] = val;

    if (this.pendingChanges[id].aumentar === 0 && this.pendingChanges[id].comprometer === 0) {
      delete this.pendingChanges[id];
    }
  }

  obtenerCantidadFinal(item: ListarProductoPorAlmacen): number {
    const cambio = this.pendingChanges[item.idProductoPorAlmacen];
    if (!cambio) return item.cantidad;

    return item.cantidad + cambio.aumentar - cambio.comprometer;
  }

  obtenerAumento(id: number): number {
    return this.pendingChanges[id]?.aumentar ?? 0;
  }

  obtenerDisminucion(id: number): number {
    return this.pendingChanges[id]?.comprometer ?? 0;
  }

  tieneCambio(id: number): boolean {
    const c = this.pendingChanges[id];
    return !!c && (c.aumentar > 0 || c.comprometer > 0);
  }

  cancelarCambios(): void {
    this.pendingChanges = {};
    this.activarCeldaId = null;
  }

  guardarCambios(): void {

    const aumentar: { idProductoPorAlmacen: number, cantidad: number }[] = [];
    const disminuir: { idProductoPorAlmacen: number, cantidad: number }[] = [];

    Object.entries(this.pendingChanges).forEach(([id, val]) => {

      if (val.aumentar > 0) {
        aumentar.push({
          idProductoPorAlmacen: +id,
          cantidad: val.aumentar
        });
      }

      if (val.comprometer > 0) {
        disminuir.push({
          idProductoPorAlmacen: +id,
          cantidad: val.comprometer
        });
      }

    });

    if (!aumentar.length && !disminuir.length) return;

    this.loading = true;
    const requests = [];

    console.log(aumentar, 'aumentar');
    console.log(disminuir, 'disminuir');


    if (aumentar.length) {
      requests.push(
        this.repository.aumentarCantidadProductoAlmacen(aumentar)
      );
    }

    if (disminuir.length) {
      requests.push(
        this.repository.disminuirCantidadProductoAlmacen(disminuir)
      );
    }
    forkJoin(requests).subscribe({
      next: () => {
        this.loading = false;
        this.alert.showAlert('Cambios guardados correctamente', 'success');
        this.obtenerProductoPorAlmacen();
      },
      error: (err: ApiError) => {
        this.loading = false;
        this.alert.showAlert(`Error: ${err.error.message}`, 'error');
      }
    });
  }

  numeroOrden: number | null = null;
  ordenBuscada: number | null = null;

  buscarOrden() {
    if (!this.numeroOrden) return;

    this.ordenBuscada = this.numeroOrden;
  }
}
