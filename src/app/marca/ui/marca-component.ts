import { Component } from '@angular/core';
import { Card } from "@/core/components/card/card";
import { ListMarca } from "./list-marca/list-marca";

@Component({
  selector: 'app-marca-component',
  imports: [Card, ListMarca],
  templateUrl: './marca-component.html',
  styleUrl: './marca-component.scss'
})
export class MarcaComponent {

}
