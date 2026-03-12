import { AgregarRepresentanteLegal, DataRepresentanteLegal, EditarRepresentanteLegal, EliminarRepresentanteLegal } from "@/proveedor/domain/models/representanteLegal.model";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DataRepresentanteLegalDTO } from "../dto/representanteLegal.dto";
import { RepresentanteLegalMappper } from "@/proveedor/domain/mappers/representanteLegal.mapper";
import { ApiResponse } from "@/core/interceptors/error-message.model";

@Injectable({
    providedIn: 'root'
})

export class RepresentanteLegalService {
    private http = inject(HttpClient)
    private urlApi = environment.EndPoint
    private urlListar = '/api/RepresentanteLegal/ListarPorSunat/'
    private urlAgregar: string = '/api/RepresentanteLegal/Insertar'
    private urlEditar: string = '/api/RepresentanteLegal/Actualizar'
    private urlEliminar: string = '/api/RepresentanteLegal/Eliminar'

    obtenerRepresenteLegal(id: number): Observable<DataRepresentanteLegal> {
        return this.http.get<DataRepresentanteLegalDTO>(this.urlApi + this.urlListar + id)
            .pipe(map(api => RepresentanteLegalMappper.toDomainData(api)
            ))
    }

    agregarRepresentanteLegal(agregar: AgregarRepresentanteLegal): Observable<ApiResponse> {
        const newRepresentante = RepresentanteLegalMappper.toApiAgregar(agregar)
        return this.http.post<ApiResponse>(this.urlApi + this.urlAgregar, newRepresentante)
    }

    editarRepresentanteLegal(editar: EditarRepresentanteLegal): Observable<ApiResponse> {
        const editRepresentante = RepresentanteLegalMappper.toApiEditar(editar)
        return this.http.put<ApiResponse>(this.urlApi + this.urlEditar, editRepresentante)
    }

    eliminarRepresentanteLegal(eliminar: EliminarRepresentanteLegal): Observable<ApiResponse> {
        const deleteRepresentante = RepresentanteLegalMappper.toApiEliminar(eliminar)
        return this.http.delete<ApiResponse>(this.urlApi + this.urlEliminar, { body: deleteRepresentante })
    }
}