import { Injectable, signal } from "@angular/core";
import { ListarOrdenCompra } from "../models/ordenCompraDetalle.model";

@Injectable({
    providedIn : 'root'
})

export class OrdenCompraDetalleSignal {
    listOrdenCompraDetalle = signal<ListarOrdenCompra[]>([])

    selectOrdenCompraDefault : ListarOrdenCompra = {
        idSolicitudCompra: 0,
        tipoGasto: "",
        idSubTarea: 0,
        areaResponsable: "",
        codigoPlanDeTrabajo: "",
        datosDeActividad: undefined,
        presupuestoProgramado: 0,
        total: 0,
        anexosPorFases: []
    }

    selectOrdenCompra = signal(this.selectOrdenCompraDefault)
    actionOrdenCompra = signal(false)
}