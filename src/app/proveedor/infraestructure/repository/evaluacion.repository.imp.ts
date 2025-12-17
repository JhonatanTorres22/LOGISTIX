import { Injectable } from "@angular/core";
import { EvaluacionRepository } from "../../domain/repositories/evaluacion.repository";
import { EvaluacionService } from "../services/evaluacion.service";
import { Observable } from "rxjs";
import { CrearEvaluacion, Criterio } from "../../domain/models/evaluacion.model";

@Injectable({
    providedIn: 'root'
})

export class EvaluacionRepositoryImpl implements EvaluacionRepository {
    constructor (
        private service: EvaluacionService
    ){}

    obtenerCriterio(): Observable<Criterio[]> {
        return this.service.obtenerCriterios()
    }
    crear(crear: CrearEvaluacion[]): Observable<void> {
        return this.service.crear(crear)
    }
}