import { SharedModule } from '@/core/components/shared.module';
import { EliminarProveedor, Proveedor } from '@/proveedor/domain/models/proveedor.model';
import { ProveedorRepository } from '@/proveedor/domain/repositories/proveedor.repository';
import { ProveedorSignal } from '@/proveedor/domain/signals/proveedor.signal';
import { Component, effect, inject } from '@angular/core';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { AddEditProveedor } from "../add-edit-proveedor/add-edit-proveedor";

@Component({
  selector: 'app-list-proveedor',
  imports: [SharedModule, UiButtonComponent, AddEditProveedor],
  templateUrl: './list-proveedor.html',
  styleUrl: './list-proveedor.scss'
})
export class ListProveedor {

  visibleAdd: boolean = false;
  loading: boolean = true

  private signal = inject(ProveedorSignal)
  listProveedor = this.signal.proveedorList
  proveedorSelect = this.signal.proveedorSelect
  proveedorDefault = this.signal.proveedorDefault
  proveedorAccion = this.signal.proveedorAccion

  repository = inject(ProveedorRepository)

  proveedores: Proveedor[] = []

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
      next: () => {
        this.alert.showAlert('Proveedor eliminado correctamente', 'success')
        this.loading = false;
        this.obtener()
      },
      error: () => {
        this.alert.showAlert('Hubo un error al eliminar el proveedor', 'error')
        this.loading = false;
      }
    })
  }
}
