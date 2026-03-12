import { Injectable, signal } from "@angular/core";
import { OrdenCarpetas, SolicitudesComprasCompletas } from "../models/orden-carpeta.model";
import { SubTarea } from "@/proceso-compras/domain/models/gipeo.model";

@Injectable({
    providedIn : 'root'
})

export class OrdenCarpetaSignal {
    selectSubtareaDefault : SubTarea = {
        codigoSubTarea: 0,
        nombreSubTarea: "",
        valorPorcentual: 0,
        rh: 0,
        rhGasto: 0,
        rmf: 0,
        rmfGasto: 0,
        inv: 0,
        invGasto: 0,
        impr: 0,
        imprGasto: 0,
        monedaTipo: "",
        fechaInicioST: "",
        horaInicioST: "",
        fechaFinST: "",
        horaFinST: "",
        fechaRealizacionST: "",
        estadoRealizacionST: false,
        color: ""
    }
    selectSubtarea = signal(this.selectSubtareaDefault)

    listOrdenCarpetasDefault : OrdenCarpetas[] = []

    listOrdenCarpetas = signal(this.listOrdenCarpetasDefault)

    listTodasSolicitudesCompraDefault : SolicitudesComprasCompletas[] = []
    listTodasSolicitudesCompra = signal(this.listTodasSolicitudesCompraDefault)
}