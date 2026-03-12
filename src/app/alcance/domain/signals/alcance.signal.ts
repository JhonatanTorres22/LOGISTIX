import { Injectable, signal } from "@angular/core";
import { ListarAlcance } from "../models/alcance.model";

@Injectable({
    providedIn: 'root'
})
export class AlcanceSignal {

    listAlcance = signal<ListarAlcance[]>([])


    selectAlcanceDefault: ListarAlcance = {
        id: 0,
        descripcion: "",
        direccion: "",
        coordenada: ""
    }

    selectAlcance = signal(this.selectAlcanceDefault)

    alcanceAccion = signal('')
}