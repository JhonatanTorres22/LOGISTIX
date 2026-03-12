import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { DialogModule } from "primeng/dialog";
import { MarcaSignal } from '@/marca/domain/signals/marca.signal';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { MarcaRepository } from '@/marca/domain/repositories/marca.repository';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgregarMarca, EditarMarca } from '@/marca/domain/models/marca.model';
import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { UiInputComponent } from "@/core/components/ui-input/ui-input.component";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { MarcaValidation } from '@/marca/domain/validations/marca.validation';

@Component({
  selector: 'app-add-edit-marca',
  imports: [UiLoadingProgressBarComponent, DialogModule, FormsModule, ReactiveFormsModule, UiInputComponent, UiButtonComponent],
  templateUrl: './add-edit-marca.html',
  styleUrl: './add-edit-marca.scss'
})
export class AddEditMarca implements OnInit {
  loading: boolean = false
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>()

  private signal = inject(MarcaSignal)
  selectMarca = this.signal.selectMarca
  actionMarca = this.signal.actionMarca
  private alert = inject(AlertService)
  private repository = inject(MarcaRepository)
  private validation = inject(MarcaValidation)
  maxLengthNombre = this.validation.maxLengthNombre
  maxLengthDescripcion = this.validation.maxLengthDescripcion
  minLengthNombre = this.validation.minLengthNombre
  minLengthDescripcion = this.validation.minLengthDescripcion

  expReg = this.validation.expReg
  formMarca: FormGroup
  constructor() {
    this.formMarca = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.pattern(this.expReg), Validators.maxLength(this.maxLengthNombre), Validators.minLength(this.minLengthNombre)]),
      descripcion: new FormControl('', [Validators.required, Validators.pattern(this.expReg), Validators.maxLength(this.maxLengthDescripcion), Validators.minLength(this.minLengthDescripcion)])
    })
  }

  ngOnInit(): void {
    this.selectMarca().idMarca !== 0 ? this.patchValueMarca() : ''
  }

  onSubmitMarca = () => {
    this.loading = true
    const accion: 'Editar' | 'Crear' = this.selectMarca().idMarca == 0 ? 'Crear' : 'Editar'
    if (this.formMarca.invalid) { return }
    this.alert.sweetAlert('question', '¿Confirmar?', `¿Está seguro que desea ${accion} la marca?`)
      .then(result => {
        if (!result) { return }

        switch (accion) {
          case 'Crear': {
            const newMarca: AgregarMarca = {
              descripcionMarca: this.formMarca.value.descripcion,
              nombreMarca: this.formMarca.value.nombre
            }
            this.insertarMarca(newMarca)
          }; break;

          case 'Editar': {
            const editMarca: EditarMarca = {
              idMarca: this.selectMarca().idMarca,
              nombreMarca: this.formMarca.value.nombre,
              descripcionMarca: this.formMarca.value.descripcion,
            }

            this.editarMarca(editMarca)
          }; break;
        }
      })
  }

  insertarMarca = (agregar: AgregarMarca) => {
    this.repository.agregarMarca(agregar).subscribe({
      next: (res: ApiResponse) => {
        this.loading = false
        this.closeDialog()
        this.alert.showAlert(`Marca agregada, ${res.message}`, 'success')
        this.actionMarca.set('Agregar')

      },
      error: (err: ApiError) => {
        this.loading = false
        console.log(err);
        
        this.alert.showAlert(`Error al agregar, ${err.userMessage}`, 'error')
      }
    })
  }

  editarMarca = (editar: EditarMarca) => {
    this.repository.editarMarca(editar).subscribe({
      next: (res: ApiResponse) => {
        this.loading = false
        this.closeDialog()
        this.alert.showAlert(`Marca editada, ${res.message}`, 'success')
        this.actionMarca.set('Editar')
      },
      error: (err: ApiError) => {
        this.loading = false
        this.alert.showAlert(`Error al editar, ${err.userMessage}`, 'error')

      }
    })
  }
  patchValueMarca = () => {
    this.formMarca.patchValue({
      nombre: this.selectMarca().nombreMarca,
      descripcion: this.selectMarca().descripcionMarca
    })
  }
  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
