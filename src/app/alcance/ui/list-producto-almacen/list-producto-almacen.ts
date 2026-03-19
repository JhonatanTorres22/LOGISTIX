import { Component, inject, signal } from '@angular/core';
import { ProcesoComprasModule } from "@/proceso-compras/proceso-compras-module";
import { AddProductoAlmacen } from "../add-producto-almacen/add-producto-almacen";
import { ProductoAlmacenRepository } from '@/alcance/domain/repository/producto-almacen.repository';
import { ProductoAlmacenSignal } from '@/alcance/domain/signals/productoAlmacen.signal';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { ApiError } from '@/core/interceptors/error-message.model';
import { TagModule } from "primeng/tag";

@Component({
  selector: 'app-list-producto-almacen',
  imports: [ProcesoComprasModule, AddProductoAlmacen, TagModule],
  templateUrl: './list-producto-almacen.html',
  styleUrl: './list-producto-almacen.scss'
})
export class ListProductoAlmacen {

  loading: boolean = false
  visibleAddProductoAlmacen: boolean = false
  private repository = inject(ProductoAlmacenRepository)
  private signal = inject(ProductoAlmacenSignal)
  listProductoPorAlmacen = this.signal.listProductoPorAlmacen
  // dataProductoPorAlmacen = this.signal.dataProductoPorAlmacen
  totalRegistros = this.signal.totalRegistros
  paginaActual = this.signal.paginaActual
  tamanioPagina = this.signal.tamanioPagina
  private alert = inject(AlertService)

  obtenerProductoPorAlmacen = (pagina = 1, rows = 12) => {
    console.log(pagina);
    console.log(rows);
  this.loading = true

  this.repository.obtenerProductoPorAlmacen(3, pagina, rows).subscribe({
    next: (data) => {
      console.log(data);
      
      this.loading = false

      this.totalRegistros.set(data.totalRegistros)
      this.listProductoPorAlmacen.set(data.data)

      console.log('pagina backend:', pagina)
      console.log('data:', data.data)
    },
    error: (err: ApiError) => {
      this.loading = false
      this.alert.showAlert(`Error, ${err.error.message}`, 'error')
    }
  })
}

onPageChange(event: any) {
  setTimeout(() => {
    const pagina = (event.first / event.rows) + 1
    const rows = event.rows
    this.tamanioPagina.set(rows)

    this.obtenerProductoPorAlmacen(pagina, rows)
  })
}
}
