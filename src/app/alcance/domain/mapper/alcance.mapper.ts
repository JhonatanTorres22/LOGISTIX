import { AgregarAlcanceDTO, DataAlcanceDTO, EditarAlcanceDTO, EliminarAlcanceDTO, ListarAlcanceDTO } from "@/alcance/infraestructure/dto/alcance.dto";
import { AgregarAlcance, DataAlcance, EditarAlcance, EliminarAlcance, ListarAlcance } from "../models/alcance.model";

export class AlcanceMapper {
    static toDomainData (param : DataAlcanceDTO) : DataAlcance {
        return {
            data : param.data.map(this.toDomain),
            errors : param.errors,
            isSuccess : param.isSuccess,
            message : param.message
        }
    }
    static toDomain (param : ListarAlcanceDTO) : ListarAlcance {
        return {
            id : param.codigo,
            descripcion : param.nombre,
            direccion : param.direccion,
            coordenada :param.coordenadas
        }
    }

    static toApiAgregar (param : AgregarAlcance) : AgregarAlcanceDTO {
        return {
            nombre : param.descripcion,
            direccion : param.direccion,
            coordenadas : param.coordenada
        }
    }

    static toApiEditar (param : ListarAlcance) : ListarAlcanceDTO {
        return {
            codigo : param.id,
            nombre : param.descripcion,
            direccion : param.direccion,
            coordenadas : param.coordenada
        }
    }   

    static toApiEliminar (param : EliminarAlcance) : EliminarAlcanceDTO {
        return{
            codigo : param.id
        }
    }
}