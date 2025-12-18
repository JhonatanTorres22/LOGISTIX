import { ActualizarCategoria, CrearCategoria,  ResponseCategoria } from '@/categoria/domain/models/categoria.model';
import { CategoriaRepository } from '@/categoria/domain/repositories/categoria.repository';
import { CategoriaSignal } from '@/categoria/domain/signals/categoria.signal';
import { CategoriaValidation } from '@/categoria/domain/validations/categoria.validation';
import { SharedModule } from '@/core/components/shared.module';
import { UiInputComponent } from '@/core/components/ui-input/ui-input.component';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";

@Component({
  selector: 'app-add-edit-categoria',
  imports: [SharedModule, UiInputComponent, UiLoadingProgressBarComponent],
  templateUrl: './add-edit-categoria.html',
  styleUrl: './add-edit-categoria.scss'
})
export class AddEditCategoria implements OnInit{
  @Input() visible: boolean = false
  @Output() visibleChange = new EventEmitter<boolean>();
  
  signal = inject(CategoriaSignal)
  categoriaSelect = this.signal.categoriaSelect
  categoriaAccion = this.signal.categoriaAccion
  repository = inject(CategoriaRepository)
  validation = inject(CategoriaValidation)
  expRegNombre = this.validation.expRegNombre
  expRegDescripcion = this.validation.expRegDescripcion
  maxLengthNombre = this.validation.maxLengthNombre
  minLengthNombre = this.validation.minLengthNombre
  maxLengthDescripcion = this.validation.maxLengthDescripcion
  minLengthDescripcion = this.validation.minLengthDescripcion
  expLockNombre = this.validation.expRegLockInputNombre
  expLockDescripcion = this.validation.expRegLockDescripcion

  loading : boolean = false
  categoriaForm : FormGroup
  constructor(
    private alert : AlertService
  ) { 
    this.categoriaForm = new FormGroup({
      nombre : new FormControl('', [Validators.maxLength(this.maxLengthNombre), Validators.minLength(this.minLengthNombre), Validators.pattern(this.expRegNombre), Validators.required]),
      descripcion : new FormControl('', [Validators.maxLength(this.maxLengthDescripcion), Validators.minLength(this.minLengthDescripcion), Validators.pattern(this.expRegDescripcion), Validators.required])
    })
  }

  ngOnInit(): void {
    this.categoriaSelect().id !== 0 ? this.patchValue() : ''
  }

  onSubmit = () => {
    this.loading = true
    const accion : 'Editar' | 'Crear' = this.categoriaSelect().id == 0 ? 'Crear' : 'Editar'
    if(this.categoriaForm.invalid){return}

    this.alert.sweetAlert('question', '¿Confirmar?', `¿Está seguro que desea ${accion} la categoria?`)
    .then(result => {
      if(!result){this.loading = false; return}

      switch(accion){
        case 'Crear':
          const newCategoria : CrearCategoria = {
            nombre : this.categoriaForm.value.nombre,
            descripcion : this.categoriaForm.value.descripcion
          }
          this.agregar(newCategoria)
          break;

          case 'Editar':
            const editarCategoria : ActualizarCategoria = {
               id: this.categoriaSelect().id,
              nombre : this.categoriaForm.value.nombre,
              descripcion : this.categoriaForm.value.descripcion
            }
            this.editar(editarCategoria)
            break;
      }
    })
  }
  agregar = (newCategoria : CrearCategoria) => {
    this.repository.crear(newCategoria).subscribe({
      next : (res: ResponseCategoria ) => {
        this.alert.showAlert(`Categoria creada correctamente, ${res.message}`, 'success')
        this.categoriaAccion.set('crear')
        this.loading = false
        this.closeDialog()
      },
      error : (res: ResponseCategoria) => {
        this.alert.showAlert(`${res.message}`, 'error')
        this.loading = false
      }
    })
  }

  editar = (editCategoria : ActualizarCategoria) => {
    this.repository.editar(editCategoria).subscribe({
      next : (data: ResponseCategoria) => {
        this.alert.showAlert(`Categoria editada correctamente, ${data.message}`, 'success')
        this.categoriaAccion.set('editar')
        this.loading = false
        this.closeDialog()
      },
      error : (res: ResponseCategoria) => {        
        this.alert.showAlert(`Hubo un error al editar la categoria, ${res.message}`, 'error')
        this.loading = false
      }
    })  
  }
  patchValue = () => {
    this.categoriaForm.patchValue({
      nombre : this.categoriaSelect().nombre,
      descripcion : this.categoriaSelect().descripcion
    })
  }

    closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
