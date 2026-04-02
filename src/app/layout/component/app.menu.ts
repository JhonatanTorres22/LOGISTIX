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
<!-- <p-card class="mb-3 shadow-none border-0 bg-transparent"> -->

  <!-- Bloque centrado verticalmente -->
  <div class="flex flex-column align-items-center text-center gap-2 py-2">

    <div class="relative">
      <p-avatar
        image="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
        shape="circle"
        size="xlarge"
        styleClass="border-2 border-primary-300"
      ></p-avatar>

      <span
        class="absolute border-circle bg-green-500 border-2 border-white dark:border-gray-900"
        style="width: 12px; height: 12px; bottom: 2px; right: 2px;"
      ></span>
    </div>

    <!-- Nombre -->
    <span class="text-sm font-semibold text-900 dark:text-0 line-height-2">
      {{ dataAuth.apellidosyNombres }}
    </span>

    <!-- Correo -->
    <span class="text-xs text-500 dark:text-400">
      {{ dataAuth.correo }}
    </span>

    <!-- Badge rol -->
    <span class="flex align-items-center gap-1 text-xs font-medium px-3 py-1 border-round-3xl bg-blue-50 text-blue-800 border-1 border-blue-200">
      <span class="border-circle bg-blue-500" style="width: 6px; height: 6px; display: inline-block; flex-shrink: 0;"></span>
      {{ dataAuth.role }}
    </span>

  </div>
<!-- </p-card> -->
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
