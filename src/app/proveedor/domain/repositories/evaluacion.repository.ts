import { Observable } from "rxjs";
import { CrearEvaluacion, Criterio, DataCriterio, DataEvaluacion, EditarEvaluacion, ResponseEvaluacion } from "../models/evaluacion.model";

export abstract class EvaluacionRepository {
    abstract obtenerCriterio  () : Observable<DataCriterio>
    abstract crear(crear : CrearEvaluacion[]): Observable<ResponseEvaluacion>
    abstract editar(editar: EditarEvaluacion[]): Observable<ResponseEvaluacion>
    abstract obtenerEvaluacion (id:number) : Observable<DataEvaluacion>
}