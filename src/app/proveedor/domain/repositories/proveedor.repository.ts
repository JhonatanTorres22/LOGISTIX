import { Observable } from "rxjs";
import { CrearProveedor, EditarProveedor, EliminarProveedor, Proveedor, ResponseProveedor } from "../models/proveedor.model";

export abstract class ProveedorRepository {
    abstract obtener() : Observable<Proveedor[]>
    abstract crear(proveedor : CrearProveedor): Observable<ResponseProveedor>
    abstract editar(proveedor : EditarProveedor) : Observable<ResponseProveedor>
    abstract eliminar (proveedor : EliminarProveedor) : Observable<ResponseProveedor>
    abstract crearMasivo(proveedores : CrearProveedor[]) : Observable<ResponseProveedor>
}