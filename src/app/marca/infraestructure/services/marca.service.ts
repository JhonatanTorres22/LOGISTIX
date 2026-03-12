import { AgregarMarca, DataMarca, EditarMarca, EliminarMarca } from "@/marca/domain/models/marca.model";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DataMarcaDTO } from "../dto/marca.dto";
import { MarcaMapper } from "@/marca/domain/mapper/marca.mapper";
import { ApiResponse } from "@/core/interceptors/error-message.model";

@Injectable({
    providedIn: 'root'
})

export class MarcaService {
    private http = inject(HttpClient)
    private urlApi : string = environment.EndPoint
    private urlListarMarca : string = '/api/Marca/Listar'
    private urlAgregarMarca : string = '/api/Marca/Insertar'
    private urlEditarMarca : string = '/api/Marca/Actualizar'
    private urlEliminarMarca : string = '/api/Marca/Eliminar'

    obtenerMarca():Observable<DataMarca>{
        return this.http.get<DataMarcaDTO>(this.urlApi + this.urlListarMarca)
        .pipe(map(api => MarcaMapper.toDomainData(api)))
    }

    agregarMarca(marca: AgregarMarca): Observable<ApiResponse> {
        const newMarca = MarcaMapper.toApiAgregar(marca)
        return this.http.post<ApiResponse>(this.urlApi + this.urlAgregarMarca, newMarca)
    }

    editarMarca(marca: EditarMarca): Observable<ApiResponse> {
        const newMarca = MarcaMapper.toApiEditar(marca)
        return this.http.put<ApiResponse>(this.urlApi + this.urlEditarMarca, newMarca)
    }

    eliminarMarca(marca: EliminarMarca): Observable<ApiResponse> {
        const eliminarMarca = MarcaMapper.toApiEliminar(marca)
        return this.http.delete<ApiResponse>(this.urlApi + this.urlEliminarMarca, {body : eliminarMarca})
    }
}