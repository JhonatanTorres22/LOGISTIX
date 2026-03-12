import { Injectable, signal } from "@angular/core"
import { ListarCarpetas } from "../models/carpetas.models"

@Injectable({
    providedIn : 'root'
})

export class CarpetaSignal {
    listCarpetaDefault : ListarCarpetas[] = []
    listCarpeta = signal(this.listCarpetaDefault)

    actionCarpeta = signal('')

    carpetaSelectDefault : ListarCarpetas = {
        idCarpeta: 0,
        prefijo: "",
        numeracion: ""
    }

    carpetaSelect = signal(this.carpetaSelectDefault)

    carpetaAction = signal('')

}