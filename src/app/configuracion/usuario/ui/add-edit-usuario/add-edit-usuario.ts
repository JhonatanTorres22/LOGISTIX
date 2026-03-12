import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioSignal } from '../../domain/signals/usuario.signal';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { CrearUsuario, EditarUsuario, ResponseUsuario } from '../../domain/models/usuario.model';
import { UsuarioRepository } from '../../domain/repositories/usuario.repository';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { SharedModule } from '@/core/components/shared.module';
import { UiInputComponent } from '@/core/components/ui-input/ui-input.component';
import { UsuarioValidation } from '../../domain/validations/usuario.validations';
import { PERMISOS } from '@/auth/infraestructure/services/permisos.constants';

@Component({
  selector: 'app-add-edit-usuario',
  imports: [SharedModule, UiLoadingProgressBarComponent, UiInputComponent],
  templateUrl: './add-edit-usuario.html',
  styleUrl: './add-edit-usuario.scss'
})
export class AddEditUsuario implements OnInit {
  loading: boolean = false
  @Input() permisos = PERMISOS.USUARIO
  @Input() visible: boolean = false
  @Output() visibleChange = new EventEmitter<boolean>();
  signal = inject(UsuarioSignal)
  selectUsuario = this.signal.selectUsuario
  actionUsuario = this.signal.actionUsuario
  repository = inject(UsuarioRepository)
  usuarioForm: FormGroup
  validation = inject(UsuarioValidation)

  expRegNombre = this.validation.expRegNombre
  expRegDocumento = this.validation.expRegDocumento
  maxLengthNombre = this.validation.maxLengthNombre
  maxLengthDocumento = this.validation.maxLengthDocumento
  minLengthNombre = this.validation.minLengthNombre
  minLengthDocumento = this.validation.minLengthDocumento
  expLockNombre = this.validation.expRegLockInputNombre
  expLockDocumento = this.validation.expRegLockDocumento
  constructor(
    private alert: AlertService
  ) {
    this.usuarioForm = new FormGroup({
      nombres: new FormControl('', [Validators.required, Validators.pattern(this.expRegNombre), Validators.minLength(this.minLengthNombre), Validators.maxLength(this.maxLengthNombre)]),
      apPaterno: new FormControl('', [Validators.required, Validators.pattern(this.expRegNombre), Validators.minLength(this.minLengthNombre), Validators.maxLength(this.maxLengthNombre)]),
      apMaterno: new FormControl('', [Validators.required, Validators.pattern(this.expRegNombre), Validators.minLength(this.minLengthNombre), Validators.maxLength(this.maxLengthNombre)]),
      correo: new FormControl('', [Validators.required]),
      documento: new FormControl('', [Validators.required, Validators.pattern(this.expRegDocumento), Validators.minLength(this.minLengthDocumento), Validators.maxLength(this.maxLengthDocumento)])
    })
  }

  ngOnInit(): void {
    this.selectUsuario().id !== 0 ? this.patchValue() : ''
  }

  guardar = () => {
    this.loading = true
    let accion: 'Crear' | 'Editar' = this.selectUsuario().id == 0 ? 'Crear' : 'Editar'
    if (this.usuarioForm.invalid) { this.loading = false; return }

    this.alert.sweetAlert('question', `¿Confirmar?`, `¿Está seguro que desea ${accion}?`)
      .then(result => {
        if (!result) { this.loading = false; return }

        switch (accion) {
          case 'Crear':
            const newUsuario: CrearUsuario = {
              nombres: this.usuarioForm.value.nombres,
              apePaterno: this.usuarioForm.value.apPaterno,
              apMaterno: this.usuarioForm.value.apMaterno,
              correo: this.usuarioForm.value.correo,
              nDocumento: this.usuarioForm.value.documento
            }
            this.crear(newUsuario)
            break;

          case 'Editar': {
            const editUsuario: EditarUsuario = {
              id: this.selectUsuario().id,
              nombres: this.usuarioForm.value.nombres,
              apePaterno: this.usuarioForm.value.apPaterno,
              apMaterno: this.usuarioForm.value.apMaterno,
              correo: this.usuarioForm.value.correo,
              nDocumento: this.usuarioForm.value.documento
            }
            this.editar(editUsuario)
            break;
          }
        }
      })
  }

  crear = (crear: CrearUsuario) => {
    if (!this.permisos.INSERTAR) {
      this.alert.showAlert(`Usted no tiene acceso a ${this.permisos.INSERTAR}`, 'error')
      return
    }
    this.repository.crear(crear).subscribe({
      next: (data: ResponseUsuario) => {
        this.alert.showAlert(`Usuario creado correctamente, ${data.message}`, 'success')
        this.closeDialog()
        this.actionUsuario.set('Crear')
        this.loading = false
      },
      error: (err: ResponseUsuario) => {
        this.alert.showAlert(`Error al crear el usuario, ${err.message}`, 'error')
        this.loading = false
      }
    })
  }

  editar = (editar: EditarUsuario) => {
    if (!this.permisos.ACTUALIZAR) {
      this.alert.showAlert(`Usted no tiene acceso a ${this.permisos.ACTUALIZAR}`, 'error')
      return
    }
    this.repository.editar(editar).subscribe({
      next: (data: ResponseUsuario) => {
        this.alert.showAlert(`Usuario editado correctamente, ${data.message}`, 'success')
        this.closeDialog()
        this.actionUsuario.set('Crear')
        this.loading = false
      },
      error: (err: ResponseUsuario) => {
        this.alert.showAlert(`Error al editar el usuario, ${err.message}`, 'error')
        this.loading = false
      }
    })
  }

  patchValue = () => {
    this.usuarioForm.patchValue({
      nombres: this.selectUsuario().nombres,
      apPaterno: this.selectUsuario().apePaterno,
      apMaterno: this.selectUsuario().apMaterno,
      correo: this.selectUsuario().correo,
      documento: this.selectUsuario().nDocumento
    })
  }

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
