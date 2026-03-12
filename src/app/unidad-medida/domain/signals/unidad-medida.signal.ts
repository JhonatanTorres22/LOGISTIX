import { Injectable, signal } from "@angular/core";
import { ListarUnidadMedida } from "../models/unidad-medida.model";

@Injectable({
    providedIn: 'root'
})

export class UnidadMedidaSignal {
    
    selectUnidadMedidaDefault : ListarUnidadMedida = {
        idUnidadMedida: 0,
        nombre: "",
        descripcion: ""
    }

    selectUnidadMedida = signal<ListarUnidadMedida>(this.selectUnidadMedidaDefault)
    listUnidadMedida = signal<ListarUnidadMedida[]>([])
    actionUnidadMedida = signal<boolean>(false)

}