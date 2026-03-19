import { ApiError } from '@/core/interceptors/error-message.model';
import { OrdenCarpetaRepository } from '@/panel-solicitudes/domain/repository/orden-carpeta.repository';
import { OrdenCarpetaSignal } from '@/panel-solicitudes/domain/signals/orden-carpetas.signal';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeModule } from "primeng/tree";
import { AlertService } from 'src/assets/demo/services/alert.service';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { AuthService } from '@/auth/infraestructure/services/auth.service';
import { ListSolicitudCompra } from "@/proceso-compras/ui/list-solicitud-compra/list-solicitud-compra";
import { GipeoSignal } from '@/proceso-compras/domain/signals/gipeo.signal';
import { DividerModule } from "primeng/divider";
import { UiCardNotItemsComponent } from "@/core/components/ui-card-not-items/ui-card-not-items.component";
import { CardModule } from "primeng/card";
import { LayoutService } from '@/layout/service/layout.service';

@Component({
  selector: 'app-tree-solicitudes',
  imports: [TreeModule, CommonModule, UiLoadingProgressBarComponent, ListSolicitudCompra, DividerModule, UiCardNotItemsComponent, CardModule],
  templateUrl: './tree-solicitudes.html',
  styleUrl: './tree-solicitudes.scss'
})
export class TreeSolicitudes implements OnInit {
  private repository = inject(OrdenCarpetaRepository)
  private alert = inject(AlertService)
  private signalGipeo = inject(GipeoSignal)
  private signal = inject(OrdenCarpetaSignal)
  listOrdenCarpeta = this.signal.listOrdenCarpetas
  subtarea = this.signalGipeo.selectSubTarea
  listTotalSolicitudesCompra = this.signal.listTodasSolicitudesCompra
  nodes = signal<TreeNode[]>([])
  loading: boolean = false

  treeCollapsed: boolean = false;
  private layoutService = inject(LayoutService)
  codigoSolicitudCompraNavbar = this.layoutService.codigoSolicitudCompraNavbar

  actionOrdenCompraCarpet = this.signal.actionOrdenCompraCarpeta

  private userService = inject(AuthService)
  userData = this.userService.getUserData()
  constructor(
  ) {
    effect(() => {
      const id = this.codigoSolicitudCompraNavbar();
      const nodes = this.nodes();

      if (id && nodes.length > 0) {
        const node = nodes.find(n =>
          n.key === `solicitud-${id}`
        );

        if (node) {
          const solicitud = node.data;
          this.subtarea.set(solicitud);
          this.obtenerOrdenCompra(node, id);
        }
      }
    });

    effect(() => {

      const action = this.actionOrdenCompraCarpet();
      const nodes = this.nodes();
      const solicitud = this.subtarea();

      if (!action) return;
      if (nodes.length === 0) return;
      if (!solicitud) return;

      if (action === 'archivoAsignado') {

        const node = nodes.find(n =>
          n.data.codigoSubTarea === solicitud.codigoSubTarea
        );

        if (!node) return;

        this.obtenerOrdenCompra(node, node.data.idSolicitudCompra);

        this.actionOrdenCompraCarpet.set('');
      }

    });
  };



  ngOnInit(): void {
    this.obtenerTodasSolicitudesCompra();

    const saved = localStorage.getItem('treeCollapsed');
    if (saved !== null) {
      this.treeCollapsed = saved === 'true';
    }
  }

  toggleTree() {
    this.treeCollapsed = !this.treeCollapsed;
    localStorage.setItem('treeCollapsed', String(this.treeCollapsed));
  }

  obtenerTodasSolicitudesCompra() {
    let id =
      this.userData && this.userData.role === 'Responsable'
        ? parseInt(this.userData.codigoUsuario, 10)
        : 0;

    this.loading = true;

    this.repository.obtenerTotalSolicitudCompra(id).subscribe({
      next: (resp) => {
        this.nodes.set(
          resp.data.map((s: any) => ({
            key: `solicitud-${s.idSolicitudCompra}`,
            label: `${s.datosActividad}`,
            expanded: false,
            leaf: false,
            data: s,
            children: [],
            styleClass:
              s.cantidadAnexo === 0
                ? 'solicitud-sin-anexo'
                : 'solicitud-con-anexo'
          }))
        );

        this.loading = false;
      },
      error: (err: ApiError) => {
        this.alert.showAlert(`Error al listar, ${err.userMessage}`, 'error');
        this.loading = false;
      }
    });
  }

