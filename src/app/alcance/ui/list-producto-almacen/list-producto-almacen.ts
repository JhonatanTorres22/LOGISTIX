import { Component, effect, inject, signal } from '@angular/core';
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
import { SelectButtonModule } from 'primeng/selectbutton';
import { ImageModule } from 'primeng/image';
import { ViewOrdenDespachar } from "../view-orden-despachar/view-orden-despachar";
import { FloatLabel } from 'primeng/floatlabel';
import { InputNumber } from 'primeng/inputnumber';
import { IconFieldModule } from "primeng/iconfield";
import { CategoriaModule } from "@/categoria/categoria-module";
import { UiIconButton } from "@/core/components/ui-icon-button/ui-icon-button";
@Component({
  selector: 'app-list-producto-almacen',
  imports: [ProcesoComprasModule, AddProductoAlmacen, ImageModule, FloatLabel, InputNumber, TagModule, InputNumberModule, InputTextModule, ViewOrdenDespachar, SelectButtonModule, IconFieldModule, CategoriaModule, UiIconButton],
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
  actionProductoAlmacen = this.signal.actionProductoAlmacen

  readonly opcionesListadoTabla = [6, 12, 24, 50, 100, 1000];

  buscarProducto = '';

  constructor(){
    effect(() => {
      if(!this.actionProductoAlmacen()){return}
      if(this.actionProductoAlmacen()){
        this.obtenerProductoPorAlmacen()
        this.actionProductoAlmacen.set(false)
      }
    })
  }

  get listaFiltrada(): ListarProductoPorAlmacen[] {
  const q = this.buscarProducto.toLowerCase().trim();
  if (!q) return this.listProductoPorAlmacen();

  return this.listProductoPorAlmacen().filter(p =>
    String(p.nombreProducto).toLowerCase().includes(q)
  );
}

tipoMovimiento: 'ENTRADA' | 'SALIDA' | null = null;

opcionesMovimiento = [
  { label: 'ENTRADA', value: 'ENTRADA', icon: 'pi pi-arrow-circle-down' },
  { label: 'SALIDA',  value: 'SALIDA',  icon: 'pi pi-arrow-circle-up'   }
];

visibleOrdenCompra : boolean = false

  obtenerProductoPorAlmacen(pagina = 1, rows = this.tamanioPagina()): void {
    this.loading = true;
    this.repository.obtenerProductoPorAlmacen(3, pagina, rows).subscribe({
      next: (data) => {
        console.log(data.data);
        
        this.loading = false;
        this.signal.totalRegistros.set(data.totalRegistros);
        this.listProductoPorAlmacen.set(data.data)

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

  numeroOrden: number | null = null;
  ordenBuscada: number | null = null;

  buscarOrden() {
    
    if (!this.numeroOrden) return;
    this.ordenBuscada = this.numeroOrden;
    this.visibleOrdenCompra = true
    console.log(this.visibleOrdenCompra);
    
  }
}
