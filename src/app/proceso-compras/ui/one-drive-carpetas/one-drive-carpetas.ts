import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';

import { Dialog } from "primeng/dialog";
import { TreeDragDropService, TreeNode } from 'primeng/api';
import { TreeModule } from "primeng/tree";
import { SharedModule } from '@/core/components/shared.module';
import { DragDropModule } from 'primeng/dragdrop';
import { CarpetasRepository } from '@/proceso-compras/domain/repository/carpeta.repository';
import { ActualizarCarpetaConAnexo } from '@/proceso-compras/domain/models/carpetas.models';
import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { OrdenCarpetaRepository } from '@/panel-solicitudes/domain/repository/orden-carpeta.repository';
import { GipeoSignal } from '@/proceso-compras/domain/signals/gipeo.signal';
import { SolicitudCompraSignal } from '@/proceso-compras/domain/signals/solicitud-compra.signal';
import { OrdenCarpetaSignal } from '@/panel-solicitudes/domain/signals/orden-carpetas.signal';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { UiCardNotItemsComponent } from "@/core/components/ui-card-not-items/ui-card-not-items.component";


@Component({
  selector: 'app-one-drive-carpetas',
  imports: [Dialog, TreeModule, DragDropModule, UiCardNotItemsComponent],
  providers: [TreeDragDropService],
  templateUrl: './one-drive-carpetas.html',
  styleUrl: './one-drive-carpetas.scss'
})
export class OneDriveCarpetas implements OnInit {

  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  private signalOrden = inject(OrdenCarpetaSignal)
  listOrdenCarpeta = this.signalOrden.listOrdenCarpetas
  private repository = inject(OrdenCarpetaRepository)
  private repositoryCarpeta = inject(CarpetasRepository)
  signal = inject(SolicitudCompraSignal)
  listSolicitud = this.signal.listSolicitud

  private alert = inject(AlertService)

  loading: boolean = false
  nodes: TreeNode[] = []

  ngOnInit(): void {
    this.obtenerOrdenCompra()
  }
  obtenerOrdenCompra = () => {
    this.loading = true
    this.repository.obtener(this.listSolicitud()[0].idSolicitudCompra).subscribe({
      next: (resp) => {
        console.log(resp);
        this.listOrdenCarpeta.set(resp.data)
        this.nodes = this.buildTree(resp.data);
        this.alert.showAlert(`Listar los archivos, ${resp.message}`, 'success')
        this.loading = false
      },
      error: (err: ApiError) => {
        this.alert.showAlert(`Error al cargar solicitud, ${err.userMessage}`, 'error');
        this.loading = false
      }
    });
  }

  private buildTree(data: any[]): TreeNode[] {
    return data.map(carpeta => ({
      key: `carpeta-${carpeta.idCarpeta}`,
      label: `${carpeta.prefijo}-${carpeta.numeracion}`,
      icon: 'pi pi-folder',
      styleClass: 'folder-node',
      expanded: true,
      children: this.getAllArchivos(carpeta)
    }));
  }

  private getAllArchivos(carpeta: any): TreeNode[] {
    const nodes: TreeNode[] = [];

    carpeta.carpetaConAnexoPorFase.forEach((caf: any) => {
      const anexo = caf.anexoPorFase[0];

      if (anexo.archivo) {
        nodes.push(this.buildArchivoNode(
          anexo.archivo,
          caf.idCarpetaConAnexoPorFase,
          carpeta.idCarpeta
        ));
      }

      if (anexo.cronograma?.length) {
        nodes.push(...this.buildCronogramas(
          anexo.cronograma,
          caf.idCarpetaConAnexoPorFase,
          carpeta.idCarpeta
        ));
      }
    });

    return nodes;
  }


  private buildCronogramas(cronogramas: any[],idCarpetaConAnexo: number,idCarpetaOrigen: number): TreeNode[] {
    return cronogramas.map(c => ({
      key: `cronograma-${c.idCronogramaPagoProveedor}`,
      label: `Cronograma - ${c.comprobante ?? 'sin archivo'}`,
      icon: 'pi pi-file-pdf',
      styleClass: 'file-node',
      data: {
        ...c,
        idCarpetaConAnexo,
        idCarpetaOrigen
      }
    }));
  }

  private buildArchivoNode( archivo: string,idCarpetaConAnexo: number,idCarpetaOrigen: number): TreeNode {
    return {
      key: `archivo-${archivo}`,
      label: archivo,
      icon: 'pi pi-file-pdf',
      styleClass: 'file-node',
      data: {
        archivo,
        idCarpetaConAnexo,
        idCarpetaOrigen
      }
    };
  }



  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
  }


  onNodeDrop(event: any) {
    const draggedNode = event.dragNode;
    const dropNode = event.dropNode;

    if (draggedNode.styleClass !== 'file-node' || dropNode.styleClass !== 'folder-node') {
      this.alert.showAlert('Solo se pueden mover archivos a carpetas', 'warning');
      event.accept = false;
      this.nodes = this.buildTree(this.listOrdenCarpeta());
      return;
    }

    const idCarpetaConAnexo = draggedNode.data.idCarpetaConAnexo;
    const idCarpetaOrigen = draggedNode.data.idCarpetaOrigen;
    const idCarpetaDestino = Number(dropNode.key.replace('carpeta-', ''));

    if (idCarpetaOrigen === idCarpetaDestino) {
      this.alert.showAlert('El archivo ya está en esta carpeta', 'warning');
      event.accept = false;
      this.nodes = this.buildTree(this.listOrdenCarpeta());
      return;
    }

    const carpetaOrigen = this.listOrdenCarpeta()
      .find(c => c.idCarpeta === idCarpetaOrigen);

    if ((carpetaOrigen?.carpetaConAnexoPorFase.length ?? 0) <= 1) {
      this.alert.showAlert(
        'No se puede mover el último archivo de la carpeta',
        'warning'
      );
      event.accept = false;
      this.nodes = this.buildTree(this.listOrdenCarpeta());
      return;
    }
    this.actualizarArchivo(idCarpetaConAnexo, idCarpetaDestino);
  }


  actualizarArchivo = (idArchivo: any, idCarpetaDestino: number) => {
    this.loading = true;

    const actualizarCarpetaConAnexo: ActualizarCarpetaConAnexo = {
      idCarpeta: idCarpetaDestino,
      idCarpetaConAnexo: idArchivo 
    };

    console.log(actualizarCarpetaConAnexo, 'actualizar')

    this.repositoryCarpeta.actualizarCarpetaConAnexo(actualizarCarpetaConAnexo).subscribe({
      next: (data: ApiResponse) => {
        this.obtenerOrdenCompra()
        this.alert.showAlert(`Archivo movido a otra carpeta, ${data.message}`)
        this.loading = false
      },
      error: (err: ApiError) => {
        this.alert.showAlert(`Error al mover el archivo: ${err.userMessage}`, 'error');
        this.loading = false
        this.nodes = this.buildTree(this.listOrdenCarpeta());
      }
    })
  }


}
