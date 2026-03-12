import { Injectable, signal } from "@angular/core";
import { ListarDeudaCoactiva } from "../models/deudaCoactiva.model";

@Injectable({
    providedIn : 'root'
})

export class DeudaCoactivaSignal {
    listDeudaCoactiva = signal<ListarDeudaCoactiva[]>([])
    selectDeudaCoactivaDefault : ListarDeudaCoactiva = {
        idDeudaCoactiva: 0,
        monto: 0,
        periodo: "",
        fecha: "",
        entidadAsociada: "",
        idSunat: 0
    }

    selectDeudaCoactiva = signal(this.selectDeudaCoactivaDefault)
    actionDeudaCoactiva = signal(false)
}