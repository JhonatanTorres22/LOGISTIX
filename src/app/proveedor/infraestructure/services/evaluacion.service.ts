import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CrearEvaluacion, Criterio, DataCriterio, DataEvaluacion, EditarEvaluacion, ResponseEvaluacion } from "../../domain/models/evaluacion.model";
import { DataCriterioDTO, DataEvaluacionDTO } from "../dto/evaluacion.dto";
import { EvaluacionMapper } from "../../domain/mappers/evaluacion.mapper";

@Injectable({
    providedIn: 'root'
})

export class EvaluacionService {
    private urlApi : string = environment.EndPoint
    private urlListarCriterio : string = '/api/criterio/Listar'
    private urlCrearEvaluacion : string = '/api/evaluacion/Insertar'
    private urlListarEvaluacion : string = '/api/evaluacion/Listar/'
    private urlEditarEvaluacion : string = '/api/evaluacion/Actualizar'
    constructor(
        private http : HttpClient
    ){}

    obtenerCriterios = () : Observable<DataCriterio> => {
        return this.http.get<DataCriterioDTO>(this.urlApi + this.urlListarCriterio)
        .pipe(map(api => EvaluacionMapper.toDomainDataCriterio(api)))
    }

    obtenerEvaluacion = (id:number) : Observable<DataEvaluacion> => {
        return this.http.get<DataEvaluacionDTO>(this.urlApi + this.urlListarEvaluacion + id)
        .pipe(map(api => EvaluacionMapper.toDomainDataEvaluacion(api)))
    }

    crear = (crear : CrearEvaluacion[]) : Observable<ResponseEvaluacion> => {
        const newEvaluacion = EvaluacionMapper.toApiCrearEvaluacionMasivo(crear)
        return this.http.post<ResponseEvaluacion>(this.urlApi + this.urlCrearEvaluacion, newEvaluacion)
    }

    editar = (editar : EditarEvaluacion[]): Observable<ResponseEvaluacion> => {
        const editEvaluacion = EvaluacionMapper.toApiEditar(editar)
        return this.http.put<ResponseEvaluacion>(this.urlApi + this.urlEditarEvaluacion, editEvaluacion)
    }
}