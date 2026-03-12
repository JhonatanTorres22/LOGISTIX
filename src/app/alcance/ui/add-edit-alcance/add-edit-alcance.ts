import { AlcanceModule } from '@/alcance/alcance-module';
import { AgregarAlcance, EditarAlcance } from '@/alcance/domain/models/alcance.model';
import { AlcanceRepository } from '@/alcance/domain/repository/alcance.repository';
import { AlcanceSignal } from '@/alcance/domain/signals/alcance.signal';
import { ApiResponse } from '@/core/interceptors/error-message.model';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Dialog } from "primeng/dialog";
import { AlertService } from 'src/assets/demo/services/alert.service';
import { UiInputComponent } from "@/core/components/ui-input/ui-input.component";
import { AlcanceValidation } from '@/alcance/domain/validations/alcance.validation';
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";

@Component({
  selector: 'app-add-edit-alcance',
  imports: [Dialog, AlcanceModule, UiInputComponent, UiButtonComponent],
  templateUrl: './add-edit-alcance.html',
  styleUrl: './add-edit-alcance.scss'
})
export class AddEditAlcance implements OnInit {
  @Input() visible: boolean = false
  @Output() visibleChange = new EventEmitter<boolean>()

  private signal = inject(AlcanceSignal)
  selectAlcance = this.signal.selectAlcance

  private alert = inject(AlertService)
  private repository = inject(AlcanceRepository)
  accionAlcance = this.signal.alcanceAccion
  private validation = inject(AlcanceValidation)
  nombreExpReg = this.validation.expRegNombre
  coordenadasExpReg = this.validation.expRegCoordenadas
  direccionExpReg = this.validation.expRegDireccion

  maxLengthNombre = this.validation.maxLengthNombre
  minLengthNombre = this.validation.minLengthNombre
  maxLengthCoordenadas = this.validation.maxLengthCoordenada
  minLengthCoordenadas = this.validation.minLengthCoordenada
  maxLengthDireccion = this.validation.maxLengthDireccion
  minLengthDireccion = this.validation.minLengthDireccion

  nombreLock = this.validation.expRegLockInputNombre
  coordenadasLock = this.validation.expRegLockInputCoordenadas
  direccionLock = this.validation.expRegLockInputDireccion

  formAlcance: FormGroup
  loading: boolean = false

  constructor() {
    this.formAlcance = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(this.maxLengthNombre), Validators.minLength(this.minLengthNombre), Validators.pattern(this.nombreExpReg)]),
      coordenadas: new FormControl('', [Validators.required ,Validators.maxLength(this.maxLengthCoordenadas), Validators.minLength(this.minLengthCoordenadas), Validators.pattern(this.coordenadasExpReg)]),
      direccion: new FormControl('', [Validators.required, Validators.maxLength(this.maxLengthDireccion), Validators.minLength(this.minLengthDireccion), Validators.pattern(this.direccionExpReg)])
    })
  }

  ngOnInit(): void {
    this.selectAlcance().id !== 0 ? this.patchValue() : ''
  }

  onSubmit = () => {
    this.loading = true
    const accion: 'Editar' | 'Crear' = this.selectAlcance().id == 0 ? 'Crear' : 'Editar'
    if (this.formAlcance.invalid) { return }

    this.alert.sweetAlert('question', '¿Confirmar?', `¿Está seguro que desea ${accion} el alcance?`)
      .then(result => {
        if (!result) { this.loading = false; return }

        switch (accion) {
          case 'Crear':
            const newAlcance: AgregarAlcance = {
              descripcion: this.formAlcance.value.nombre,
              coordenada: this.formAlcance.value.coordenadas,
              direccion: this.formAlcance.value.direccion
            }
            this.agregar(newAlcance)
            break;
          case 'Editar':
            const editAlcance: EditarAlcance = {
              id: this.selectAlcance().id,
              descripcion: this.formAlcance.value.nombre,
              coordenada: this.formAlcance.value.coordenadas,
              direccion: this.formAlcance.value.direccion
            }
            this.editar(editAlcance)
            break;
        }
      })
  }

  agregar = (newAlcance: AgregarAlcance) => {
    this.repository.agregar(newAlcance).subscribe({
      next: (data) => {
        this.loading = false
        this.accionAlcance.set('Agregar')
        this.alert.showAlert(`Alcance creado correctamente, ${data.message}`, 'success')
        this.closeDialog()
      },
      error : (err : ApiResponse) => {
        this.alert.showAlert(`${err.message}`, 'error')
        this.loading = false
      }
    })
  }

  editar = (editAlcance: EditarAlcance) => {
    this.repository.editar(editAlcance).subscribe({
      next: (data) => {
        this.loading = false
        this.accionAlcance.set('Editar')
        this.alert.showAlert(`Alcance editado correctamente, ${data.message}`, 'success')
        this.closeDialog()
      },
      error : (err : ApiResponse) => {
        this.alert.showAlert(`${err.message}`, 'error')
        this.loading = false
      }
    })
  }

  patchValue = () => {
    this.formAlcance.patchValue({
      nombre: this.selectAlcance().descripcion,
      coordenadas: this.selectAlcance().coordenada,
      direccion: this.selectAlcance().direccion
    })
  }
  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

}
