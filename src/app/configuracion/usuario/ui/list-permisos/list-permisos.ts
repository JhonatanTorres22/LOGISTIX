import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { PermisoRepository } from '../../domain/repositories/permiso.repository';
import { AsignarPermisos, DataModuloPermiso, EliminarPermisos, ResponsePermisos, RolPermiso } from '../../domain/models/permisos.model';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { PermisoSignal } from '../../domain/signals/permiso.signal';
import { SharedModule } from '@/core/components/shared.module';
import { TreeNode } from 'primeng/api';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { UsuarioSignal } from '../../domain/signals/usuario.signal';
import { DialogModule } from "primeng/dialog";
import { FieldsetModule } from "primeng/fieldset";
import { ProcesoComprasModule } from "@/proceso-compras/proceso-compras-module";
import { TreeModule } from "primeng/tree";

@Component({
  selector: 'app-list-permisos',
  imports: [UiLoadingProgressBarComponent, DialogModule, FieldsetModule, ProcesoComprasModule, TreeModule],
  templateUrl: './list-permisos.html',
  styleUrl: './list-permisos.scss'
})
export class ListPermisos {
  loading: boolean = false
  @Input() visible: boolean = false
  @Output() visibleChange = new EventEmitter<boolean>();

  repository = inject(PermisoRepository);
  signal = inject(PermisoSignal);
  usuarioSignal = inject(UsuarioSignal)
  selectUsuario = this.usuarioSignal.selectUsuario
  listPermiso = this.signal.listPermiso;

  treesPorRol = new Map<string, TreeNode[]>();
  selectedNodes: TreeNode[] = [];

  permisosUsuarioSet = new Set<number>();

  constructor(
    private alert: AlertService
  ) { }
  ngOnInit() {
    this.obtenerPermisoxUsuario();
  }

  obtener = () => {
    this.repository.obtener().subscribe({
      next: (resp: DataModuloPermiso) => {
        console.log(resp);
        
        this.treesPorRol.clear();
        this.selectedNodes = [];

        resp.data.forEach(modulo => {
          modulo.roles.forEach(rol => {

            const tree: TreeNode[] = rol.permisos.map(p => {

              const yaAsignado = this.permisosUsuarioSet.has(p.codigoPermiso);

              const node: TreeNode = {
                label: p.descripcionPermiso,
                key: `${p.codigoPermiso}`,
                data: p,
                // selectable: !yaAsignado
              };

              if (yaAsignado) {
                this.selectedNodes.push(node);
              }

              return node;
            });

            this.treesPorRol.set(rol.nombreRol, tree);
          });
        });

        this.listPermiso.set(resp.data);
        this.loading = false
      },
      error: () => {
        this.alert.showAlert('Error al guardar los permisos', 'error')
      }
    });
  };


  obtenerPermisoxUsuario = () => {
    this.loading = true
    this.repository.permisoxUsuario(this.selectUsuario().id).subscribe({
      next: (resp: DataModuloPermiso) => {

        this.permisosUsuarioSet.clear();

        resp.data.forEach(modulo => {
          modulo.roles.forEach(rol => {
            rol.permisos.forEach(p => {
              this.permisosUsuarioSet.add(p.codigoPermiso);
            });
          });
        });

        this.obtener()
      },
      error: () => {
        this.alert.showAlert(`Error al listar los permisos por usuario`, 'error');
        this.loading = false
      }
    });
  };

  onSelectionChange(nodes: TreeNode[] | TreeNode | null) {
    const selectedArray: TreeNode[] = [];

    if (nodes) {
      if (Array.isArray(nodes)) {
        selectedArray.push(...nodes);
      } else {
        selectedArray.push(nodes);
      }
    }

    this.selectedNodes = selectedArray;
  }

  guardarCambios = () => {

    this.loading = true;

    const originales = Array.from(this.permisosUsuarioSet);
    const actuales = this.selectedNodes.map(
      node => node.data.codigoPermiso
    );

    const agregar = actuales.filter(c => !originales.includes(c));
    const eliminar = originales.filter(c => !actuales.includes(c));

    if (agregar.length === 0 && eliminar.length === 0) {
      this.alert.showAlert('No hay cambios para guardar', 'warning');
      this.loading = false;
      return;
    }

    this.alert.sweetAlert(
      'question',
      '¿Confirmar?',
      '¿Desea guardar los cambios en los permisos?'
    ).then(result => {

      if (!result) {
        this.loading = false;
        return;
      }

      const idUsuario = this.selectUsuario().id;

      const ejecutarAgregar = () => {

        if (agregar.length === 0) {
          this.finalizarGuardado();
          return;
        }

        const payloadAgregar = agregar.map(codigo => ({
          idPermiso: codigo,
          idUsuario
        }));

        this.repository.asignar(payloadAgregar).subscribe({
          next: () => this.finalizarGuardado(),
          error: (err) => {
            this.alert.showAlert(
              `Error al agregar permisos: ${err.message}`,
              'error'
            );
            this.loading = false;
          }
        });
      };

      const ejecutarEliminar = () => {

        if (eliminar.length === 0) {
          ejecutarAgregar();
          return;
        }

        const payloadEliminar = eliminar.map(codigo => ({
          idPermiso: codigo,
          idUsuario
        }));

        this.repository.eliminarPermisos(payloadEliminar).subscribe({
          next: () => ejecutarAgregar(),
          error: (err) => {
            this.alert.showAlert(
              `Error al eliminar permisos: ${err.message}`,
              'error'
            );
            this.loading = false;
          }
        });
      };

      ejecutarEliminar();
    });
  };

  finalizarGuardado() {
    this.alert.showAlert(
      'Permisos actualizados correctamente',
      'success'
    );
    this.obtenerPermisoxUsuario();
  }



  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
