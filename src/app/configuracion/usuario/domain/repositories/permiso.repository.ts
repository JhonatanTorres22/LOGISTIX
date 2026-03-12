import { Observable } from "rxjs";
import { AsignarPermisos, DataModuloPermiso, EliminarPermisos, ResponsePermisos } from "../models/permisos.model";

export abstract class PermisoRepository {
    abstract obtener() : Observable<DataModuloPermiso>
    abstract asignar(asignar : AsignarPermisos[]) : Observable<ResponsePermisos>
    abstract permisoxUsuario(id:number) : Observable<DataModuloPermiso>
    abstract eliminarPermisos(eliminar : EliminarPermisos[]) : Observable<ResponsePermisos>
}