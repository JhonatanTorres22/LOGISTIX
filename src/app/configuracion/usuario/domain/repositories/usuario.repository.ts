import { Observable } from "rxjs";
import { CrearUsuario, DataUsuario, EditarUsuario, EliminarUsuario, ResponseUsuario } from "../models/usuario.model";

export abstract class UsuarioRepository {
    abstract obtener() : Observable<DataUsuario>
    abstract crear(crear : CrearUsuario) : Observable<ResponseUsuario>
    abstract editar(editar : EditarUsuario) : Observable<ResponseUsuario>
    abstract eliminar(eliminar : EliminarUsuario) : Observable<ResponseUsuario>
}