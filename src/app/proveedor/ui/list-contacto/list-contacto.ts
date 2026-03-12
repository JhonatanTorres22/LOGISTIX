import { SharedModule } from '@/core/components/shared.module';
import { ContactoRepository } from '@/proveedor/domain/repositories/contacto.repository';
import { ContactoSignal } from '@/proveedor/domain/signals/contacto.signal';
import { ProveedorSignal } from '@/proveedor/domain/signals/proveedor.signal';
import { Component, effect, EventEmitter, inject, Input, Output } from '@angular/core';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { AddEditContacto } from "../add-edit-contacto/add-edit-contacto";
import { Contacto, EliminarContacto, ResponseContacto } from '@/proveedor/domain/models/contacto.model';
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";


@Component({
  selector: 'app-list-contacto',
  imports: [SharedModule, UiLoadingProgressBarComponent, AddEditContacto, UiButtonComponent],
  templateUrl: './list-contacto.html',
  styleUrl: './list-contacto.scss'
})
export class ListContacto {
  loading: boolean = false
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  repositoryContacto = inject(ContactoRepository)
  signalContacto = inject(ContactoSignal)
  listContacto = this.signalContacto.listContacto
  selectContacto = this.signalContacto.selectContacto
  contactoDefault = this.signalContacto.selectContactoDefault
  contactoAction = this.signalContacto.contactoAction

  signalProveedor = inject(ProveedorSignal)
  selectProveedor = this.signalProveedor.proveedorSelect

  vista: 'lista' | 'form' = 'lista';
  constructor(
    private alert: AlertService
  ) {
    effect(() => {
      let accion = this.contactoAction()
      if (accion == '') { return }
      if (accion !== '') {
        this.obtener()
      }
      this.contactoAction.set('');
    })
   }
  ngOnInit() {
    this.obtener()
  }

  obtener = () => {
    this.loading = true
    this.repositoryContacto.obtener(this.selectProveedor().id).subscribe({
      next: (data) => {
        this.listContacto.set(data.data)
        this.alert.showAlert(`Listando los contactos, ${data.message}`, 'success')
        this.loading = false
      },

      error: (err) => {
        this.alert.showAlert(`Error al listar los contactos, ${err.message}`, 'error')
        this.loading = false
      }
    })
  }

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  llamar(numero: string) {
  }

  eliminarConfirm = (contacto: Contacto) => {
    this.alert.sweetAlert('question', '¿Confirmar?', '¿Está seguro que desea eliminar el contacto?')
      .then(result => {
        if (!result) { return }
        let eliminar: EliminarContacto = {
          idContacto: contacto.idContacto
        }
        this.eliminar(eliminar)
      })
  }

  eliminar = (eliminar: EliminarContacto) => {
    this.repositoryContacto.eliminar(eliminar).subscribe({
      next: (res: ResponseContacto) => {
        this.alert.showAlert(`Contacto eliminado, ${res.message}`, 'success')
        this.obtener()
      },
      error: (err: ResponseContacto) => {
        this.alert.showAlert(`Error al eliminar, ${err.message}`, 'error')
      }
    })
  }

  seleccionarContacto = (contacto: Contacto) => {
    this.selectContacto.set(contacto)
    this.vista = 'form'
  }
  cerrarFormulario() {
  this.vista = 'lista';
  this.selectContacto.set(this.contactoDefault);
}
}
