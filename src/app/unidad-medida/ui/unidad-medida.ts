import { Component } from '@angular/core';
import { Card } from "@/core/components/card/card";
import { ListUnidadMedida } from "./list-unidad-medida/list-unidad-medida";

@Component({
  selector: 'app-unidad-medida',
  imports: [Card, ListUnidadMedida],
  templateUrl: './unidad-medida.html',
  styleUrl: './unidad-medida.scss'
})
export class UnidadMedida {

}
