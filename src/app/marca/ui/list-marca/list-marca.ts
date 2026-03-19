import { ApiError } from '@/core/interceptors/error-message.model';
import { EliminarMarca, ListarMarca } from '@/marca/domain/models/marca.model';
import { MarcaRepository } from '@/marca/domain/repositories/marca.repository';
import { MarcaSignal } from '@/marca/domain/signals/marca.signal';
import { Component, effect, inject, OnInit } from '@angular/core';
// import { AlertService } from 'dist/sakai-ng/browser/assets/demo/services/alert.service';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { TableModule } from "primeng/table";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { InputTextModule } from 'primeng/inputtext';
import { CdkDragPlaceholder } from "@angular/cdk/drag-drop";
import { CommonModule } from '@angular/common';
import { UiCardNotItemsComponent } from "@/core/components/ui-card-not-items/ui-card-not-items.component";
import { AddEditMarca } from "../add-edit-marca/add-edit-marca";
import { UiIconButton } from "@/core/components/ui-icon-button/ui-icon-button";
import { AlertService } from 'src/assets/demo/services/alert.service';

@Component({
  selector: 'app-list-marca',
  imports: [CommonModule, UiLoadingProgressBarComponent, TableModule, IconFieldModule, InputIconModule, UiButtonComponent, InputTextModule, UiCardNotItemsComponent, AddEditMarca, UiIconButton],
  templateUrl: './list-marca.html',
  styleUrl: './list-marca.scss'
})
export class ListMarca implements OnInit {
  loading: boolean = false;
  private repository = inject(MarcaRepository)
  private signal = inject(MarcaSignal)
  listMarca = this.signal.listMarca
  selectMarca = this.signal.selectMarca
  selectMarcaDefault = this.signal.selectMarcaDefault
  actionMarca = this.signal.actionMarca
  private alert = inject(AlertService)
  visibleAddMarca: boolean = false

  constructor() {
    effect(() => {
      let accion = this.actionMarca()
      console.log(accion);

      if (accion == '') { return }
      if (accion !== '') {
        this.obtenerMarca()
      }
      this.actionMarca.set('');
    })
  }

  ngOnInit(): void {
    if (!this.listMarca().length) {
      this.obtenerMarca();
    }
  }

  obtenerMarca() {
    this.loading = true;
    this.repository.obtenerMarcas().subscribe({
      next: (data) => {
        this.listMarca.set(data.data);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.alert.showAlert(`Error al listar las marcas, ${err.userMessage}`, 'error');
      }
    });
  }

  seleccionarMarca(marca: any) {
    this.selectMarca.set(marca);
    this.visibleAddMarca = true;
  }

  confirmEliminarMarca(marca: any) {
    this.alert.sweetAlert('question', '¿Confirmar?', '¿Está seguro que desea eliminar?')
      .then(result => {
        if (!result) return;
        this.eliminarMarca({ idMarca: marca.idMarca });
      });
  }

  eliminarMarca(eliminar: { idMarca: number }) {
    this.loading = true;
    this.repository.eliminarMarca(eliminar).subscribe({
      next: (res) => {
        this.loading = false;
        this.alert.showAlert(`Marca eliminada, ${res.message}`, 'success');
        this.actionMarca.set('ELIMINADO');
      },
      error: (err) => {
        this.loading = false;
        this.alert.showAlert(`Error al eliminar la marca, ${err.userMessage}`, 'error');
      }
    });
  }

  // ---------------------------------
  // 🔹 Limpieza completa al destruir
  // ---------------------------------
  ngOnDestroy(): void {
    this.visibleAddMarca = false;           // cerrar modal si estaba abierto
    this.selectMarca.set(this.selectMarcaDefault); // restablecer selección
    this.actionMarca.set('');               // limpiar acción pendiente
    this.loading = false;                   // reset loading
  }
}
