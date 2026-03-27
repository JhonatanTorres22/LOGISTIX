import { Injectable, signal } from "@angular/core";
import { CarpetaConAnexoSeleccionadaPorTrabajar } from "../model/dashboard.model";


@Injectable({
    providedIn: 'root'
})

export class DashboardSignal {
    selectDefaultCarpetaConAnexoPorTrabajar: CarpetaConAnexoSeleccionadaPorTrabajar = {
        idSubtarea: 0,
        idCarpeta: 0,
        numeracionCarpeta: "",
        prefijoCarpeta: "",
        idSolicitudCompra: 0
    }
    selectCarpetaConAnexoPorTrabajar = signal(this.selectDefaultCarpetaConAnexoPorTrabajar)
}