import { ApiError } from '@/core/interceptors/error-message.model';
import { OrdenCarpetaRepository } from '@/panel-solicitudes/domain/repository/orden-carpeta.repository';
import { OrdenCarpetaSignal } from '@/panel-solicitudes/domain/signals/orden-carpetas.signal';
import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
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
import { SelectModule } from "primeng/select";
import { FormsModule } from '@angular/forms';
import { DashboardSignal } from '@/pages/dashboard/signals/dashboard.signal';
import { CarpetaSignal } from '@/proceso-compras/domain/signals/carpeta.signal';

@Component({
  selector: 'app-tree-solicitudes',
  imports: [TreeModule, CommonModule, UiLoadingProgressBarComponent, FormsModule,
    ListSolicitudCompra, DividerModule, UiCardNotItemsComponent, CardModule, SelectModule],
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
  private currentSolicitudNode: TreeNode | null = null;
  closingNodeKey = signal<string | null>(null);
  solicitudSeleccionada = signal<boolean>(false);
  private dashboardSignal = inject(DashboardSignal)
  carpetaSeleccionadaPorTrabajar = this.dashboardSignal.selectCarpetaConAnexoPorTrabajar
  private carpetaSignal = inject(CarpetaSignal)
  selectCarpeta = this.carpetaSignal.carpetaSelect
  selectDefaultCarpeta = this.carpetaSignal.carpetaSelectDefault
  constructor() {

    effect(() => {
      const carpetaData = this.carpetaSeleccionadaPorTrabajar();
      const nodes = this.nodes();

      if (carpetaData.idSolicitudCompra === 0 || nodes.length === 0) return;

      const node = nodes.find(n => n.key === `solicitud-${carpetaData.idSolicitudCompra}`);
      if (!node) return;

      if (this.currentSolicitudNode && this.currentSolicitudNode.key !== node.key) {
        this.currentSolicitudNode.expanded = false;
        this.currentSolicitudNode.children = [];
      }

      this.currentSolicitudNode = node;
      this.solicitudSeleccionada.set(true);
      this.subtarea.set({ codigoSubTarea: 0 } as any);
      // this.selectCarpeta.set(this.selectDefaultCarpeta)

      this.obtenerOrdenCompra(node, carpetaData.idSolicitudCompra, carpetaData.idCarpeta);
    });

    // Effect 2: archivo asignado → recargar carpetas del nodo activo
    effect(() => {
      const action = this.actionOrdenCompraCarpet();
      const nodes = this.nodes();
      const solicitud = this.subtarea();

      if (!action || nodes.length === 0 || !solicitud) return;

      if (action === 'archivoAsignado') {
        const node = this.currentSolicitudNode ?? nodes.find(n =>
          n.data.codigoSubTarea === solicitud.codigoSubTarea
        );

        if (!node) return;

        // Mantener la subtarea actual al recargar
        const subtareaActual = this.subtarea();
        this.obtenerOrdenCompra(node, node.data.idSolicitudCompra);

        // Restaurar subtarea después de recargar si ya estaba seteada
        if (subtareaActual.codigoSubTarea !== 0) {
          this.subtarea.set(subtareaActual);
        }

        this.actionOrdenCompraCarpet.set('');
      }

      if (action === 'estadoActualizado') {
        this.currentSolicitudNode = null;        // 👈 limpiar referencia
        this.solicitudSeleccionada.set(false);   // 👈 limpiar vista
        this.subtarea.set({ codigoSubTarea: 0 } as any);
        this.actionOrdenCompraCarpet.set('');

        this.obtenerTodasSolicitudesCompra();    // recargar lista limpia
      }
    });
  }


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

    if (node?.key?.startsWith('solicitud')) {
      if (this.currentSolicitudNode?.key === node.key) return;

      if (this.currentSolicitudNode) {
        this.closingNodeKey.set(this.currentSolicitudNode.key ?? null);
        const nodeACerrar = this.currentSolicitudNode;
        setTimeout(() => {
          nodeACerrar.expanded = false;
          nodeACerrar.children = [];
          this.closingNodeKey.set(null);
        }, 250);
      }

      this.subtarea.set({ codigoSubTarea: 0 } as any);
      // this.selectCarpeta.set(this.selectDefaultCarpeta)
      this.solicitudSeleccionada.set(true);  // ← solicitud activa pero sin carpeta aún
      this.currentSolicitudNode = node;

      if (node.children?.length === 0) {
        this.obtenerOrdenCompra(node, node.data.idSolicitudCompra);
      } else {
        node.expanded = true;
      }

      return;
    }

    if (node?.key?.startsWith('carpeta')) {
      const solicitudNode = this.nodes().find(n =>
        n.children?.some(c => c.key === node.key)
      );

      if (solicitudNode) {
        this.subtarea.set(solicitudNode.data);
        this.solicitudSeleccionada.set(false);
      }

      // ← setear carpeta seleccionada
      this.selectCarpeta.set({
        idCarpeta: node.data.idCarpeta,
        prefijo: node.data.prefijo,
        numeracion: node.data.numeracion
      });

      node.expanded = !node.expanded;
    }
  }

  obtenerOrdenCompra = (node: TreeNode, idSolicitud: number, idCarpeta: number = 0) => {
    this.loading = true;

    this.repository.obtener(idSolicitud).subscribe({
      next: (resp) => {
        this.listOrdenCarpeta.set(resp.data);

        if (!resp.data || resp.data.length === 0) {
          this.subtarea.set(node.data);
          this.solicitudSeleccionada.set(false);
          node.expanded = false;
          this.loading = false;
          this.resetNavbarSignal();
          return;
        }

        node.children = this.buildTree(resp.data);
        node.expanded = true;

        if (idCarpeta !== 0) {
          const carpetaNode = node.children.find(c => c.key === `carpeta-${idCarpeta}`);
          if (carpetaNode) {
            carpetaNode.expanded = true;
            this.subtarea.set(node.data);
            this.solicitudSeleccionada.set(false);

            // ← setear carpeta también desde el effect
            this.carpetaSignal.carpetaSelect.set({
              idCarpeta: carpetaNode.data.idCarpeta,
              prefijo: carpetaNode.data.prefijo,
              numeracion: carpetaNode.data.numeracion
            });
          }
        }

        this.resetNavbarSignal();
        this.loading = false;
      },
      error: (err: ApiError) => {
        this.alert.showAlert(`Error al cargar solicitud`, 'error');
        this.loading = false;
      }
    });
  };

  private resetNavbarSignal() {
    this.dashboardSignal.selectCarpetaConAnexoPorTrabajar.set(
      this.dashboardSignal.selectDefaultCarpetaConAnexoPorTrabajar
    );
  }

  private buildTree(data: any[]): TreeNode[] {
    return data.map(carpeta => ({
      key: `carpeta-${carpeta.idCarpeta}`,
      label: `${carpeta.prefijo}-${carpeta.numeracion}`,
      expanded: false,
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
      label: anexo.nombreAnexo,

      expanded: true,
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
        ? 'pi pi-exclamation-triangle icon-warning'
        : node.expanded
          ? 'pi pi-folder-open icon-folder-open'
          : 'pi pi-folder icon-folder';
    }

    if (node.key?.startsWith('carpeta') || node.key?.startsWith('anexo')) {
      return node.expanded
        ? 'pi pi-folder-open icon-folder-open'
        : 'pi pi-folder icon-folder';
    }

    if (node.key?.startsWith('cronograma')) {
      return 'pi pi-calendar icon-calendar';
    }

    if (
      node.key?.startsWith('docTrib') ||
      node.key?.startsWith('infProv') ||
      node.key?.startsWith('infResp') ||
      node.key?.startsWith('compPago') ||
      node.key?.startsWith('archivo')
    ) {
      return 'pi pi-file-pdf icon-pdf';
    }

    return '';
  }
  estadosFiltro = [
    { value: 'Orden de Compra', label: 'Orden de Compra', icon: 'pi pi-shopping-cart' },
    { value: 'Orden Firmada', label: 'Orden Firmada', icon: 'pi pi-file-edit' },
    { value: 'Documento Tributario Por Aprobar', label: 'Documento Tributario Por Aprobar', icon: 'pi pi-file-check' },
    { value: 'Cargar Cronograma', label: 'Cargar Cronograma', icon: 'pi pi-calendar-plus' },
    { value: 'Guia de Remision', label: 'Guia de Remision', icon: 'pi pi-truck' },
    { value: 'Recepcion', label: 'Recepcion', icon: 'pi pi-inbox' },
    { value: 'Entrega', label: 'Entrega', icon: 'pi pi-box' },
    { value: 'Acta', label: 'Acta', icon: 'pi pi-clipboard' },
    { value: 'Completado', label: 'Completado', icon: 'pi pi-check-circle' },
  ];

  filtroActivo = signal<number | null>(null);

  nodesFiltrados = computed(() => {
    const filtro = this.filtroActivo();
    const todos = this.nodes();
    if (filtro === null) return todos;
    return todos.filter(n => n.data?.estadoProximo === filtro);
  });

  filtroActivoModel: number | null = null;

  onFiltroChange(event: any) {
    console.log(event.value);

    this.filtroActivo.set(event.value ?? null);
  }
}
