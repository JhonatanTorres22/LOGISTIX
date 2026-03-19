import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudCompraSignal } from '@/proceso-compras/domain/signals/solicitud-compra.signal';
import { CronogramaSignal } from '@/proceso-compras/domain/signals/cronograma.signal';

@Component({
  standalone: true,
  selector: 'app-stats-widget',
  imports: [CommonModule],
  template: `
<div class="grid">
  <!-- Orders -->
  <div class="col-12 md:col-6 xl:col-4">
    <div class="card mb-0">
      <div class="flex justify-content-between mb-3">
        <div>
          <span class="block text-muted-color font-medium mb-2">Órdenes Por Firmar</span>
          <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{listOrdenPorFirmar().length}}</div>
        </div>
        <div class="flex align-items-center justify-content-center bg-blue-100 dark:bg-blue-400/10 border-round"
             style="width: 2.5rem; height: 2.5rem">
          <i class="pi pi-pencil text-blue-500 text-xl"></i>
        </div>
      </div>
      <!-- <span class="text-primary font-medium">  {{listOrdenPorFirmar().length}} </span>
      <span class="text-muted-color">since last visit</span> -->
    </div>
  </div>

  <div class="col-12 md:col-6 xl:col-4">
    <div class="card mb-0">
      <div class="flex justify-content-between mb-3">
        <div>
          <span class="block text-muted-color font-medium mb-2">Documentos Por Aprobar</span>
          <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{listDocTributarioPorAprobar().length}}</div>
        </div>
        <div class="flex align-items-center justify-content-center bg-orange-100 dark:bg-orange-400/10 border-round"
             style="width: 2.5rem; height: 2.5rem">
          <i class="pi pi-file-edit text-orange-500 text-xl"></i>
        </div>
      </div>
      <!-- <span class="text-primary font-medium">%52+ </span>
      <span class="text-muted-color">since last week</span> -->
    </div>
  </div>

  <!-- Customers -->
  <div class="col-12 md:col-6 xl:col-4">
    <div class="card mb-0">
      <div class="flex justify-content-between mb-3">
        <div>
          <span class="block text-muted-color font-medium mb-2">Comprobantes Por Subir</span>
          <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{listComprobantePorCargar().length}}</div>
        </div>
        <div class="flex align-items-center justify-content-center bg-cyan-100 dark:bg-cyan-400/10 border-round"
             style="width: 2.5rem; height: 2.5rem">
          <i class="pi pi-cloud-upload text-cyan-500 text-xl"></i>
        </div>
      </div>
      <!-- <span class="text-primary font-medium">520 </span>
      <span class="text-muted-color">newly registered</span> -->
    </div>
  </div>

        `
})
export class StatsWidget {
  private signalSolicitudCompra = inject(SolicitudCompraSignal)
  listOrdenPorFirmar = this.signalSolicitudCompra.listOrdenPorFirmar

  private signalCronograma = inject(CronogramaSignal)
  listDocTributarioPorAprobar = this.signalCronograma.listDocTributarioPorAprobar
  listComprobantePorCargar = this.signalCronograma.listComprobantePorCargar
}
