import { UnidadMedidaMapper } from "@/unidad-medida/domain/mapper/unidad-medida.mapper";
import { AgregarUnidadMedida, DataUnidadMedida, EditarUnidadMedida, EliminarUnidadMedida } from "@/unidad-medida/domain/models/unidad-medida.model";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DataUnidadMedidaDTO } from "../dto/unidad-medida.dto";
import { ApiResponse } from "@/core/interceptors/error-message.model";

@Injectable({
    providedIn: 'root'
})

export class UnidadMedidaService {
    private http = inject(HttpClient)
    private urlApi: string = environment.EndPoint
    private urlListar: string = '/api/UnidadMedida/Listar'
    private urlInsertarUnidadMedida: string = '/api/UnidadMedida/Insertar'
    private urlEditarUnidadMedida: string = '/api/UnidadMedida/Actualizar'
    private urlEliminarUnidadMedida: string = '/api/UnidadMedida/Eliminar'

    obtenerUnidadMedida() : Observable<DataUnidadMedida>{
        return this.http.get<DataUnidadMedidaDTO>(this.urlApi + this.urlListar)
        .pipe(map(apiResponse => UnidadMedidaMapper.toDomainDataUnidadMedida(apiResponse)))
    }

    agregarUnidadMedida(agregar: AgregarUnidadMedida): Observable<ApiResponse> {
        const newUnidad = UnidadMedidaMapper.toApiAgregarUnidadMedida(agregar)
        return this.http.post<ApiResponse>(this.urlApi + this.urlInsertarUnidadMedida, newUnidad)
    }

    editarUnidadMedida(editar: EditarUnidadMedida): Observable<ApiResponse> {
        const editUnidad = UnidadMedidaMapper.toApiEditarUnidadMedida(editar)
        return this.http.put<ApiResponse>(this.urlApi + this.urlEditarUnidadMedida, editUnidad)
    }

    eliminarUnidadMedida(eliminar: EliminarUnidadMedida): Observable<ApiResponse> {
        const deleteUnidad = UnidadMedidaMapper.toApiEliminarUnidadMedida(eliminar)
        return this.http.delete<ApiResponse>(this.urlApi + this.urlEliminarUnidadMedida, { body: deleteUnidad })
    }
}