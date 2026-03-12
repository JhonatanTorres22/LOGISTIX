import { Component } from '@angular/core';
import { Card } from "@/core/components/card/card";
import { ListServicios } from "./list-servicios/list-servicios";

@Component({
  selector: 'app-servicios-component',
  imports: [Card, ListServicios],
  templateUrl: './servicios-component.html',
  styleUrl: './servicios-component.scss'
})
export class ServiciosComponent {}
