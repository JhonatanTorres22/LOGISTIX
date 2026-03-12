import { Component, computed, inject } from '@angular/core';
import { Card } from "@/core/components/card/card";
import { SearchSubtarea } from "./search-subtarea/search-subtarea";
import { SolicitudCompraSignal } from '../domain/signals/solicitud-compra.signal';
import { AnexoPorFaseSignal } from '../domain/signals/anexoPorFase.signal';
import { AuthService } from '@/auth/infraestructure/services/auth.service';
import { PanelSolicitudesComponent } from "@/panel-solicitudes/ui/panel-solicitudes-component";

@Component({
  selector: 'app-proceso-compras-component',
  imports: [Card, SearchSubtarea, PanelSolicitudesComponent],
  templateUrl: './proceso-compras-component.html',
  styleUrl: './proceso-compras-component.scss'
})
export class ProcesoComprasComponent {

  private authService = inject(AuthService)
  dataUser = this.authService.getUserData()
  anexoSignal = inject(AnexoPorFaseSignal)
  tieneOrdenCompraConArchivo = this.anexoSignal.tieneOrdenCompraConArchivo

  mostrarFlujoCompra = computed(() =>
  this.anexoSignal.tieneOrdenCompraConArchivo()
);

}
