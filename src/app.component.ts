import { PermissionService } from '@/auth/infraestructure/services/permisos.service';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, ToastModule],
    template: `
    <p-toast position="bottom-right" appendTo="body" [baseZIndex]="99999999"></p-toast>
    <router-outlet></router-outlet>`
})
export class AppComponent {
    permissionService = inject(PermissionService)

      ngOnInit(): void {
    this.permissionService.load();
  }
}
