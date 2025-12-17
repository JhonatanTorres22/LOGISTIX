import { Modulo, Rol } from '@/auth/domain/models/auth.model';
import { AuthSignal } from '@/auth/domain/signal/auth.signal';
import { SharedModule } from '@/core/components/shared.module';
import { Component, inject } from '@angular/core';


@Component({
  selector: 'app-select-rol',
  imports: [SharedModule],
  templateUrl: './select-rol.html',
  styleUrl: './select-rol.scss'
})
export class SelectRol {
   private signal = inject(AuthSignal)
  step = this.signal.step
  listaModulo = this.signal.listaModulo
  rol = this.signal.rol
  selectedModulo: Modulo | null = null;
  selectedRol: Rol | null = null;

  selectModulo(modulo: Modulo) {
    this.selectedModulo = modulo;
  }

  // Selecciona un rol
  seleccionarRol(rol: Rol) {
    this.rol.set(rol.nombre)
    this.step.set('login')
  }
getRolColor(nombre: string): string {
    let hash = 0;
    for (let i = 0; i < nombre.length; i++) {
        hash = nombre.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = Math.abs(hash) % 360;

    // Colores pastel: baja saturación, alta luminosidad
    return `hsl(${hue}, 55%, 80%)`;
}


}
