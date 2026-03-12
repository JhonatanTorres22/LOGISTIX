import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CrearUsuario, DataUsuario, EditarUsuario, EliminarUsuario, ResponseUsuario } from "../../domain/models/usuario.model";
import { DataUsuarioDTO } from "../dto/usuario.dto";
import { UsuarioMapper } from "../../domain/mappers/usuario.mapper";

@Injectable({
    providedIn : 'root'
})

export class UsuarioService {
    private http = inject(HttpClient)
    private urlApi : string = environment.EndPoint
    private urlListar: string = '/api/usuario/Listar'
    private urlCrear : string = '/api/Usuario/Insertar'
    private urlEditar : string = ''
    private urlEliminar : string = '/api/Usuario/Eliminar'

    obtener = () : Observable<DataUsuario> => {
        return this.http.get<DataUsuarioDTO>(this.urlApi + this.urlListar)
        .pipe(map(apiResponse => UsuarioMapper.toDomainData(apiResponse)))
    }

    crear = (crear : CrearUsuario) : Observable<ResponseUsuario> => {
        const newUsuario = UsuarioMapper.toApiCrear(crear)
        return this.http.post<ResponseUsuario>(this.urlApi + this.urlCrear, newUsuario)
    }
    
    editar = (editar : EditarUsuario) : Observable<ResponseUsuario> => {
        const editUsuario = UsuarioMapper.toApiEditar(editar)
        return this.http.put<ResponseUsuario>(this.urlApi + this.urlEditar, editUsuario)
    }

    eliminar = (eliminar : EliminarUsuario) : Observable<ResponseUsuario> => {
        const delUsuario = UsuarioMapper.toApiEliminar(eliminar)
        return this.http.request<ResponseUsuario>('delete', this.urlApi + this.urlEliminar, { body : delUsuario })
    }
}