import { Component } from '@angular/core';
import { Card } from "@/core/components/card/card";
import { TreeSolicitudes } from "./tree-solicitudes/tree-solicitudes";

@Component({
  selector: 'app-panel-solicitudes-component',
  imports: [Card,  TreeSolicitudes],
  templateUrl: './panel-solicitudes-component.html',
  styleUrl: './panel-solicitudes-component.scss'
})
export class PanelSolicitudesComponent {

}
