import { ActualizarCategoriaDTO, CategoriaDTO, CrearCategoriaDTO, DataCategoriaDTO, EliminarCategoriaDTO } from "@/categoria/infraestructure/dto/categoria.model";
import { ActualizarCategoria, Categoria, CrearCategoria, DataCategoria, EliminarCategoria } from "../models/categoria.model";

export class CategoriaMapper {

    static toDomain(dto: CategoriaDTO): Categoria {
        return {
            idCategoria: dto.codigoCategoria,
            nombre: dto.nombre,
            descripcion: dto.descripcion
        }
    }

       static toDomainData(dto: DataCategoriaDTO): DataCategoria {
        return {
            data: dto.data.map(this.toDomain),
            message: dto.message,
            isSuccess: dto.isSuccess,
            errors: dto.errors
        };
    }


    static toApiCrear = (param : CrearCategoria) : CrearCategoriaDTO => {
        return {
            nombre : param.nombre,
            descripcion : param.descripcion
        }
    }

    static toApiEditar = (param : ActualizarCategoria): ActualizarCategoriaDTO => {
        return {
            codigoCategoria : param.idCategoria,
            nombre : param.nombre,
            descripcion : param.descripcion
        }
    }

    static toApiEliminar = (param : EliminarCategoria): EliminarCategoriaDTO => {
        return {
            codigoCategoria : param.idCategoria
        }
    }

}