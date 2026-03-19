import { AlmacenRepository } from '@/alcance/domain/repository/almacen.repository';
import { AlmacenSignal } from '@/alcance/domain/signals/almacen.signal';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Card } from "@/core/components/card/card";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { UiCardNotItemsComponent } from "@/core/components/ui-card-not-items/ui-card-not-items.component";
// import { AlertService } from 'dist/sakai-ng/browser/assets/demo/services/alert.service';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { ListarAlmacen } from '@/alcance/domain/models/almacen.model';
import { AlertService } from 'src/assets/demo/services/alert.service';

@Component({
  selector: 'app-list-almacen',
  imports: [CommonModule, Card, UiButtonComponent, UiCardNotItemsComponent, UiLoadingProgressBarComponent],
  templateUrl: './list-almacen.html',
  styleUrl: './list-almacen.scss'
})
export class ListAlmacen {
@Output() onSelectAlmacen = new EventEmitter<ListarAlmacen>();
private repository = inject(AlmacenRepository)
private signal = inject(AlmacenSignal)
listAlmacen = this.signal.listAlmacen
private alert = inject(AlertService)
loading: boolean = false

ngOnInit(): void {
  this.obtenerAlmacenPorAlcance()
}

obtenerAlmacenPorAlcance = () => {
  this.loading = true
  this.repository.obtener().subscribe({
    next: (data) => {
      this.listAlmacen.set(data.data)
      this.loading = false
      this.alert.showAlert(`Listando los almacenes, ${data.message}`, 'success')
      console.log(data);
    },
    error: (err) => {
      this.loading = false
      this.alert.showAlert(`Listando los almacenes, ${err.userMessage}`, 'error')
      console.error(err);
    }
  })
}

  seleccionarAlmacenEmit = (almacen: ListarAlmacen) => {
    this.onSelectAlmacen.emit(almacen)
  }
}
