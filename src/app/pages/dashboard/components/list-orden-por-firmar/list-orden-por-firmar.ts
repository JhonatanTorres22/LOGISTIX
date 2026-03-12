import { ApiError } from '@/core/interceptors/error-message.model';
import { LayoutService } from '@/layout/service/layout.service';
import { OrdenCompraPorFirmar } from '@/proceso-compras/domain/models/ordenCompraDetalle.model';
import { SolicitudCompraRepository } from '@/proceso-compras/domain/repository/solicitud-compra.repository';
import { Component, inject } from '@angular/core';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { DataViewModule } from "primeng/dataview";
import { TagModule } from "primeng/tag";
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SolicitudCompraSignal } from '@/proceso-compras/domain/signals/solicitud-compra.signal';
import { UiCardNotItemsComponent } from "@/core/components/ui-card-not-items/ui-card-not-items.component";
import { CdkDragPlaceholder } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-list-orden-por-firmar',
  imports: [DataViewModule, TagModule, CommonModule, ButtonModule, UiCardNotItemsComponent, CdkDragPlaceholder],
  templateUrl: './list-orden-por-firmar.html',
  styleUrl: './list-orden-por-firmar.scss'
})
export class ListOrdenPorFirmar {

  private repository = inject(SolicitudCompraRepository)
  private alert = inject(AlertService)
  private signal = inject(SolicitudCompraSignal)
  listOrdenPorFirmar = this.signal.listOrdenPorFirmar
  constructor(public layoutService: LayoutService) { }
  ngOnInit() {
    this.obtenerOrdencompraPorFirmar()
  }

  obtenerOrdencompraPorFirmar() {
    this.repository.obtenerOrdenCompraPorFirmar().subscribe({
      next: (data) => {
        this.listOrdenPorFirmar.set(data.data)
        this.alert.showAlert(`Listando notificaciones por firmar, ${data.message}`, 'success')
      },
      error: (err: ApiError) => {
        this.alert.showAlert(`Error al listar, ${err.error.message}`, 'error')
      }
    })
  }

  seleccionarMensaje(ordenPorFirmar: OrdenCompraPorFirmar) {
    this.layoutService.codigoSolicitudCompraNavbar.set(ordenPorFirmar.idSolicitudCompra)
  }
}
