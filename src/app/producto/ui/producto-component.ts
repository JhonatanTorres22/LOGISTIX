import { SharedModule } from '@/core/components/shared.module';
import { Component } from '@angular/core';
import { ListProductos } from "./list-productos/list-productos";

@Component({
  selector: 'app-producto-component',
  imports: [SharedModule, ListProductos],
  templateUrl: './producto-component.html',
  styleUrl: './producto-component.scss'
})
export class ProductoComponent {

}
