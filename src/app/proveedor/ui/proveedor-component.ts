import { Component } from '@angular/core';
import { ListProveedor } from "./list-proveedor/list-proveedor";

@Component({
  selector: 'app-proveedor-component',
  imports: [ListProveedor],
  templateUrl: './proveedor-component.html',
  styleUrl: './proveedor-component.scss'
})
export class ProveedorComponent {

}
