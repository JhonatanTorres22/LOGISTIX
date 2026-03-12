import { Observable } from "rxjs";
import { CrearContacto, DataContacto, EditarContacto, EliminarContacto, ResponseContacto } from "../models/contacto.model";

export abstract class ContactoRepository {
    abstract obtener(idProveedor: number) : Observable<DataContacto>
    abstract crear(crear: CrearContacto): Observable<ResponseContacto>
    abstract editar(editar : EditarContacto) : Observable<ResponseContacto>
    abstract eliminar (eliminar: EliminarContacto): Observable<ResponseContacto>
}