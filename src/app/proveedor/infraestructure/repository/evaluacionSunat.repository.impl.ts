import { EvaluacionSunatRepository } from "@/proveedor/domain/repositories/evaluacionSunat.repository";
import { inject } from "@angular/core";
import { EvaluacionSunatService } from "../services/evaluacionSunat.service";
import { ApiResponse } from "@/core/interceptors/error-message.model";
import { ActualizarFechaConsulta, ActualizarObservacion, AgregarEvaluacionSunat, DataEvaluacionSunat } from "@/proveedor/domain/models/evaluacionSunat.model";
import { Observable } from "rxjs";

export class EvaluacionSunatRepositoryImpl implements EvaluacionSunatRepository {
    private service = inject(EvaluacionSunatService)

    obtenerEvaluacionSunat(id: number): Observable<DataEvaluacionSunat> {
        return this.service.obtenerEvaluacionSunat(id)
    }
    
    agregarEvaluacionSunat(agregar: AgregarEvaluacionSunat): Observable<ApiResponse> {
        return this.service.agregarEvaluacionSunat(agregar)
    }
    
    actualizarArchivoSunat(formData: FormData): Observable<string> {
        return this.service.actualizarArchivoSunat(formData)
    }

    actualizarFechaConsulta(actualizar: ActualizarFechaConsulta): Observable<ApiResponse> {
        return this.service.actualizarFechaConsultaSunat(actualizar)
    }
    
    actualizarObservacion(observacion: ActualizarObservacion): Observable<ApiResponse> {
        return this.service.actualizarObservacion(observacion)
    }

}