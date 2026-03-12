import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from "primeng/dialog";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { UnidadMedidaRepository } from '@/unidad-medida/domain/repositories/unidad-medida.repository';
import { UnidadMedidaSignal } from '@/unidad-medida/domain/signals/unidad-medida.signal';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProcesoComprasModule } from "@/proceso-compras/proceso-compras-module";
import { AlertService } from 'src/assets/demo/services/alert.service';
import { AgregarUnidadMedida, EditarUnidadMedida } from '@/unidad-medida/domain/models/unidad-medida.model';
import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { UnidadMedidaValidation } from '@/unidad-medida/domain/validation/unidad-medida.validation';

@Component({
  selector: 'app-add-edit-unidad-medida',
  imports: [DialogModule, UiButtonComponent, CommonModule, FormsModule, ReactiveFormsModule, ProcesoComprasModule],
  templateUrl: './add-edit-unidad-medida.html',
  styleUrl: './add-edit-unidad-medida.scss'
})
export class AddEditUnidadMedida implements OnInit {
  @Input() visible: boolean = false
  @Output() visibleChange = new EventEmitter<boolean>();

  private repository = inject(UnidadMedidaRepository)
  private signal = inject(UnidadMedidaSignal)
  selectUnidadMedida = this.signal.selectUnidadMedida
  actionUnidadMedida = this.signal.actionUnidadMedida
  private alert = inject(AlertService)
  private validation = inject(UnidadMedidaValidation)

  expReg = this.validation.expReg
  maxLengthNombre = this.validation.maxLengthNombre
  maxLengthDescripcion = this.validation.maxLengthDescripcion
  minLengthNombre = this.validation.minLengthNombre
  minLengthDescripcion = this.validation.minLengthDescripcion
  expLock = this.validation.expRegLock

  formUnidadMedida : FormGroup
  loading : boolean = false
  constructor(){
    this.formUnidadMedida = new FormGroup({
      nombre : new FormControl('', [Validators.required, Validators.minLength(this.minLengthNombre),Validators.maxLength(this.maxLengthNombre)]),
      descripcion : new FormControl('', [Validators.required, Validators.minLength(this.minLengthDescripcion),Validators.maxLength(this.maxLengthDescripcion)])
    })
  }

  ngOnInit(): void {
    this.selectUnidadMedida().idUnidadMedida !== 0 ? this.patchValue() : ''
  }

  onSubmit = () => {
    if(this.formUnidadMedida.invalid){return}
    this.loading = true
    let action : 'Editar' | 'Crear' = this.selectUnidadMedida().idUnidadMedida == 0 ? 'Crear' : 'Editar'
    this.alert.sweetAlert('question', '¿Confirmar?', `¿Está seguro que desea ${action}?`)
    .then(result => {
      if(!result){this.loading = false; return}

      switch (action) {
        case 'Crear' : 
        const newUnidad : AgregarUnidadMedida = {
          descripcion : this.formUnidadMedida.value.descripcion,
          nombre : this.formUnidadMedida.value.nombre
        }
        this.crearUnidadMedida(newUnidad)
        break;

        case 'Editar' :
          const editUnidad : EditarUnidadMedida = {
            descripcion : this.formUnidadMedida.value.descripcion,
            idUnidadMedida: this.selectUnidadMedida().idUnidadMedida,
            nombre : this.formUnidadMedida.value.nombre
          }
          this.editarUnidadMedida(editUnidad)
          break;
      }
    })
  }

  crearUnidadMedida = (crear : AgregarUnidadMedida) => {
    this.repository.agregarUnidadMedida(crear).subscribe({
      next : (data : ApiResponse) => {
        this.loading = false
        this.actionUnidadMedida.set(data.isSuccess)
        this.alert.showAlert(`Agregado correctamente, ${data.message}`, 'success')
        this.closeDialog()

      },
      error : (err : ApiError) => {
        this.loading = false
        this.alert.showAlert(`Error, ${err.error.message}`, 'error')
      }
    })
  }

  editarUnidadMedida = (editar : EditarUnidadMedida) => {
    this.repository.editarUnidadMedida(editar).subscribe({
      next : (res: ApiResponse) => {
        this.loading = false
        this.actionUnidadMedida.set(res.isSuccess)
        this.alert.showAlert(`Editado correctamente, ${res.message}`, 'success')
        this.closeDialog()
      },
      error : (err : ApiError) => {
        this.loading = false
        this.alert.showAlert(`Error al editar, ${err.error.message}`, 'error')
      }
    })
  }
  patchValue () {
    this.formUnidadMedida.patchValue({
      nombre : this.selectUnidadMedida().nombre,
      descripcion : this.selectUnidadMedida().descripcion
    })
  }
  closeDialog(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
