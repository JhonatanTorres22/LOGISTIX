import { AsignarPermisosDTO, DataModuloPermisoDTO, EliminarPermisosDTO, ModuloPermisoDTO } from "../../infraestructure/dto/permisos.dto";
import { AsignarPermisos, EliminarPermisos, ModuloPermiso } from "../models/permisos.model";

export class PermisoMapper {
    static toDomain = (param : ModuloPermisoDTO) : ModuloPermiso => {
        return {
            nombreModulo : param.nombreModulo,
            roles : param.roles.map(rol => ({
               descripcionRol : rol.descripcionRol,
               nombreRol : rol.nombreRol,
               permisos : rol.permisos.map(permiso => ({
                codigoPermiso : permiso.codigoPermiso,
                descripcionPermiso : permiso.descripcionPermiso
               }))
            }))
        }
    }

    static toDomainData = (param : DataModuloPermisoDTO) : DataModuloPermisoDTO => {
        return {
            data : param.data.map(this.toDomain),
            errors : param.errors,
            isSuccess : param.isSuccess,
            message : param.message
        }
    }

    static toApiAsignar = (param : AsignarPermisos[]) : AsignarPermisosDTO[] => {
        return param.map(asignar =>({
            codigoPermiso : asignar.idPermiso,
            codigoUsuario : asignar.idUsuario
        }))
    }
    static toApiEliminar = (param : EliminarPermisos[]) : EliminarPermisosDTO[] => {
        return param.map(eliminar =>({
            codigoPermiso : eliminar.idPermiso,
            codigoUsuario : eliminar.idUsuario
        }))
    }
}