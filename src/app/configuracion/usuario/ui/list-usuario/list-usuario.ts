import { Component, effect, inject } from '@angular/core';
import { ListPermisos } from "../list-permisos/list-permisos";
import { UsuarioRepository } from '../../domain/repositories/usuario.repository';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { DataUsuario, EliminarUsuario, Usuario } from '../../domain/models/usuario.model';
import { UsuarioSignal } from '../../domain/signals/usuario.signal';
import { SharedModule } from '@/core/components/shared.module';
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { AddEditUsuario } from "../add-edit-usuario/add-edit-usuario";
import { PermissionService } from '@/auth/infraestructure/services/permisos.service';
import { PERMISOS } from '@/auth/infraestructure/services/permisos.constants';
import { UiIconButton } from '@/core/components/ui-icon-button/ui-icon-button';

@Component({
  selector: 'app-list-usuario',
  imports: [ListPermisos, SharedModule, UiButtonComponent, UiLoadingProgressBarComponent, AddEditUsuario, UiIconButton],
  templateUrl: './list-usuario.html',
  styleUrl: './list-usuario.scss'
})
export class ListUsuario {
  visiblePermisos: boolean = false
  loading: boolean = false
  repository = inject(UsuarioRepository)
  signal = inject(UsuarioSignal)
  listUsuario = this.signal.listUsuario
  selectUsuario = this.signal.selectUsuario
  usuarioDefault = this.signal.selectUsuarioDefault
  actionUsuario = this.signal.actionUsuario
  visibleAdd: boolean = false;

  permissionService = inject(PermissionService)
  permisoUsuario = PERMISOS.USUARIO;

  constructor(
    private alert: AlertService
  ) {
    effect(() => {
      let accion = this.actionUsuario()
      if (accion == '') { return }
      if (accion !== '') {
        this.obtener()
      }
      this.actionUsuario.set('');
    })
  }

  ngOnInit() {
    this.obtener()
  }
  obtener = () => {
    if (!this.permisoUsuario.LISTAR) {
      this.alert.showAlert(`Usted no tiene acceso a ${this.permisoUsuario.LISTAR}`, 'error')
      return
    }
    this.loading = true
    this.repository.obtener().subscribe({
      next: (data: DataUsuario) => {
        this.listUsuario.set(data.data)
        this.alert.showAlert(`Listando los usuarios, ${data.message}`, 'success')
        this.loading = false
      },
      error: (error: DataUsuario) => {
        this.alert.showAlert(`Error al listar los usuarios, ${error.message}`, 'error')
        this.loading = false
      }
    })
  }

  eliminarConfirm = (usuario : Usuario) => {
    if (!this.permisoUsuario.ELIMINAR) {
      this.alert.showAlert(`Usted no tiene acceso a ${this.permisoUsuario.ELIMINAR}`, 'error')
      return
    }

    this.loading = true

    this.alert.sweetAlert('question', '¿Confirmar?', '¿Está seguro de eliminar el usuario?')
      .then(isConfirm => {
        if(!isConfirm){this.loading = false; return}

        let eliminar : EliminarUsuario = {
          id : usuario.id
        }

        this.eliminarUsuario(eliminar)
      })
  }

  eliminarUsuario = (eliminar: EliminarUsuario) => {
    this.repository.eliminar(eliminar).subscribe({
      next: (res) => {
        this.loading = false
        this.alert.showAlert(`Usuario eliminado correctamente, ${res.message}`, 'success')
        this.obtener()
        this.selectUsuario.set(this.usuarioDefault)
      },
      error: (err) => {
        this.alert.showAlert(`Error al eliminar el usuario, ${err.message}`, 'error')
        this.loading = false
      }
    })
  }

  usuarioSelect = (usuario: Usuario) => {
    this.selectUsuario.set(usuario)
  }
}
