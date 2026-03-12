import { SharedModule } from '@/core/components/shared.module';
import { GipeoSignal } from '@/proceso-compras/domain/signals/gipeo.signal';
import { SolicitudCompraSignal } from '@/proceso-compras/domain/signals/solicitud-compra.signal';
import { ProveedorProductoSignal } from '@/proveedor-producto/domain/signals/proveedor-producto.signal';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-subtarea',
  imports: [SharedModule],
  templateUrl: './details-subtarea.html',
  styleUrl: './details-subtarea.scss'
})
export class DetailsSubtarea implements OnInit {

    subtareaSignal = inject(GipeoSignal)
  selectSubTarea = this.subtareaSignal.selectSubTarea
  solicitudSignal = inject(SolicitudCompraSignal)
  listSolicitud = this.solicitudSignal.listSolicitud

  signalProveedorProducto = inject(ProveedorProductoSignal)
  selectProveedorProducto = this.signalProveedorProducto.selectProveedorProducto
  presupuestoProgramado : number = 0
  ngOnInit(): void {
    this.presupuestoProgramado =  this.selectSubTarea().rh + this.selectSubTarea().rmf + this.selectSubTarea().inv + this.selectSubTarea().impr
  }
}
