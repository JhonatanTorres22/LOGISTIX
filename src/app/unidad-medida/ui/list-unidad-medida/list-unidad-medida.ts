import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { UnidadMedidaRepository } from '@/unidad-medida/domain/repositories/unidad-medida.repository';
import { UnidadMedidaSignal } from '@/unidad-medida/domain/signals/unidad-medida.signal';
import { Component, effect, inject, OnInit } from '@angular/core';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { TableModule } from "primeng/table";
import { UiCardNotItemsComponent } from "@/core/components/ui-card-not-items/ui-card-not-items.component";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { UiIconButton } from "@/core/components/ui-icon-button/ui-icon-button";
import { EliminarUnidadMedida, ListarUnidadMedida } from '@/unidad-medida/domain/models/unidad-medida.model';
import { InputTextModule } from 'primeng/inputtext';
import { AddEditUnidadMedida } from "../add-edit-unidad-medida/add-edit-unidad-medida";

@Component({
  selector: 'app-list-unidad-medida',
  imports: [UiLoadingProgressBarComponent, TableModule, UiCardNotItemsComponent, IconFieldModule, InputIconModule, InputTextModule, UiButtonComponent, UiIconButton, AddEditUnidadMedida],
  templateUrl: './list-unidad-medida.html',
  styleUrl: './list-unidad-medida.scss'
})
export class ListUnidadMedida implements OnInit {
  repository = inject(UnidadMedidaRepository);
  alert = inject(AlertService);
  signal = inject(UnidadMedidaSignal)
  listUnidadMedida = this.signal.listUnidadMedida
  selectUnidadMedida = this.signal.selectUnidadMedida
  selectUnidadMedidaDefault = this.signal.selectUnidadMedidaDefault
  actionUnidadMedida = this.signal.actionUnidadMedida

  loading : boolean = false
  visibleAdd : boolean = false

  constructor(){
    effect(() => {
      if(!this.actionUnidadMedida()){return}
      if(this.actionUnidadMedida()){
        this.obtenerUnidadMedida()
        this.actionUnidadMedida.set(false)
      }
    })
  }
  ngOnInit(): void {
    this.obtenerUnidadMedida()
  }

  obtenerUnidadMedida() {
    this.loading = true
    this.repository.obtener().subscribe({
      next: (data) => {
        this.loading = false
        this.signal.listUnidadMedida.set(data.data)
        this.alert.showAlert(`Listando, ${data.message}`, 'success')
      },
      error: (err: ApiError) => {
        this.loading = false
        this.alert.showAlert(`Error, ${err.error.message}`, 'error')
      }
    })
  }

  seleccionarCategoria(categoria: ListarUnidadMedida): void {
      this.visibleAdd = true;
      this.selectUnidadMedida.set(categoria);
    }

    eliminarUnidadConfirm = (unidadMedida : ListarUnidadMedida) => {
      this.loading = true
      this.alert.sweetAlert('question', '¿Confirmar?', '¿Está seguro que desea eliminar?')
      .then(result => {
        if(!result){this.loading = false; return}

        let eliminar: EliminarUnidadMedida = {
          idUnidadMedida : unidadMedida.idUnidadMedida
        }
        console.log(eliminar);
        this.eliminarUnidadMedida(eliminar)
        
      })
    }

    eliminarUnidadMedida = (eliminar : EliminarUnidadMedida) => {
      this.repository.eliminarUnidadMedida(eliminar).subscribe({
        next : (res : ApiResponse) => {
          this.loading = false
          this.alert.showAlert(`Eliminado, ${res.message}`, 'success')
          this.obtenerUnidadMedida()
        },
        error : (err : ApiError) => {
          this.loading = false
          this.alert.showAlert(`Error al eliminar, ${err.error.message}`)
        }
      })
    }
}
