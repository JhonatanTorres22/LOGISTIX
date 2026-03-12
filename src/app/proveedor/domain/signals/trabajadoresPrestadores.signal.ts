import { Injectable, signal } from "@angular/core";
import { TrabajadoresPrestadores } from "../models/trabajadoresPrestadores.model";

@Injectable({
    providedIn : 'root'
})

export class TrabajadoresPrestadoresSignal {
    listTrabajador = signal<TrabajadoresPrestadores[]>([])

    selectTrabajadorDefault : TrabajadoresPrestadores = {
        idTrabajadores: 0,
        periodo: "",
        nTrabajadores: 0,
        nPensionistas: 0,
        nPrestadoresDeServicios: 0,
    }

    selectTrabajadores = signal(this.selectTrabajadorDefault)
    actionTrabajadores = signal('')
}