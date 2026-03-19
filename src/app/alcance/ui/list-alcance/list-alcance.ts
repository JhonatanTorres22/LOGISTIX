import { DataAlcance, EliminarAlcance, ListarAlcance } from '@/alcance/domain/models/alcance.model';
import { AlcanceRepository } from '@/alcance/domain/repository/alcance.repository';
import { AlcanceSignal } from '@/alcance/domain/signals/alcance.signal';
import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { CommonModule } from '@angular/common';
import { Component, effect, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { Card } from "@/core/components/card/card";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { AddEditAlcance } from "../add-edit-alcance/add-edit-alcance";
import { UiCardNotItemsComponent } from "@/core/components/ui-card-not-items/ui-card-not-items.component";

@Component({
  selector: 'app-list-alcance',
  imports: [CommonModule, Card, UiButtonComponent, UiLoadingProgressBarComponent, AddEditAlcance, UiCardNotItemsComponent],
  templateUrl: './list-alcance.html',
  styleUrl: './list-alcance.scss'
})
export class ListAlcance implements OnInit {

  @Output() onSelectAlcance = new EventEmitter<ListarAlcance>();

  private signal = inject(AlcanceSignal)
  private repository = inject(AlcanceRepository)
  listAlcance = this.signal.listAlcance
  private alert = inject(AlertService)
  selectAlcance = this.signal.selectAlcance
  selectAlcanceDefault = this.signal.selectAlcanceDefault
  alcanceAccion = this.signal.alcanceAccion

  loading: boolean = false
  visibleAddEditAlcance: boolean = false

  constructor() {
    effect(() => {
      let accion = this.alcanceAccion()
      if (accion == '') { return }
      if (accion !== '') {
        this.obtener()
      }
      this.alcanceAccion.set('');
    })
  }

  ngOnInit(): void {
    this.obtener()
  }
  obtener = () => {
    this.loading = true
    this.repository.obtener().subscribe({
      next: (data: DataAlcance) => {
        this.listAlcance.set(data.data)
        this.alert.showAlert(`Listando el alcance, ${data.message}`, 'success')
        this.loading = false
      },
      error: (err: ApiError) => {
        this.alert.showAlert(`Listando el alcance, ${err.error.message}`, 'error')
        this.loading = false
      }
    })
  }

  seleccionarAlcance = (alcance: ListarAlcance) => {
    this.selectAlcance.set(alcance)
    this.visibleAddEditAlcance = true
  }

  seleccionarAlcanceEmit = (alcance: ListarAlcance) => {
    this.onSelectAlcance.emit(alcance)
  }

  confirmEliminarAlcance = (alcance: ListarAlcance) => {
    this.loading = true
    this.alert.sweetAlert('question', '¿Confirmar?', '¿Está seguro que desea eliminar el alcance?')
      .then(result => {
        if (!result) { this.loading = false; return }
        const eliminar: EliminarAlcance = {
          id: alcance.id
        }
        this.eliminarAlcance(eliminar)
      })

  }

  eliminarAlcance = (alcance: EliminarAlcance) => {
    this.repository.eliminar(alcance).subscribe({
      next: (data: ApiResponse) => {
        this.loading = false
        this.obtener()
        this.alert.showAlert(`Alcance eliminado correctamente, ${data.message}`, 'success')
      },
      error: (err: ApiError) => {
        this.alert.showAlert(`Error al eliminar el alcance, ${err.error.message}`, 'error')
        this.loading = false
      }
    })
  }
}
