import { Component } from '@angular/core';
import { TableModule } from "primeng/table";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { AddEditServicios } from "../add-edit-servicios/add-edit-servicios";
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-list-servicios',
  imports: [TableModule, IconFieldModule, InputIconModule, UiButtonComponent,InputTextModule, AddEditServicios],
  templateUrl: './list-servicios.html',
  styleUrl: './list-servicios.scss'
})
export class ListServicios {

  loading : boolean = false
  visibleAddServicio : boolean = false

  seleccionarServicio = () => {
    this.visibleAddServicio = true
  }
}
