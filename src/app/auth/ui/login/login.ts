import { LoginModel } from '@/auth/domain/models/auth.model';
import { AuthRepository } from '@/auth/domain/repositories/auth.repository';
import { AuthSignal } from '@/auth/domain/signal/auth.signal';
import { AuthValidations } from '@/auth/domain/validations/auth.validations';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { UiInputComponent } from "@/core/components/ui-input/ui-input.component";
import { SharedModule } from '@/core/components/shared.module';
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";

@Component({
  selector: 'app-login',
  imports: [UiInputComponent, SharedModule, UiButtonComponent, UiButtonComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  signal = inject(AuthSignal)
  dni = this.signal.dni
  rol = this.signal.rol
  messageErrorLogin = '';
  formLogin: FormGroup;
  authValidations = inject(AuthValidations)
  expRegLock = this.authValidations.expRegPasswordToLockInput
  validatorPassword = this.authValidations.validatorPassword;
  constructor(
    private router: Router,
    private repository: AuthRepository,
    private alert: AlertService,
  ) {
    this.formLogin = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.validatorPassword.maxLength),
        Validators.minLength(this.validatorPassword.minLength),
        Validators.pattern('')
      ]),
    })
  }

  iniciarSesion = () => {
    let login: LoginModel = {
      password: this.formLogin.value.password,
      role: this.rol(),
      username: this.dni()
    }
    this.repository.login(login).subscribe({
      next: () => {
        this.alert.sweetAlert('success', '¡Bienvenido!', 'Gracias por iniciar sesion el logistix')
        this.obtenerMenu()
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 100);
      },
      error: () => {
        this.alert.showAlert('Hubo un error en las credenciales', 'error')
      }
    })
  }

    obtenerMenu = () => {
    this.repository.obtenerMenu().subscribe({
      next : (data) => {
        this.alert.showAlert('Listando los menus correctamente', 'success')
      },
      error : () => {
        this.alert.showAlert('Hubo un error al listar los menús','error')
      }
    })
  }
}
