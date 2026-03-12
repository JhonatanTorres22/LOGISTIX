import { CrearUsuarioDTO, DataUsuarioDTO, EditarUsuarioDTO, EliminarUsuarioDTO, UsuarioDTO } from "../../infraestructure/dto/usuario.dto";
import { CrearUsuario, DataUsuario, EditarUsuario, EliminarUsuario, Usuario } from "../models/usuario.model";

export class UsuarioMapper {
    static toDomain = (param : UsuarioDTO) : Usuario => {
        return {
            id : param.codigo,
            nombres : param.nombres,
            apePaterno: param.apellidoPaterno,
            apMaterno : param.apellidoMaterno,
            correo : param.correo,
            nDocumento : param.numeroDocumento,
        }
    }

    static toDomainData = (param : DataUsuarioDTO) : DataUsuario => {
        return {
            data : param.data.map(this.toDomain),
            errors : param.errors,
            isSuccess : param.isSuccess,
            message : param.message
        }
    }

    static toApiCrear = (param : CrearUsuario) : CrearUsuarioDTO => {
        return {
            apellidoPaterno : param.apePaterno,
            apellidoMaterno : param.apMaterno,
            correo : param.correo,
            nombres : param.nombres,
            numeroDocumento : param.nDocumento
        }
    }
    static toApiEditar = (param : EditarUsuario) : EditarUsuarioDTO => {
        return {
            codigo : param.id,
            apellidoPaterno : param.apePaterno,
            apellidoMaterno : param.apMaterno,
            correo : param.correo,
            nombres : param.nombres,
            numeroDocumento : param.nDocumento
        }
    }

    static toApiEliminar = (param : EliminarUsuario) : EliminarUsuarioDTO => {
        return {
            codigo : param.id
        }
    }
}