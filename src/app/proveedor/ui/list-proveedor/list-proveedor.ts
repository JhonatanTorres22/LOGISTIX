import { ActualizarEvaluacion, EliminarProveedor, Proveedor, ResponseProveedor } from '@/proveedor/domain/models/proveedor.model';
import { ProveedorRepository } from '@/proveedor/domain/repositories/proveedor.repository';
import { ProveedorSignal } from '@/proveedor/domain/signals/proveedor.signal';
import { Component, effect, inject, ViewChild } from '@angular/core';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { AddEditProveedor } from "../add-edit-proveedor/add-edit-proveedor";
import { ImportProveedores } from "../import-proveedores/import-proveedores";
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { ListCriterios } from "../list-criterios/list-criterios";
import { ListContacto } from "../list-contacto/list-contacto";
import { PermissionService } from '@/auth/infraestructure/services/permisos.service';
import { PERMISOS } from '@/auth/infraestructure/services/permisos.constants';
import { ProveedorModule } from '@/proveedor/proveedor-module';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { UiCardNotItemsComponent } from "@/core/components/ui-card-not-items/ui-card-not-items.component";
import { ListBancos } from "../list-bancos/list-bancos";
import { UiIconButton } from "@/core/components/ui-icon-button/ui-icon-button";
import { CommonModule } from '@angular/common';
import { EvaluacionSunat } from "../evaluacion-sunat/evaluacion-sunat";
import { Tag } from "primeng/tag";
import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { MenuModule } from "primeng/menu";


@Component({
  selector: 'app-list-proveedor',
  imports: [CommonModule, ProveedorModule, UiButtonComponent, AddEditProveedor, ImportProveedores,
    UiLoadingProgressBarComponent, ListCriterios, ListContacto, InputTextModule, TooltipModule, UiCardNotItemsComponent, ListBancos, UiIconButton, EvaluacionSunat, Tag, MenuModule],
  templateUrl: './list-proveedor.html',
  styleUrl: './list-proveedor.scss'
})
export class ListProveedor {

  visibleAdd: boolean = false;
  visibleCriterios: boolean = false;
  visibleContacto: boolean = false
  visibleBancos: boolean = false
  loading: boolean = false
  visibleFichaEvaluacion: boolean = false

  permissionService = inject(PermissionService)
  permisoProveedor = PERMISOS.PROVEEDOR;
  permisosProveedor = this.permissionService.resolve(this.permisoProveedor)
  private signal = inject(ProveedorSignal)
  listProveedor = this.signal.proveedorList
  proveedorSelect = this.signal.proveedorSelect
  proveedorDefault = this.signal.proveedorDefault
  proveedorAccion = this.signal.proveedorAccion

  repository = inject(ProveedorRepository)

  constructor(
    private alert: AlertService,
  ) {
    effect(() => {
      let accion = this.proveedorAccion()
      console.log(accion);

      if (accion == '') { return }
      if (accion !== '') {
        this.obtener()
      }
      this.proveedorAccion.set('');
    })
  }

  ngOnInit(): void {
    this.obtener()
  }
  obtener = () => {
    if (!this.permisosProveedor.LISTAR) {
      this.alert.showAlert(`Usted no tiene acceso a Proveedor`, 'error')
      return
    }
    this.loading = true;
    this.repository.obtener().subscribe({
      next: (proveedor) => {
        this.listProveedor.set(proveedor.data)
        this.alert.showAlert(`Listando los proveedores, ${proveedor.message}`, 'success')
        this.loading = false
      },
      error: () => {
        this.alert.showAlert('Hubo un error al listar los proveedores', 'error')
        this.loading = false
      }
    })
  }



  eliminarConfirm = (proveedor: Proveedor) => {
    if (!this.permisosProveedor.ELIMINAR) {
      this.alert.showAlert(`Usted no tiene acceso a eliminar`, 'error')
      return
    }
    this.loading = true;
    this.alert.sweetAlert('question', '¿Confirmar?', '¿Está seguro que desea eliminar?').
      then(isconfirm => {
        if (!isconfirm) { this.loading = false; return }
        const eliminar: EliminarProveedor = {
          id: proveedor.id
        }
        this.eliminar(eliminar)
      })
  }

  eliminar = (eliminar: EliminarProveedor) => {
    this.repository.eliminar(eliminar).subscribe({
      next: (res: ResponseProveedor) => {
        this.alert.showAlert(`Proveedor eliminado correctamente, ${res.message}`, 'success')
        this.loading = false;
        this.obtener()
      },
      error: (res: ResponseProveedor) => {
        this.alert.showAlert(`Hubo un error al eliminar el proveedor, ${res.message}`, 'error')
        this.loading = false;
      }
    })
  }

  getColorEvaluacion(estado: string): string {
    switch (estado) {
      case 'APROBADO':
        return 'info';

      case 'RECHAZADO':
        return 'danger';

      case 'EVALUACIÓN EN PROCESO':
        return 'warn';

      default:
        return 'secondary';
    }
  }


  seleccionarProveedor = (proveedor: Proveedor) => {
    this.proveedorSelect.set(proveedor)
  }
}
