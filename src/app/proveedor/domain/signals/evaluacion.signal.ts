import { Injectable, signal } from "@angular/core";
import { Criterio } from "../models/evaluacion.model";

@Injectable({
    providedIn: 'root'
})

export class EvaluacionSignal {
    listEvaluacionDefault : Criterio[] = []
    listEvaluacion = signal(this.listEvaluacionDefault)
}