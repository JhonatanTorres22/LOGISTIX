import { ActualizarFechaConsulta, ActualizarObservacion, AgregarEvaluacionSunat, DataEvaluacionSunat } from "@/proveedor/domain/models/evaluacionSunat.model";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DataEvaluacionSunatDTO } from "../dto/evaluacionSunat.dto";
import { EvaluacionSunatMapper } from "@/proveedor/domain/mappers/evaluacionSunat.mapper";
import { ApiResponse } from "@/core/interceptors/error-message.model";

@Injectable({
    providedIn: 'root'
})

export class EvaluacionSunatService {
    private http = inject(HttpClient)

    private urlApi: string = environment.EndPoint
    private urlListarEvaluaconSunat: string = '/api/Sunat/ListarPorProveedor/'
    private urlAgregarEvaluacionSunat: string = '/api/Sunat/Insertar'
    private urlSubirArchivoSunat: string = '/api/Sunat/ActualizarArchivo'
    private urlActualizarFecha : string = '/api/Sunat/ActualizarFechaConsulta'
    private urlActualizarObservacion : string = '/api/Sunat/ActualizarObservacion'

    obtenerEvaluacionSunat(id: number): Observable<DataEvaluacionSunat> {
        return this.http.get<DataEvaluacionSunatDTO>(this.urlApi + this.urlListarEvaluaconSunat + id)
            .pipe(map(api => EvaluacionSunatMapper.toDomainData(api)))
    }

    agregarEvaluacionSunat(agregar: AgregarEvaluacionSunat): Observable<ApiResponse> {
        const newEvaluacion = EvaluacionSunatMapper.toApiAgregar(agregar)
        return this.http.post<ApiResponse>(this.urlApi + this.urlAgregarEvaluacionSunat, newEvaluacion)
    }

    actualizarArchivoSunat = (formData: FormData): Observable<string> => {
        return this.http.put(this.urlApi + this.urlSubirArchivoSunat, formData, { responseType: 'text' })
    }

    actualizarFechaConsultaSunat (actualizar : ActualizarFechaConsulta) : Observable<ApiResponse> {
        const actualizarFecha = EvaluacionSunatMapper.toActualizarFechaConsulta(actualizar)
        return this.http.put<ApiResponse>(this.urlApi + this.urlActualizarFecha, actualizarFecha)
    }

    actualizarObservacion (observacion : ActualizarObservacion) : Observable<ApiResponse>{
        const actualizarObservacion = EvaluacionSunatMapper.toApiActualizarObservacion(observacion)
        return this.http.put<ApiResponse>(this.urlApi + this.urlActualizarObservacion, actualizarObservacion)

    }
}