import { AgregarTrabajadoresPrestadores, DataTrabajadoresPrestadores, EditarTrabajadoresPrestadores, EliminarTrabajadoresPrestadores } from "@/proveedor/domain/models/trabajadoresPrestadores.model";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DataTrabajadoresPrestadoresDTO } from "../dto/trabajadoresPrestadores.dto";
import { TrabajadoresPrestadoresMapper } from "@/proveedor/domain/mappers/trabajadoresPrestadores.mapper";
import { ApiResponse } from "@/core/interceptors/error-message.model";

@Injectable({
    providedIn : 'root'
})

export class TrabajadoresPrestadoresService {
    private http = inject(HttpClient)

    private urlApi : string = environment.EndPoint
    private urlListar : string = '/api/TrabajadoresPrestadoresDeServicio/ListarPorSunat/'
    private urlAgregar : string = '/api/TrabajadoresPrestadoresDeServicio/Insertar'
    private urlEditar : string = '/api/TrabajadoresPrestadoresDeServicio/Actualizar'
    private urlEliminar : string = '/api/TrabajadoresPrestadoresDeServicio/Eliminar'

    obtener (id : number) : Observable<DataTrabajadoresPrestadores>{
        return this.http.get<DataTrabajadoresPrestadoresDTO>(this.urlApi + this.urlListar + id)
        .pipe(map(api => TrabajadoresPrestadoresMapper.toDomainData(api)))
    }

    agregar (agregar : AgregarTrabajadoresPrestadores) : Observable<ApiResponse>{
        const newTrabajador = TrabajadoresPrestadoresMapper.toApiAgregar(agregar)
        return this.http.post<ApiResponse>(this.urlApi + this.urlAgregar, newTrabajador)
    }

    editar (editar : EditarTrabajadoresPrestadores) : Observable<ApiResponse>{
        const editTrabajador = TrabajadoresPrestadoresMapper.toApiEditar(editar)
        return this.http.put<ApiResponse>(this.urlApi + this.urlEditar, editTrabajador)
    }

    eliminar (eliminar : EliminarTrabajadoresPrestadores) : Observable<ApiResponse>{
        const newTrabajador = TrabajadoresPrestadoresMapper.toApiEliminar(eliminar)
        return this.http.delete<ApiResponse>(this.urlApi + this.urlEliminar,{body:newTrabajador})
    }
}