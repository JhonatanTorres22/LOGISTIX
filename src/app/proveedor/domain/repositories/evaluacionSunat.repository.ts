import { Observable } from "rxjs";
import { ActualizarFechaConsulta, ActualizarObservacion, AgregarEvaluacionSunat, DataEvaluacionSunat } from "../models/evaluacionSunat.model";
import { observableToBeFn } from "rxjs/internal/testing/TestScheduler";
import { ApiResponse } from "@/core/interceptors/error-message.model";

export abstract class EvaluacionSunatRepository {
    abstract obtenerEvaluacionSunat(id: number): Observable<DataEvaluacionSunat>
    abstract agregarEvaluacionSunat(agregar: AgregarEvaluacionSunat): Observable<ApiResponse>
    abstract actualizarArchivoSunat(formData: FormData): Observable<string>
    abstract actualizarFechaConsulta (actualizar : ActualizarFechaConsulta) : Observable<ApiResponse>
    abstract actualizarObservacion(observacion : ActualizarObservacion) : Observable<ApiResponse>
}