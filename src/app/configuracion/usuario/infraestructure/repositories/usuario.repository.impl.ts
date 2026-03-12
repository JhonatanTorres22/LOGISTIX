
import { inject } from "@angular/core";
import { UsuarioService } from "../services/usuario.service";
import { UsuarioRepository } from "../../domain/repositories/usuario.repository";
import { Observable } from "rxjs";
import { CrearUsuario, DataUsuario, EditarUsuario, EliminarUsuario, ResponseUsuario } from "../../domain/models/usuario.model";

export class UsuarioRpositoryImpl implements UsuarioRepository {
    private service = inject(UsuarioService)

    obtener = (): Observable<DataUsuario> => {
        return this.service.obtener()
    }
    crear = (crear: CrearUsuario): Observable<ResponseUsuario> => {
        return this.service.crear(crear)
    }
    editar = (editar: EditarUsuario): Observable<ResponseUsuario> => {
        return this.service.editar(editar)
    }
    eliminar(eliminar: EliminarUsuario): Observable<ResponseUsuario> {
        return this.service.eliminar(eliminar)
    }

}