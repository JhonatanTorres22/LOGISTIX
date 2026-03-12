import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { EliminarRepresentanteLegal, ListarRepresentanteLegal } from '@/proveedor/domain/models/representanteLegal.model';
import { RepresentanteLegalRepository } from '@/proveedor/domain/repositories/representanteLegal.repository';
import { RepresentanteLegalSignal } from '@/proveedor/domain/signals/representanteLegal.signal';
import { ProveedorModule } from '@/proveedor/proveedor-module';
import { Component, effect, inject, OnInit } from '@angular/core';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { UiCardNotItemsComponent } from "@/core/components/ui-card-not-items/ui-card-not-items.component";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { UiIconButton } from "@/core/components/ui-icon-button/ui-icon-button";
import { AddEditRepresentanteLegal } from "../add-edit-representante-legal/add-edit-representante-legal";
import { InputTextModule } from 'primeng/inputtext';
import { EvaluacionSunatSignal } from '@/proveedor/domain/signals/evaluacionSunat.signal';
import { ViewPdfEvaluacion } from "../view-pdf-evaluacion/view-pdf-evaluacion";
import { ProveedorSignal } from '@/proveedor/domain/signals/proveedor.signal';

@Component({
  selector: 'app-list-representante-legal',
  imports: [ProveedorModule, UiLoadingProgressBarComponent, UiCardNotItemsComponent, UiButtonComponent, InputTextModule, UiIconButton, AddEditRepresentanteLegal, ViewPdfEvaluacion],
  templateUrl: './list-representante-legal.html',
  styleUrl: './list-representante-legal.scss'
})
export class ListRepresentanteLegal implements OnInit {
  mostrarFormulario : boolean = false
  loading : boolean = false
  private repository = inject(RepresentanteLegalRepository)
  private signal = inject(RepresentanteLegalSignal)
  listRepresenteLegal = this.signal.listRepresentanteLegal
  selectRepresentanteLegal = this.signal.selectRepresentanteLegal
  selectRepresentanteLegalDefault = this.signal.selectRepresentanteLegalDefault
  actionRepresentante = this.signal.actionRepresentanteLegal
  private evaluacionSunatSignal = inject(EvaluacionSunatSignal)
  selectEvaluacionSunat = this.evaluacionSunatSignal.selectEvaluacionSunat
  actionCerrarDrawer = this.evaluacionSunatSignal.actionCerrarDrawer

  private alert = inject(AlertService)
  private proveedorSignal = inject(ProveedorSignal)
  selectProveedor = this.proveedorSignal.proveedorSelect

  constructor(){
    effect(() => {
      if(!this.actionRepresentante()){return}
      if(this.actionRepresentante()){
        this.obtenerRepresentante()
        this.actionRepresentante.set(false)
      }
    })
  }

  ngOnInit(): void {
    this.obtenerRepresentante()
  }
  
  obtenerRepresentante = () =>{
    this.loading = true
    this.repository.obtenerRepresentanteLegal(this.selectEvaluacionSunat().idSunat).subscribe({
      next : (data) => {
        this.listRepresenteLegal.set(data.data)
        this.alert.showAlert(`Listando, ${data.message}`, 'success')
        this.loading = false
      },
      error : (err : ApiError) => {
        this.alert.showAlert(`Listando, ${err.error.message}`, 'success')
        this.loading = false
      }
    })
  }

  seleccionarRepresentanteLegal = (representanteLegal : ListarRepresentanteLegal) => {
    this.selectRepresentanteLegal.set(representanteLegal)
    this.mostrarFormulario = true
  }
  
  confirmEliminarRepresentanteLegal = (representante : ListarRepresentanteLegal) => {
    this.loading = true
    this.alert.sweetAlert('question' , '¿Confirmar?', '¿Está seguro que desea eliminar?')
    .then(isConfirm => {
      if(!isConfirm){this.loading = false; return}

      let eliminar : EliminarRepresentanteLegal = {
        idRepresentanteLegal : representante.idRepresentanteLegal
      }

      this.eliminarRepresentanteLegal(eliminar)
    })
  }

  eliminarRepresentanteLegal = (eliminar : EliminarRepresentanteLegal) => {
    this.repository.eliminarRepresentateLegal(eliminar).subscribe({
      next : (res: ApiResponse) => {
        this.loading = false
        this.alert.showAlert(`Eliminado, ${res.message}`, 'success')
        this.obtenerRepresentante()
      },
      error : (err : ApiError) => {
        this.loading = false
        this.alert.showAlert(`Error al eliminar , ${err.error.message}`, 'error')
      }
    })
  }

}
