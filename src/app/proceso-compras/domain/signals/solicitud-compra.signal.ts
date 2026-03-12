import { Injectable, signal } from "@angular/core";
import { SolicitudCompra } from "../models/solicitud-compra.model";
import { OrdenCompraPorFirmar } from "../models/ordenCompraDetalle.model";



@Injectable({
    providedIn : 'root'
})

export class SolicitudCompraSignal {
    listSolicitudDefault : SolicitudCompra[] = []
    listSolicitud = signal(this.listSolicitudDefault)

    actionSolicitudCompra = signal('')

    listOrdenPorFirmar = signal<OrdenCompraPorFirmar[]>([])

}