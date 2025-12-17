import { Observable } from "rxjs";
import { CrearProveedor, EditarProveedor, EliminarProveedor, Proveedor } from "../models/proveedor.model";

export abstract class ProveedorRepository {
    abstract obtener() : Observable<Proveedor[]>
    abstract crear(proveedor : CrearProveedor): Observable<void>
    abstract editar(proveedor : EditarProveedor) : Observable<void>
    abstract eliminar (proveedor : EliminarProveedor) : Observable<void>
}