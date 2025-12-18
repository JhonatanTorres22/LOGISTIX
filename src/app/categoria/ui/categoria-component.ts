import { SharedModule } from '@/core/components/shared.module';
import { Component } from '@angular/core';
import { ListCategorias } from "./list-categorias/list-categorias";

@Component({
  selector: 'app-categoria-component',
  imports: [SharedModule, ListCategorias],
  templateUrl: './categoria-component.html',
  styleUrl: './categoria-component.scss'
})
export class CategoriaComponent {

}
