import { Component, inject, OnInit } from '@angular/core';
import { AuthSignal } from '../domain/signal/auth.signal';
import { SearchDni } from './search-dni/search-dni';
import { SelectRol } from './select-rol/select-rol';
import { Login } from './login/login';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-auth-component',
  imports: [SearchDni, SelectRol, Login],
  templateUrl: './auth-component.html',
  styleUrl: './auth-component.scss',
  animations: [
    trigger('stepFade', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateY(12px)' }),
        animate('280ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ])
    ])
  ]
})
export class AuthComponent implements OnInit {
  imagen: string ='';
  authSignal = inject(AuthSignal)
  step = this.authSignal.step

  ngOnInit(): void {
    setTimeout(() => {
      this.imagen = 'logo_negro_v2.png'
    }, 800);
  }
toggleTitle() {
  switch (this.step()) {
    case 'dni':
      return '¡Bienvenido!';
    case 'roles':
      return 'Elige tu forma de ingreso';
    case 'login':
      return 'Último paso';
    default:
      return '';
  }
}

toggleText() {
  switch (this.step()) {
    case 'dni':
      return 'Para comenzar, ingresa tu número de documento. Esto nos permitirá verificar tu información y continuar de forma segura.';
    case 'roles':
      return 'Puedes tener más de un rol disponible. Selecciona con cuál deseas ingresar en esta sesión.';
    case 'login':
      return 'Ya falta muy poco. Ingresa tu contraseña para acceder a tu cuenta y comenzar a usar el sistema.';
    default:
      return '';
  }
}

currentStepNumber(): number {
  if (this.step() === 'dni') return 1;
  if (this.step() === 'roles') return 2;
  return 3;
}

}
