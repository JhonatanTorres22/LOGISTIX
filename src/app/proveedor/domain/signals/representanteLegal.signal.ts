import { Injectable, signal } from "@angular/core";
import { ListarRepresentanteLegal } from "../models/representanteLegal.model";

@Injectable({
    providedIn : 'root'
})

export class RepresentanteLegalSignal {
    listRepresentanteLegal = signal<ListarRepresentanteLegal[]>([])

    selectRepresentanteLegalDefault : ListarRepresentanteLegal = {
        idRepresentanteLegal: 0,
        nDocumento: "",
        nombreRL: "",
        cargoRL: "",
        fechaDesde: "",
        tipoDocumento: "",
        idSunat: 0
    }

    selectRepresentanteLegal = signal(this.selectRepresentanteLegalDefault)
    actionRepresentanteLegal = signal(false)
}