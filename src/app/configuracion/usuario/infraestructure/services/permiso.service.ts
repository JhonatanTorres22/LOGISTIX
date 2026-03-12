import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AsignarPermisos, DataModuloPermiso, ResponsePermisos } from "../../domain/models/permisos.model";
import { DataModuloPermisoDTO } from "../dto/permisos.dto";
import { PermisoMapper } from "../../domain/mappers/permiso.mapper";

@Injectable({
    providedIn: "root"
})

export class PermisoService {
    private http = inject(HttpClient)

    private api: string
    private urlListar: string
    private urlAsignar: string
    private urlListarPermisoxUsuario: string
    private urlEliminar: string = '/api/UsuarioPermiso/Eliminar'

    constructor() {
        this.api = environment.EndPoint
        this.urlListar = '/api/Permiso/Listar',
        this.urlAsignar = '/api/UsuarioPermiso/Insertar'
        this.urlListarPermisoxUsuario = '/api/Permiso/ListarPorUsuario/'
        this.urlEliminar = '/api/UsuarioPermiso/Eliminar'


    }

    obtener = (): Observable<DataModuloPermiso> => {
        return this.http.get<DataModuloPermisoDTO>(this.api + this.urlListar)
            .pipe(map(apiResponse => PermisoMapper.toDomainData(apiResponse)))
    }

    asignar = (asignar: AsignarPermisos[]): Observable<ResponsePermisos> => {
        const asignarPermiso = PermisoMapper.toApiAsignar(asignar)
        return this.http.post<ResponsePermisos>(this.api + this.urlAsignar, asignarPermiso)
    }

    obtenerPermisoxUsuario = (id: number): Observable<DataModuloPermiso> => {
        return this.http.get<DataModuloPermisoDTO>(this.api + this.urlListarPermisoxUsuario + id)
            .pipe(map(apiResponse => PermisoMapper.toDomainData(apiResponse)))
    }

    eliminarPermisos = (eliminar: AsignarPermisos[]): Observable<ResponsePermisos> => {
        const eliminarPermiso = PermisoMapper.toApiEliminar(eliminar)
        return this.http.request<ResponsePermisos>('delete', this.api + this.urlEliminar, { body: eliminarPermiso })
    }
}