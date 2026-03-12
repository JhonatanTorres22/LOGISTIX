import { UiSelect } from "src/app/core/components/ui-select/ui-select.interface";

import { IniciaSesionGipeo } from "../models/gipeo.model";
import { IniciarSesionGipeoDTO, RolGipeoDTO } from "@/proceso-compras/infraestructure/dto/gipeo.dto";

export class GipeoMapper {
    static toDomain (param : RolGipeoDTO) : UiSelect {
        return {
            text : param.descripcion,
            value: param.idPerfil,
            disabled : false
        }
    }

    static toApiAuth(param : IniciaSesionGipeo) : IniciarSesionGipeoDTO {
        return {
            codigoIndicadorActividadDePoa : param.idIndicador,
            contrasenia : param.password,
            nombreDeUsuario : param.userName,
            rol :param.rol
        }
    }
}