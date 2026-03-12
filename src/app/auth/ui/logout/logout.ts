import { AuthSignal } from '@/auth/domain/signal/auth.signal';
import { AuthService } from '@/auth/infraestructure/services/auth.service';
import { Component, inject } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
  selector: 'app-logout',
  standalone: true,   
  imports: [ProgressSpinnerModule],
  templateUrl: './logout.html',
  styleUrl: './logout.scss'
})
export class Logout {

  signal = inject(AuthSignal)
  step = this.signal.step
   isSpinnerVisible: boolean = true;

   authService = inject(AuthService)
     ngOnInit(): void {
    setTimeout(() => {
      this.step.set('dni')
      this.isSpinnerVisible = false;
      this.authService.logout();
    }, 1500);
  }
}
