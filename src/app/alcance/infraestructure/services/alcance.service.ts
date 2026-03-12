import { AlcanceMapper } from "@/alcance/domain/mapper/alcance.mapper";
import { AgregarAlcance, DataAlcance, EditarAlcance, EliminarAlcance } from "@/alcance/domain/models/alcance.model";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DataAlcanceDTO } from "../dto/alcance.dto";
import { ApiResponse } from "@/core/interceptors/error-message.model";

@Injectable({
    providedIn : 'root'
})

export class AlcanceService {
    private http = inject(HttpClient)
    private urlApi : string
    private urlListar : string
    private urlAgregar : string
    private urlEditar : string
    private urlEliminar : string
    constructor(){
        this.urlApi = environment.EndPoint,
        this.urlListar = '/api/Alcance/Listar'
        this.urlAgregar = '/api/Alcance/Insertar'
        this.urlEditar = '/api/Alcance/Actualizar'
        this.urlEliminar = '/api/Alcance/Eliminar'
    }

    obtener(): Observable<DataAlcance>{
        return this.http.get<DataAlcanceDTO>(this.urlApi + this.urlListar)
        .pipe(map(api => AlcanceMapper.toDomainData(api)))
    }

    agregar(agregar : AgregarAlcance): Observable<ApiResponse> {
        const newAlcance = AlcanceMapper.toApiAgregar(agregar)
        return this.http.post<ApiResponse>(this.urlApi + this.urlAgregar, newAlcance)
    }

    editar(editar : EditarAlcance): Observable<ApiResponse> {
        const editAlcance = AlcanceMapper.toApiEditar(editar)
        return this.http.put<ApiResponse>(this.urlApi + this.urlEditar, editAlcance)
    }

    eliminar( eliminar : EliminarAlcance): Observable<ApiResponse> {
        const eliminarAlcance = AlcanceMapper.toApiEliminar(eliminar)
        return this.http.request<ApiResponse>('delete', this.urlApi + this.urlEliminar, {body : eliminarAlcance})
    }
}