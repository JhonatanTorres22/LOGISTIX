import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CrearProveedor, EditarProveedor, EliminarProveedor, Proveedor, ResponseProveedor } from "../../domain/models/proveedor.model";
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
    private urlAgregarMasivo : string

    constructor(
        private http : HttpClient
    ){
        this.urlApi = environment.EndPoint,
        this.urlListar = '/api/proveedor/Listar'
        this.urlAgregar = '/api/proveedor/Insertar'
        this.urlEditar = '/api/proveedor/Actualizar'
        this.urlEliminar = '/api/proveedor/Eliminar'
        this.urlAgregarMasivo = '/api/proveedor/InsertarMasivo'
    }

    obtener = ( ) : Observable<Proveedor[]> => {
        return this.http.get<DataProveedorDTO>(this.urlApi + this.urlListar )
        .pipe(map (api => api.data.map(ProveedorMapper.toDomain)))
    }

    crear = (crear : CrearProveedor) :Observable<ResponseProveedor> => {
        const newProveedor = ProveedorMapper.toApiCrear(crear)
        return this.http.post<ResponseProveedor>(this.urlApi + this.urlAgregar, newProveedor)
    }

    editar = (editar : EditarProveedor) : Observable<ResponseProveedor> => {
        const editProveedor = ProveedorMapper.toApiEditar(editar)
        return this.http.put<ResponseProveedor>(this.urlApi + this.urlEditar, editProveedor)
    }

    eliminar = (eliminar : EliminarProveedor) : Observable<ResponseProveedor> => {
        const eliminarProveedor = ProveedorMapper.toApiEliminar(eliminar)
        return this.http.delete<ResponseProveedor>(this.urlApi + this.urlEliminar, { body : eliminarProveedor})
    }

    crearMasivo = (crearProveedores : CrearProveedor[]) : Observable<ResponseProveedor> => {
        const newProveedores = ProveedorMapper.toApiCrearMasivo(crearProveedores)
        return this.http.post<ResponseProveedor>(this.urlApi + this.urlAgregarMasivo, newProveedores)
    }
}