  onNodeSelect(event: any): void {

    const node: TreeNode = event.node;

    if (node?.key?.startsWith('solicitud') && node.children?.length === 0) {

      const solicitud = node.data;

      this.subtarea.set(solicitud);

      this.obtenerOrdenCompra(node, solicitud.idSolicitudCompra);
    }
  }

  obtenerOrdenCompra = (node: TreeNode, idSolicitud: number) => {

    this.loading = true;

    this.repository.obtener(idSolicitud).subscribe({
      next: (resp) => {

        this.listOrdenCarpeta.set(resp.data);

        node.children = this.buildTree(resp.data);

        node.expanded = true;

        this.loading = false;
      },
      error: (err: ApiError) => {
        this.alert.showAlert(`Error al cargar solicitud`, 'error');
        this.loading = false;
      }
    });
  };

  private buildTree(data: any[]): TreeNode[] {

    return data.map(carpeta => ({

      key: `carpeta-${carpeta.idCarpeta}`,

      label: `${carpeta.prefijo}-${carpeta.numeracion}`,

      expanded: true,

      data: carpeta,

      children: carpeta.carpetaConAnexoPorFase.map((caf: any) =>
        this.buildAnexoNode(caf)
      )

    }));
  }

  private buildAnexoNode(caf: any): TreeNode {

    const anexo = caf.anexoPorFase[0];

    return {

      key: `anexo-${caf.idAnexoPorFase}`,

      // 👇 ESTA ES LA CARPETA QUE SE MOSTRARÁ
      label: anexo.nombreAnexo,

      expanded: true,

      // 👇 guardamos los IDs pero no se muestran
      data: {
        idCarpetaConAnexoPorFase: caf.idCarpetaConAnexoPorFase,
        idAnexoPorFase: caf.idAnexoPorFase
      },

      children: [

        ...(anexo.archivo
          ? [this.buildArchivoNode(anexo.archivo)]
          : []),

        ...this.buildCronogramas(anexo.cronograma)

      ]
    };
  }

  private buildCronogramas(cronogramas: any[]): TreeNode[] {

    if (!cronogramas || cronogramas.length === 0) {
      return [];
    }

    return cronogramas.map(c => ({

      key: `cronograma-${c.idCronogramaPagoProveedor}`,

      label: `Cronograma - ${new Date(c.fecha).toLocaleDateString()}`,

      expanded: false,

      data: c,

      children: [

        ...(c.documentoTributario ? [{
          key: `docTrib-${c.idCronogramaPagoProveedor}`,
          label: 'Documento Tributario',
          data: c.documentoTributario
        }] : []),

        ...(c.informeProveedor ? [{
          key: `infProv-${c.idCronogramaPagoProveedor}`,
          label: 'Informe Proveedor',
          data: c.informeProveedor
        }] : []),

        ...(c.informeResponsable ? [{
          key: `infResp-${c.idCronogramaPagoProveedor}`,
          label: 'Informe Responsable',
          data: c.informeResponsable
        }] : []),

        ...(c.comprobantePago ? [{
          key: `compPago-${c.idCronogramaPagoProveedor}`,
          label: 'Comprobante de Pago',
          data: c.comprobantePago
        }] : [])

      ]

    }));
  }

  private buildArchivoNode(archivo: string): TreeNode {

    return {

      key: `archivo-${archivo}`,

      label: archivo,

      data: archivo

    };
  }

  getIconClass(node: TreeNode): string {

    if (node.key?.startsWith('solicitud')) {
      return node.data?.cantidadAnexo === 0
        ? 'pi pi-exclamation-triangle text-red'
        : 'pi pi-folder';
    }

    if (node.key?.startsWith('carpeta')) {
      return 'pi pi-folder';
    }

    if (node.key?.startsWith('anexo')) {
      return 'pi pi-folder';
    }

    // 🔥 CRONOGRAMA ES CARPETA
    if (node.key?.startsWith('cronograma')) {
      return 'pi pi-folder';
    }

    // 🔥 SOLO ARCHIVOS SON PDF
    if (
      node.key?.startsWith('docTrib') ||
      node.key?.startsWith('infProv') ||
      node.key?.startsWith('infResp') ||
      node.key?.startsWith('compPago') ||
      node.key?.startsWith('archivo')
    ) {
      return 'pi pi-file-pdf';
    }

    return '';
  }
}
