import { Observable } from "rxjs";
import { CrearEvaluacion, Criterio } from "../models/evaluacion.model";

export abstract class EvaluacionRepository {
    abstract obtenerCriterio  () : Observable<Criterio[]>
    abstract crear(crear : CrearEvaluacion[]): Observable<void>
}