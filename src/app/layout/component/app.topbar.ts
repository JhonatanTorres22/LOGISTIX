import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { PopoverModule } from "primeng/popover";
import { TagModule } from "primeng/tag";
import { DataViewModule } from "primeng/dataview";
import { UiIconButton } from "@/core/components/ui-icon-button/ui-icon-button";
import { ButtonModule } from 'primeng/button';
import { SolicitudCompraRepository } from '@/proceso-compras/domain/repository/solicitud-compra.repository';
import { ApiError } from '@/core/interceptors/error-message.model';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { OrdenCompraPorFirmar } from '@/proceso-compras/domain/models/ordenCompraDetalle.model';
import { CambioContrasenia } from "@/auth/ui/cambio-contrasenia/cambio-contrasenia";

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, OverlayBadgeModule, PopoverModule, TagModule, DataViewModule, ButtonModule, CambioContrasenia],
    template: ` <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <a class="layout-topbar-logo" routerLink="/">
                <img src="assets/images/icono_logistica.png" alt="Logo"style="height: 50px; width: auto;" >
                <span>SILOGI</span>
            </a>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <!-- <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                    <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                </button> -->
                <div class="relative">
                    <button
                        class="layout-topbar-action layout-topbar-action-highlight"
                        pStyleClass="@next"
                        enterFromClass="hidden"
                        enterActiveClass="animate-scalein"
                        leaveToClass="hidden"
                        leaveActiveClass="animate-fadeout"
                        [hideOnOutsideClick]="true"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <app-configurator />
                </div>
            </div>

            <!-- <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                <i class="pi pi-ellipsis-v"></i>
            </button> -->

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <button type="button" class="layout-topbar-action" (click)="abrirCambioContrasenia()" >
    <i class="pi pi-lock"></i>
    <span>Cambiar Contraseña</span>
</button>
                    <!-- <button type="button" class="layout-topbar-action">
                        <i class="pi pi-calendar"></i>
                        <span>Calendar</span>
                    </button> -->

                    <!-- <p-overlaybadge severity="danger" [value]="mensajes.length" class="layout-topbar-action" (click)="popover.toggle($event)">
                            <i class="pi pi-bell"></i>   
                    </p-overlaybadge> -->

                <p-popover #popover>

                    <div style="width:350px; max-height:400px; overflow:auto" class="p-3">

                    <span class="font-bold text-lg">Lista de Notificaciones</span>

                    <p-dataView 
                    [value]="mensajes" 
                    [paginator]="true" 
                    [rows]="5" 
                    emptyMessage="No hay bancos registrados">

                    <ng-template #list let-items>
                        @for (item of items; track item.idCarpeta) {
                            <!-- {{ item | json }} -->
                            <div class="p-3 border-bottom-1 surface-border hover:surface-100 transition-duration-200">

                                <div class="flex justify-content-between align-items-start mb-2">

                                    <p-tag 
                                        [value]="item.prefijoCarpeta + ' - ' + item.numeracionCarpeta"
                                        severity="info">
                                    </p-tag>

                                    <small class="text-color-secondary">
                                        {{ item.fechaOrdenCompra | date:'dd/MM/yyyy' }}
                                    </small>

                                </div>

                                <div class="flex justify-content-between align-items-center">

                                    <div class="font-semibold text-sm">
                                        {{ item.datosActividad }}
                                    </div>

                                    <button 
                                        pButton 
                                        icon="pi pi-arrow-right"
                                        class="p-button-text p-button-sm"
                                        (click)="seleccionarMensaje(item)">
                                    </button>
                                </div>
                            </div>
                        }
                    </ng-template>
                </p-dataView>
            </div>

        </p-popover>
                    <!-- <button type="button" class="layout-topbar-action">
                        <i class="pi pi-user"></i>
                        <span>Profile</span>
                    </button> -->
                </div>
            </div>
        </div>
    </div>
    @if (modalCambioVisible) {
        <app-cambio-contrasenia [(visible)]="modalCambioVisible"
    [forzado]="cambioForzado"
    (onCambioExitoso)="onCambioExitoso()"></app-cambio-contrasenia>
    }
    `
})
export class AppTopbar implements OnInit {

    private repository = inject(SolicitudCompraRepository)
    private alert = inject(AlertService)
    items!: MenuItem[];

    constructor(public layoutService: LayoutService) { }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

    cambioForzado = false;

    ngOnInit() {
        if (localStorage.getItem('forzarCambio') === 'true') {
            this.cambioForzado = true;
            this.modalCambioVisible = true;
        }
    }

    mensajes: OrdenCompraPorFirmar[] = []
    obtenerOrdencompraPorFirmar() {
        this.repository.obtenerOrdenCompraPorFirmar().subscribe({
            next: (data) => {
                this.mensajes = data.data
                console.log(data.data);

                this.alert.showAlert(`Listando notificaciones por firmar, ${data.message}`, 'success')
            },
            error: (err: ApiError) => {
                this.alert.showAlert(`Error al listar, ${err.error.message}`, 'error')
            }
        })
    }

    seleccionarMensaje(mensaje: OrdenCompraPorFirmar) {
        this.layoutService.codigoSolicitudCompraNavbar.set(mensaje.idSolicitudCompra)
    }

    modalCambioVisible = false;

    abrirCambioContrasenia() {
        this.modalCambioVisible = true;
    }
    onCambioExitoso(): void {
        this.cambioForzado = false;
        this.modalCambioVisible = false;
    }
}
