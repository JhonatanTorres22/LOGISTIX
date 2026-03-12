import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { AuthService } from '@/auth/infraestructure/services/auth.service';
import { MenuService } from '@/auth/infraestructure/services/menu.services';
import { SharedModule } from '@/core/components/shared.module';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, AppMenuitem, RouterModule, SharedModule],
  template: `
@if (dataAuth) {
  <p-card class="mb-3 shadow-none border-0 bg-transparent">
    <div class="flex items-center gap-2">

      <!-- Avatar PrimeNG -->
      <p-avatar
        image="https://images.vexels.com/media/users/3/129616/isolated/preview/fb517f8913bd99cd48ef00facb4a67c0-silueta-de-avatar-de-empresario.png"
        shape="circle"
        size="large"
        styleClass="border border-primary"
      ></p-avatar>

      <!-- Info -->
      <div class="flex flex-col leading-tight">
        <span class="text-[10px] font-bold text-gray-800 dark:text-gray-100">
          {{ dataAuth.apellidosyNombres }}
        </span>
        <span class="text-[9px] text-gray-500 dark:text-gray-400">
          {{ dataAuth.correo }}
        </span>
      </div>

    </div>
  </p-card>
}

  <div class="my-3 border-t border-gray-200 dark:border-gray-700"></div>

  <!-- <pre>{{ menu | json }}</pre> -->
  <ul class="layout-menu">
    <ng-container *ngFor="let item of menu; let i = index">
      <li
        app-menuitem
        [item]="item"
        [index]="i"
        [root]="true"
        class="transition-all duration-200 dark:hover:bg-gray-800 rounded-md"
      ></li>
      
    </ng-container>
  </ul> `
})
export class AppMenu {
  private authService = inject(AuthService)
  private menuService = inject(MenuService)

  menu: MenuItem[] = [];
  model: MenuItem[] = [];

  dataAuth = this.authService.getUserData()

  ngOnInit() {

    // Escucha cambios del menú
    this.menuService.menu$.subscribe(menu => {
      this.menu = menu;
    });

    // Cargar si ya existe en localStorage
    this.menuService.cargarMenuDesdeStorage();
  }
}
