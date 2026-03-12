import { SharedModule } from '@/core/components/shared.module';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';

import { Dialog } from "primeng/dialog";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { GipeoRepository } from '@/proceso-compras/domain/repository/gipeo.repository';
import { GipeoSignal } from '@/proceso-compras/domain/signals/gipeo.signal';
import { GipeoValidation } from '@/proceso-compras/domain/validators/gipeo.validator';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { AuthResponse, IniciaSesionGipeo } from '@/proceso-compras/domain/models/gipeo.model';
import { UiInputComponent } from '@/core/components/ui-input/ui-input.component';
import { UiSelectComponent } from '@/core/components/ui-select/ui-select.component';
import { SolicitudCompraSignal } from '@/proceso-compras/domain/signals/solicitud-compra.signal';

@Component({
  selector: 'app-auth-gipeo',
  imports: [SharedModule, Dialog, UiButtonComponent, UiInputComponent, UiSelectComponent],
  templateUrl: './auth-gipeo.html',
  styleUrl: './auth-gipeo.scss'
})
export class AuthGipeo implements OnInit {
  loading: boolean = false
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  repository = inject(GipeoRepository)
  signal = inject(GipeoSignal)
  searchSubtarea = this.signal.searchSubtarea
  listRol = this.signal.listRol
  listIndicador = this.signal.listIndicador
  actionGipeo = this.signal.actionGipeo

  formGipeo: FormGroup

  validators = inject(GipeoValidation)
  expRegDni = this.validators.expRegDni
  maxLengthDni = this.validators.maxLengthDni
  minLengthDni = this.validators.minLengthDni
  expRegLockDni = this.validators.expRegLockDni

  maxLengthPassword = this.validators.maxLengthPassword
  minLengthPassword = this.validators.minLengthPassword

  constructor(
    private alert: AlertService
  ) {
    this.formGipeo = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.pattern(this.expRegDni), Validators.maxLength(this.maxLengthDni), Validators.minLength(this.minLengthDni)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(this.maxLengthPassword), Validators.minLength(this.minLengthPassword)]),
      rol: new FormControl('', [Validators.required])
    })
  }
  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  ngOnInit(): void {
    this.obtenerRol()
  }

  obtenerRol = () => {
    this.repository.obtenerRol().subscribe({
      next: (data) => {
        this.listRol.set(data)
        this.alert.showAlert('Listando los roles', 'success')
        this.loading = false
        console.log(this.listRol());

      },
      error: () => {
        this.alert.showAlert('Error al listar los roles', 'error')
        this.loading = false
      }
    })
  }

  iniciarSesion = () => {
    if(this.formGipeo.invalid){return}
    this.loading = true
    const rolId = this.formGipeo.value.rol;

    const rolTexto =
      this.listRol().find(r => r.value === rolId)?.text ?? '';

    let iniciarSesion: IniciaSesionGipeo = {
      password: this.formGipeo.value.password,
      rol: rolTexto,
      userName: this.formGipeo.value.userName,
      idIndicador: this.searchSubtarea().id
    }

    this.repository.authGipeo(iniciarSesion).subscribe({
      next: (data) => {
        this.listIndicador.set(data.data)
        this.alert.showAlert(`Sesión iniciada correctamente en GIPEO, ${data.message}`, 'success')
        const { idIndicador, ...resto } = iniciarSesion;
        localStorage.setItem('gipeoSession', JSON.stringify(resto));
        this.closeDialog()
        this.loading = false
        this.actionGipeo.set('Iniciar Gipeo')
      },
      error: (data: AuthResponse) => {
        this.alert.showAlert(`Error al iniciar sesión, ${data.message}`, 'error')
        this.loading = false
      }
    })
  }
}
