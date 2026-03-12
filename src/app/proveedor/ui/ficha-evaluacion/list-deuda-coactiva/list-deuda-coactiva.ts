import { Component, effect, inject, OnInit } from '@angular/core';
import { ViewPdfEvaluacion } from "../view-pdf-evaluacion/view-pdf-evaluacion";
import { TableModule } from "primeng/table";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { InputTextModule } from 'primeng/inputtext';
import { AddEditDeudaCoactiva } from "../add-edit-deuda-coactiva/add-edit-deuda-coactiva";
import { EliminarDeudaCoactiva, ListarDeudaCoactiva } from '@/proveedor/domain/models/deudaCoactiva.model';
import { DeudaCoactivaSignal } from '@/proveedor/domain/signals/deudaCoactiva.signal';
import { ProveedorModule } from '@/proveedor/proveedor-module';
import { DeudaCoactivaRepository } from '@/proveedor/domain/repositories/deudaCoactiva.repository';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { EvaluacionSunatSignal } from '@/proveedor/domain/signals/evaluacionSunat.signal';
import { UiIconButton } from "@/core/components/ui-icon-button/ui-icon-button";
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { UiCardNotItemsComponent } from "@/core/components/ui-card-not-items/ui-card-not-items.component";
import { ProveedorSignal } from '@/proveedor/domain/signals/proveedor.signal';

@Component({
  selector: 'app-list-deuda-coactiva',
  imports: [ViewPdfEvaluacion, TableModule, ProveedorModule, IconFieldModule, InputIconModule, UiButtonComponent, InputTextModule, AddEditDeudaCoactiva, UiIconButton, UiLoadingProgressBarComponent, UiCardNotItemsComponent],
  templateUrl: './list-deuda-coactiva.html',
  styleUrl: './list-deuda-coactiva.scss'
})
export class ListDeudaCoactiva implements OnInit {
  loading : boolean = false
  mostrarFormulario : boolean = false
  private signal = inject(DeudaCoactivaSignal)
  private alert = inject(AlertService)
  listDeudaCoactiva = this.signal.listDeudaCoactiva
  selectDeudaCoactiva = this.signal.selectDeudaCoactiva
  selectDeudaCoactivaDefault = this.signal.selectDeudaCoactivaDefault
  actionDeudaCoactiva = this.signal.actionDeudaCoactiva
  private repository = inject(DeudaCoactivaRepository)
  private evaluacionSunatSignal = inject(EvaluacionSunatSignal)
  selectEvaluacionSunat = this.evaluacionSunatSignal.selectEvaluacionSunat
  actionCerrarDrawer = this.evaluacionSunatSignal.actionCerrarDrawer
  private proveedorSignal = inject(ProveedorSignal)
  selectProveedor = this.proveedorSignal.proveedorSelect
  constructor(){
    effect(() => {
      if(!this.actionDeudaCoactiva()){return}
      if(this.actionDeudaCoactiva()){
        this.obtenerDeudaCoactiva()
        this.actionDeudaCoactiva.set(false)
      }
    })
  }
  ngOnInit(): void {
    this.obtenerDeudaCoactiva()
  }

  obtenerDeudaCoactiva = () => {
    this.loading = true
    this.repository.obtenerDeudaCoactiva(this.selectEvaluacionSunat().idSunat).subscribe({
      next : (data) => {
        this.listDeudaCoactiva.set(data.data)
        this.alert.showAlert(`Listar, ${data.message}`, 'success')
        this.loading = false
      },
      error : (err : ApiError) => {
        this.alert.showAlert(`Error, ${err.error.message}`, 'error')
        this.loading = false
      }
    })
  }

  seleccionarDeudaCoactiva = (deuda: ListarDeudaCoactiva) => {
    console.log('*');
    
    this.selectDeudaCoactiva.set(deuda)
    this.mostrarFormulario = true
  }

  confirmEliminarDeuda = (deudaCoactiva : ListarDeudaCoactiva) => {
    this.alert.sweetAlert('question', '¿Confirmar?', `¿Está seguro que desea eliminar?`)
    .then(isConfirm => {
      if(!isConfirm){this.loading = false; return}

      let eliminar : EliminarDeudaCoactiva = {
        idDeudaCoactiva : deudaCoactiva.idDeudaCoactiva
      }

      this.eliminarDeuda(eliminar)
    })
  }

  eliminarDeuda = (eliminar : EliminarDeudaCoactiva) => {
    this.repository.eliminarDeudaCoactiva(eliminar).subscribe({
      next : (res : ApiResponse) => {
        this.loading = false
        this.alert.showAlert(`Eliminado, ${res.message}`, 'success')
        this.obtenerDeudaCoactiva()
      },
      error : (err : ApiError) => {
        this.loading = false
        this.alert.showAlert(`Error, ${err.error.message}`, 'error')
      }
    })
  }

}
