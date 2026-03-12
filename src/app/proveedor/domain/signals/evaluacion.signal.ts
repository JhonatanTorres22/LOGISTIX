import { Injectable, signal } from "@angular/core";
import { Criterio, Evaluacion, ProveedorEvaluacion } from "../models/evaluacion.model";

@Injectable({
    providedIn: 'root'
})

export class EvaluacionSignal {
    listCriterioDefault : Criterio[] = []
    listCriterio = signal(this.listCriterioDefault)

    listarEvaluacionDefault : ProveedorEvaluacion[] = []
    listarEvaluacion = signal(this.listarEvaluacionDefault)
}