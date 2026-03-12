import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { EliminarTrabajadoresPrestadores, TrabajadoresPrestadores } from '@/proveedor/domain/models/trabajadoresPrestadores.model';
import { TrabajadoresPrestadoresRepository } from '@/proveedor/domain/repositories/trabajadoresPrestadores.repository';
import { ProveedorSignal } from '@/proveedor/domain/signals/proveedor.signal';
import { TrabajadoresPrestadoresSignal } from '@/proveedor/domain/signals/trabajadoresPrestadores.signal';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { TableModule } from "primeng/table";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { UiIconButton } from "@/core/components/ui-icon-button/ui-icon-button";
import { InputTextModule } from 'primeng/inputtext';
import { AddEditTrabajadoresPrestadores } from "../add-edit-trabajadores-prestadores/add-edit-trabajadores-prestadores";
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { UiCardNotItemsComponent } from "@/core/components/ui-card-not-items/ui-card-not-items.component";
import { EvaluacionSunatSignal } from '@/proveedor/domain/signals/evaluacionSunat.signal';
import { ViewPdfEvaluacion } from "../view-pdf-evaluacion/view-pdf-evaluacion";

@Component({
  selector: 'app-list-trabajadores-prestadores',
  imports: [CommonModule, TableModule, IconFieldModule, InputIconModule, UiButtonComponent, UiIconButton, InputTextModule, AddEditTrabajadoresPrestadores, UiLoadingProgressBarComponent, UiCardNotItemsComponent, ViewPdfEvaluacion],
  templateUrl: './list-trabajadores-prestadores.html',
  styleUrl: './list-trabajadores-prestadores.scss'
})
export class ListTrabajadoresPrestadores implements OnInit {
  private repository = inject(TrabajadoresPrestadoresRepository)
  private proveedorSignal = inject(ProveedorSignal)
  selectProveedor = this.proveedorSignal.proveedorSelect
  private alert = inject(AlertService)
  private signal = inject(TrabajadoresPrestadoresSignal)
  listTrabajadores = this.signal.listTrabajador
  selecTrabajadoresDefault = this.signal.selectTrabajadorDefault
  selectTrabajadores = this.signal.selectTrabajadores
  actionTrabajadores = this.signal.actionTrabajadores
  loading: boolean = false
  visibleAdd: boolean = false
  private signalEvaluacion = inject(EvaluacionSunatSignal)
  selectEvaluacionSunat = this.signalEvaluacion.selectEvaluacionSunat
  actionCerrarDrawer = this.signalEvaluacion.actionCerrarDrawer

  constructor() {
    effect(() => {
      if (this.actionTrabajadores() == '') { return }
      if (this.actionTrabajadores() !== '') {
        this.obtener()
        this.actionTrabajadores.set('')
      }
    })
  }
  ngOnInit(): void {
    this.obtener()
  }

  obtener = () => {
    this.loading = true
    this.repository.obtener(this.selectEvaluacionSunat().idSunat).subscribe({
      next: (data) => {
        this.alert.showAlert(`Listando, ${data.message}`, 'success')
        this.listTrabajadores.set(data.data)
        this.loading = false
      },
      error: (err: ApiError) => {
        this.alert.showAlert(`Error, ${err.error.message}`, 'error')
        this.loading = false
      }
    })
  }

  seleccionarTrabajadores = (trabajadoresPrestadores: TrabajadoresPrestadores) => {
    this.selectTrabajadores.set(trabajadoresPrestadores)
    this.visibleAdd = true
  }

  eliminar = (trabajadores: TrabajadoresPrestadores) => {
    this.loading = true
    let eliminar: EliminarTrabajadoresPrestadores = {
      idTrabajadores: trabajadores.idTrabajadores
    }

    this.alert.sweetAlert('question', '¿Confirmar?', '¿Está seguro que desea eliminar?')
      .then(isConfirm => {
        if (!isConfirm) { this.loading = false; return }


        this.repository.eliminar(eliminar).subscribe({
          next: (res: ApiResponse) => {
            this.loading = false
            this.alert.showAlert(`Eliminado, ${res.message}`, 'success')
            this.obtener()
          },
          error: (err: ApiError) => {
            this.loading = false
            this.alert.showAlert(`Error, ${err.error.message}`, 'error')
          }
        })
      })

  }
}
