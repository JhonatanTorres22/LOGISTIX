import { Categoria, EliminarCategoria, ResponseCategoria } from '@/categoria/domain/models/categoria.model';
import { CategoriaRepository } from '@/categoria/domain/repositories/categoria.repository';
import { CategoriaSignal } from '@/categoria/domain/signals/categoria.signal';
import { SharedModule } from '@/core/components/shared.module';
import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { AddEditCategoria } from "../add-edit-categoria/add-edit-categoria";
import { CategoriaModule } from '@/categoria/categoria-module';
import { InputTextModule } from 'primeng/inputtext';
import { UiCardNotItemsComponent } from "@/core/components/ui-card-not-items/ui-card-not-items.component";

import { finalize } from 'rxjs';
import { UiIconButton } from "@/core/components/ui-icon-button/ui-icon-button";

@Component({
  selector: 'app-list-categorias',
  imports: [
    CategoriaModule,
    UiLoadingProgressBarComponent,
    InputTextModule,
    UiButtonComponent,
    AddEditCategoria,
    UiCardNotItemsComponent,
    UiIconButton
],
  templateUrl: './list-categorias.html',
  styleUrl: './list-categorias.scss'
})
export class ListCategorias implements OnInit, OnDestroy {

  repository = inject(CategoriaRepository);
  alert = inject(AlertService);
  signal = inject(CategoriaSignal);

  listCategorias = this.signal.categoriaList;
  selectCategoria = this.signal.categoriaSelect;
  selectCategoriaDefault = this.signal.categoriaDefault;
  categoriaAccion = this.signal.categoriaAccion;

  visibleAdd = false;
  loading = false;

  constructor() {

    effect(() => {
      const accion = this.categoriaAccion();
      if (!accion) return;

      if (accion === 'CREADO' || accion === 'EDITADO') {
        this.obtener();
      }

      this.categoriaAccion.set('');
    });
  }

  ngOnInit(): void {
    if (!this.listCategorias().length) {
      this.obtener();
    }
  }

  ngOnDestroy(): void {

    this.selectCategoria.set(null as any);
    this.categoriaAccion.set('');
  }

  obtener(): void {
    this.loading = true;

    this.repository.obtener()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.listCategorias.set(data.data);
        },
        error: (err) => {
          this.alert.showAlert(`${err.message}`, 'error');
        }
      });
  }

  eliminarConfirm(categoria: Categoria): void {
    this.alert
      .sweetAlert('question', '¿Confirmar?', '¿Está seguro que desea eliminar la categoria?')
      .then(result => {
        if (!result) return;

        this.eliminar({ idCategoria: categoria.idCategoria });
      });
  }

  eliminar(categoria: EliminarCategoria): void {
    this.loading = true;

    this.repository.eliminar(categoria)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data: ResponseCategoria) => {
          this.alert.showAlert(`Categoría eliminada correctamente`, 'success');
          this.obtener();
        },
        error: (err: ResponseCategoria) => {
          console.log(err);
          
          this.alert.showAlert(`${err.errors.message}`, 'error');
        }
      });
  }

  seleccionarCategoria(categoria: Categoria): void {
    this.visibleAdd = true;
    this.selectCategoria.set(categoria);
  }
}
