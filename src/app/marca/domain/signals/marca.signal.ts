import { Injectable, signal } from "@angular/core";
import { ListarMarca } from "../models/marca.model";

@Injectable({
    providedIn : 'root'
})

export class MarcaSignal {
    listMarca = signal<ListarMarca[]>([])

    selectMarcaDefault : ListarMarca = {
        idMarca: 0,
        nombreMarca: "",
        descripcionMarca: ""
    }

    selectMarca = signal(this.selectMarcaDefault)

    actionMarca = signal('')
}