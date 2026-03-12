import { inject, Injectable } from "@angular/core";
import { PermisoRepository } from "../../domain/repositories/permiso.repository";
import { PermisoService } from "../services/permiso.service";
import { Observable } from "rxjs";
import { AsignarPermisos, DataModuloPermiso, EliminarPermisos, ResponsePermisos } from "../../domain/models/permisos.model";

@Injectable({
    providedIn : "root"
})

export class PermisoRepositoryImpl implements PermisoRepository {
    private service = inject(PermisoService)

    obtener = () : Observable<DataModuloPermiso> => {
        return this.service.obtener()
    }
    asignar = (asignar: AsignarPermisos[]): Observable<ResponsePermisos> => {
        return this.service.asignar(asignar)
    }
    permisoxUsuario = (id: number): Observable<DataModuloPermiso> => {
        return this.service.obtenerPermisoxUsuario(id)
    }
    eliminarPermisos(eliminar: EliminarPermisos[]): Observable<ResponsePermisos> {
        return this.service.eliminarPermisos(eliminar)
    }
}