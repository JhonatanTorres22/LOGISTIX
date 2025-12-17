import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CrearEvaluacion, Criterio } from "../../domain/models/evaluacion.model";
import { DataCriterioDTO } from "../dto/evaluacion.dto";
import { EvaluacionMapper } from "../../domain/mappers/evaluacion.mapper";

@Injectable({
    providedIn: 'root'
})

export class EvaluacionService {
    private urlApi : string
    private urlListarCriterio : string
    private urlCrearEvaluacion : string
    constructor(
        private http : HttpClient
    ){
        this.urlApi = environment.EndPoint,
        this.urlListarCriterio = '/api/criterio/Listar'
        this.urlCrearEvaluacion = '/api/evaluacion/Insertar'
    }

    obtenerCriterios = () : Observable<Criterio[]> => {
        return this.http.get<DataCriterioDTO>(this.urlApi + this.urlListarCriterio)
        .pipe(map(api => api.data.map(EvaluacionMapper.toDomainCriterio)))
    }

    obtenerEvaluacion = () => {

    }

    crear = (crear : CrearEvaluacion[]) : Observable<void> => {
        const newEvaluacion = EvaluacionMapper.toApiCrearEvaluacionMasivo(crear)
        return this.http.post<void>(this.urlApi + this.urlCrearEvaluacion, newEvaluacion)
    }
}