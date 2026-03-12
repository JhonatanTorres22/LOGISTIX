import { Injectable } from "@angular/core";
import { EvaluacionRepository } from "../../domain/repositories/evaluacion.repository";
import { EvaluacionService } from "../services/evaluacion.service";
import { Observable } from "rxjs";
import { CrearEvaluacion, Criterio, DataCriterio, DataEvaluacion, EditarEvaluacion, ResponseEvaluacion } from "../../domain/models/evaluacion.model";

@Injectable({
    providedIn: 'root'
})

export class EvaluacionRepositoryImpl implements EvaluacionRepository {
    constructor (
        private service: EvaluacionService
    ){}

    obtenerCriterio = (): Observable<DataCriterio> => {
        return this.service.obtenerCriterios()
    }
    crear = (crear: CrearEvaluacion[]): Observable<ResponseEvaluacion> => {
        return this.service.crear(crear)
    }
    obtenerEvaluacion = (id: number): Observable<DataEvaluacion> => {
        return this.service.obtenerEvaluacion(id)
    }
    editar = (editar: EditarEvaluacion[]): Observable<ResponseEvaluacion> => {
        return this.service.editar(editar)
    }
}