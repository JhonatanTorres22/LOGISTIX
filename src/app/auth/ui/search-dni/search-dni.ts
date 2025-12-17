import { AuthRepository } from '@/auth/domain/repositories/auth.repository';
import { AuthSignal } from '@/auth/domain/signal/auth.signal';
import { AuthValidations } from '@/auth/domain/validations/auth.validations';
import { Card } from '@/core/components/card/card';
import { SharedModule } from '@/core/components/shared.module';
import { UiButtonComponent } from '@/core/components/ui-button/ui-button.component';
import { UiInputComponent } from '@/core/components/ui-input/ui-input.component';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";


@Component({
  selector: 'app-search-dni',
  imports: [SharedModule, Card, UiButtonComponent, UiInputComponent, UiLoadingProgressBarComponent],
  templateUrl: './search-dni.html',
  styleUrl: './search-dni.scss'
})
export class SearchDni {
  loading = false;
  signal = inject(AuthSignal)
  step = this.signal.step
  dni = this.signal.dni

  authValidations = inject(AuthValidations)
  listaModulo = this.signal.listaModulo
  expRegLock = this.authValidations.expRegUserNameToLockInput
  validatorUsername = this.authValidations.validatorUsername;
  repository = inject(AuthRepository)
  formLogin: FormGroup;

  constructor(
    // private authValidations : AuthValidations,
    private alert : AlertService
  ){
    this.formLogin = new FormGroup({
      userName : new FormControl('', [
        Validators.required,
        Validators.maxLength(this.validatorUsername.maxLength),
        Validators.minLength(this.validatorUsername.minLength),
        Validators.pattern(this.validatorUsername.expReg)
      ])
    })
  }

  obtenerRol = (usuario : string) => {   
    this.loading = true;
    this.repository.obtener(usuario).subscribe({
      next : (data) => {
        this.dni.set(usuario)
        this.step.set('roles')
        this.listaModulo.set(data)
        this.alert.showAlert('Listando los roles', 'success')
        this.loading = false;
      },
      error : (e) => {
        this.alert.showAlert('Hubo un error al listar los roles', 'error')
        this.loading = false;
      }
    })
  }
}
