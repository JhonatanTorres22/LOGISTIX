import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CrearProveedor, EditarProveedor, EliminarProveedor, Proveedor } from "../../domain/models/proveedor.model";
import { DataProveedorDTO } from "../dto/proveedor.dto";
import { ProveedorMapper } from "../../domain/mappers/proveedor.mapper";

@Injectable({
    providedIn: 'root'
})

export class ProveedorService {
    private urlApi : string
    private urlListar : string
    private urlAgregar : string
    private urlEditar : string
    private urlEliminar : string

    constructor(
        private http : HttpClient
    ){
        this.urlApi = environment.EndPoint,
        this.urlListar = '/api/proveedor/Listar'
        this.urlAgregar = '/api/proveedor/Insertar'
        this.urlEditar = '/api/proveedor/Actualizar'
        this.urlEliminar = '/api/proveedor/Eliminar'
    }

    obtener = ( ) : Observable<Proveedor[]> => {
        return this.http.get<DataProveedorDTO>(this.urlApi + this.urlListar )
        .pipe(map (api => api.data.map(ProveedorMapper.toDomain)))
    }

    crear = (crear : CrearProveedor) :Observable<void> => {
        const newProveedor = ProveedorMapper.toApiCrear(crear)
        return this.http.post<void>(this.urlApi + this.urlAgregar, newProveedor)
    }

    editar = (editar : EditarProveedor) : Observable<void> => {
        const editProveedor = ProveedorMapper.toApiEditar(editar)
        return this.http.put<void>(this.urlApi + this.urlEditar, editProveedor)
    }

    eliminar = (eliminar : EliminarProveedor) : Observable<void> => {
        const eliminarProveedor = ProveedorMapper.toApiEliminar(eliminar)
        return this.http.delete<void>(this.urlApi + this.urlEliminar, { body : eliminarProveedor})
    }
}