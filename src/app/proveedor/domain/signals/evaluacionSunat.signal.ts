import { Injectable, signal } from "@angular/core";
import { ListEvaluacionSunat } from "../models/evaluacionSunat.model";

@Injectable({
    providedIn: 'root'
})

export class EvaluacionSunatSignal {
    listEvaluacionSunat = signal<ListEvaluacionSunat[]>([])

    selectEvaluacionSunatDefault: ListEvaluacionSunat = {
        idSunat: 0,
        idProveedor: 0,
        archivoConsultaRuc: "",
        fechaConsultaRuc: "",
        archivoTrabajadoresPrestadores: "",
        fechaTrabajadoresPrestadores: "",
        archivoDeudaCoactiva: "",
        fechaDeudaCoactiva: "",
        archivoRepresentanteLegal: "",
        fechaRepresentanteLegal: "",
        observacion: "",
        observado: false
    }

    selectEvaluacionSunat = signal(this.selectEvaluacionSunatDefault)

    actionEvaluacionSunat = signal('')
    actionCerrarDrawer = signal('')
    actionFechaConsulta = signal('')

}