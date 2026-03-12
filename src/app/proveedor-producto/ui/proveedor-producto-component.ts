import { SharedModule } from '@/core/components/shared.module';
import { Component } from '@angular/core';
import { ListProveedorProducto } from "./list-proveedor-producto/list-proveedor-producto";

@Component({
  selector: 'app-proveedor-producto-component',
  imports: [SharedModule, ListProveedorProducto],
  templateUrl: './proveedor-producto-component.html',
  styleUrl: './proveedor-producto-component.scss'
})
export class ProveedorProductoComponent {

}
