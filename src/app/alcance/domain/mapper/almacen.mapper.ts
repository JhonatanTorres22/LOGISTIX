import {  DataAlmacenDTO, ListarAlmacenDTO } from "@/alcance/infraestructure/dto/almacen.dto";
import { Data } from "@angular/router";
import { DataAlcance } from "../models/alcance.model";
import {  DataAlmacen, ListarAlmacen } from "../models/almacen.model";

export class AlmacenMapper {

    static toDomainDta (param : DataAlmacenDTO) : DataAlmacen {
        return {
            data : param.data.map(this.toDomain),
            errors : param.errors,
            isSuccess : param.isSuccess,
            message : param.message
        }
    }

    static toDomain(param : ListarAlmacenDTO) : ListarAlmacen {
        return {
            id : param.codigo,
            nombre : param.nombre,
            descripcion : param.descripcion
        }
    }
}