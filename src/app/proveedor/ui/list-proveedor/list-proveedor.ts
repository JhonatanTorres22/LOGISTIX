import { SharedModule } from '@/core/components/shared.module';
import { EliminarProveedor, Proveedor, ResponseProveedor } from '@/proveedor/domain/models/proveedor.model';
import { ProveedorRepository } from '@/proveedor/domain/repositories/proveedor.repository';
import { ProveedorSignal } from '@/proveedor/domain/signals/proveedor.signal';
import { Component, effect, inject } from '@angular/core';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { AddEditProveedor } from "../add-edit-proveedor/add-edit-proveedor";
import { ImportProveedores } from "../import-proveedores/import-proveedores";
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { ListCriterios } from "../list-criterios/list-criterios";

@Component({
  selector: 'app-list-proveedor',
  imports: [SharedModule, UiButtonComponent, AddEditProveedor, ImportProveedores, UiLoadingProgressBarComponent, ListCriterios],
  templateUrl: './list-proveedor.html',
  styleUrl: './list-proveedor.scss'
})
export class ListProveedor {

  visibleAdd: boolean = false;
  visibleCriterios: boolean = false;
  loading: boolean = false

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
    this.loading = true;
    this.repository.obtener().subscribe({
      next: (proveedor) => {
        this.listProveedor.set(proveedor)
        this.alert.showAlert('Listando los proveedores', 'success')
        this.loading = false
      },
      error: () => {
        this.alert.showAlert('Hubo un error al listar los proveedores', 'error')
        this.loading = false
      }
    })
  }



  eliminarConfirm = (proveedor: Proveedor) => {
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
      next: (res : ResponseProveedor) => {
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

  seleccionarProveedor = (proveedor: Proveedor) => {
    this.proveedorSelect.set(proveedor)
  }
}
