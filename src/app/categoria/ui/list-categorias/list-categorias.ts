import { Categoria, EliminarCategoria, ResponseCategoria } from '@/categoria/domain/models/categoria.model';
import { CategoriaRepository } from '@/categoria/domain/repositories/categoria.repository';
import { CategoriaSignal } from '@/categoria/domain/signals/categoria.signal';
import { SharedModule } from '@/core/components/shared.module';
import { Component, effect, inject, OnInit } from '@angular/core';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { AddEditCategoria } from "../add-edit-categoria/add-edit-categoria";

@Component({
  selector: 'app-list-categorias',
  imports: [SharedModule, UiLoadingProgressBarComponent, UiButtonComponent, AddEditCategoria],
  templateUrl: './list-categorias.html',
  styleUrl: './list-categorias.scss'
})
export class ListCategorias implements OnInit {
  reposiory = inject(CategoriaRepository)
  alert = inject(AlertService)
  signal = inject(CategoriaSignal)
  listCategorias = this.signal.categoriaList
  selectCategoria = this.signal.categoriaSelect
  categoriaAccion = this.signal.categoriaAccion
  visibleAdd : boolean = false
  loading : boolean = false
  ngOnInit(): void {
    this.obtener()
  }

  constructor(){
     effect(() => {
      let accion = this.categoriaAccion()
      if (accion == '') { return }
      if (accion !== '') {
        this.obtener()
      }
      this.categoriaAccion.set('');
    })
  }

  obtener = () => {
    this.loading = true
    this.reposiory.obtener().subscribe({
      next : (data) => {
        this.listCategorias.set(data.data)
        this.alert.showAlert(`${data.message}`, 'success')
        this.loading = false
      },
      error : (err) => {
        this.alert.showAlert(`${err.message}`, 'error')
        this.loading = false

      }
    })
  }

  eliminarConfirm = (categoria : Categoria) => {
    this.loading = true
   this.alert.sweetAlert('question', '¿Confirmar?', '¿Está seguro que desea eliminar la categoria?')
   .then(result => {
    if(!result){this.loading = false;return}
    const eliminar : EliminarCategoria = {
      id : categoria.id
    }
    this.eliminar(eliminar)
   })
  }

  eliminar = (categoria : EliminarCategoria) => { 
    this.reposiory.eliminar(categoria).subscribe({
      next : (data: ResponseCategoria) => {
        this.alert.showAlert(`Categoria eliminada correctamente, ${data.message}`, 'success')
        this.loading = false
        this.obtener()
      },
      error : (err: ResponseCategoria) => {
        this.alert.showAlert(`${err.message}`, 'error')
        this.loading = false
      }
    })
  }

  seleccionarCategoria = (categoria : Categoria) => {
    this.selectCategoria.set(categoria)
  }
}
