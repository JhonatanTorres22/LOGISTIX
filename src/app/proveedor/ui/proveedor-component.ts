import { Component } from '@angular/core';
import { ListProveedor } from "./list-proveedor/list-proveedor";
import { Card } from "@/core/components/card/card";

@Component({
  selector: 'app-proveedor-component',
  imports: [ListProveedor, Card],
  templateUrl: './proveedor-component.html',
  styleUrl: './proveedor-component.scss'
})
export class ProveedorComponent {

}
