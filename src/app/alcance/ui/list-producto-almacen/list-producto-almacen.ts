import { Component } from '@angular/core';
import { ProcesoComprasModule } from "@/proceso-compras/proceso-compras-module";
import { AddProductoAlmacen } from "../add-producto-almacen/add-producto-almacen";

@Component({
  selector: 'app-list-producto-almacen',
  imports: [ProcesoComprasModule, AddProductoAlmacen],
  templateUrl: './list-producto-almacen.html',
  styleUrl: './list-producto-almacen.scss'
})
export class ListProductoAlmacen {

visibleAddProductoAlmacen: boolean = false

}
