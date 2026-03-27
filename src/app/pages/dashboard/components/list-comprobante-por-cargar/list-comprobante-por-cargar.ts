import { ApiError } from '@/core/interceptors/error-message.model';
import { LayoutService } from '@/layout/service/layout.service';
import { OrdenCompraPorFirmar } from '@/proceso-compras/domain/models/ordenCompraDetalle.model';
import { CronogramaRepository } from '@/proceso-compras/domain/repository/cronograma.repository';
import { CronogramaSignal } from '@/proceso-compras/domain/signals/cronograma.signal';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { DataViewModule } from "primeng/dataview";
import { UiIconButton } from "@/core/components/ui-icon-button/ui-icon-button";
import { UiCardNotItemsComponent } from "@/core/components/ui-card-not-items/ui-card-not-items.component";
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { Router } from '@angular/router';
import { DashboardSignal } from '../../signals/dashboard.signal';

@Component({
  selector: 'app-list-comprobante-por-cargar',
  imports: [CommonModule, DataViewModule, UiIconButton, UiCardNotItemsComponent, UiLoadingProgressBarComponent],
  templateUrl: './list-comprobante-por-cargar.html',
  styleUrl: './list-comprobante-por-cargar.scss'
})
export class ListComprobantePorCargar {

  loading : boolean = false
  private repository = inject(CronogramaRepository)
  private alert = inject(AlertService)
  private signal = inject(CronogramaSignal)
  listComprobantePorCargar = this.signal.listComprobantePorCargar

  private dashboardSignal = inject(DashboardSignal)

  constructor(private router: Router,) { }

  ngOnInit() {
    this.obtenerComprobantePorAprobar()
  }

  obtenerComprobantePorAprobar() {
    this.loading = true
    this.repository.obtenerComprobantePorCargar().subscribe({
      next: (data) => {
        this.loading = false
        this.listComprobantePorCargar.set(data.data)
        this.alert.showAlert(
          `Listando comprobantes por cargar, ${data.message}`,
          'success'
        )
      },
      error: (err: ApiError) => {
        this.loading = false
        this.alert.showAlert(`Error al listar, ${err.error.message}`, 'error')
      }
    })
  }

  seleccionarMensaje(mensaje: OrdenCompraPorFirmar) {
     this.dashboardSignal.selectCarpetaConAnexoPorTrabajar.set({
      idSolicitudCompra : mensaje.idSolicitudCompra,
    idSubtarea: mensaje.idSubTarea,
    idCarpeta: mensaje.idCarpeta ?? 0,
    numeracionCarpeta: mensaje.numeracionCarpeta ?? '',
    prefijoCarpeta: mensaje.prefijoCarpeta ?? ''
  });

  this.router.navigate(['/solicitud-compra']);
  }

}
