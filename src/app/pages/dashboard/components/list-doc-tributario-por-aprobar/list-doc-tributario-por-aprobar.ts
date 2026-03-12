import { ApiError } from '@/core/interceptors/error-message.model';
import { LayoutService } from '@/layout/service/layout.service';
import { DataDocTributarioPorAprobar, DocTributarioPorAprobar } from '@/proceso-compras/domain/models/cronograma.model';
import { OrdenCompraPorFirmar } from '@/proceso-compras/domain/models/ordenCompraDetalle.model';
import { CronogramaRepository } from '@/proceso-compras/domain/repository/cronograma.repository';
import { SolicitudCompraRepository } from '@/proceso-compras/domain/repository/solicitud-compra.repository';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { DataViewModule } from "primeng/dataview";
import { CdkDragPlaceholder } from "@angular/cdk/drag-drop";
import { UiIconButton } from "@/core/components/ui-icon-button/ui-icon-button";
import { CronogramaSignal } from '@/proceso-compras/domain/signals/cronograma.signal';
import { UiCardNotItemsComponent } from "@/core/components/ui-card-not-items/ui-card-not-items.component";

@Component({
  selector: 'app-list-doc-tributario-por-aprobar',
  imports: [CommonModule, ButtonModule, DataViewModule, UiIconButton, UiCardNotItemsComponent],
  templateUrl: './list-doc-tributario-por-aprobar.html',
  styleUrl: './list-doc-tributario-por-aprobar.scss'
})
export class ListDocTributarioPorAprobar {
  private repository = inject(CronogramaRepository)
  private alert = inject(AlertService)
  private signal = inject(CronogramaSignal)
  listDocTributarioPorAprobar = this.signal.listDocTributarioPorAprobar
  constructor(public layoutService: LayoutService) { }

  ngOnInit() {
    this.obtenerDocTributarioPorAprobar()
  }

  obtenerDocTributarioPorAprobar() {
    this.repository.obtenerDocTributarioPorAprobar().subscribe({
      next: (data) => {
        this.listDocTributarioPorAprobar.set(data.data)
        this.listDocTributarioPorAprobar().map(doc => ({
          ...doc,
          estadoTexto:
            doc.estadoProceso === 1 ? 'Pendiente' :
              doc.estadoProceso === 2 ? 'Aprobado' :
                doc.estadoProceso === 3 ? 'Rechazado' :
                  'Desconocido',

          estadoClass:
            doc.estadoProceso === 1 ? 'bg-yellow-100 text-yellow-800' :
              doc.estadoProceso === 2 ? 'bg-green-100 text-green-800' :
                doc.estadoProceso === 3 ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
        }))

        this.alert.showAlert(
          `Listando documentos tributarios por aprobar, ${data.message}`,
          'success'
        )
      },
      error: (err: ApiError) => {
        this.alert.showAlert(`Error al listar, ${err.error.message}`, 'error')
      }
    })
  }

  seleccionarMensaje(mensaje: OrdenCompraPorFirmar) {
    this.layoutService.codigoSolicitudCompraNavbar.set(mensaje.idSolicitudCompra)
  }



}
