import { AgregarUnidadMedidaDTO, DataUnidadMedidaDTO, EliminarUnidadMedidaDTO, ListarUnidadMedidaDTO } from "@/unidad-medida/infraestructure/dto/unidad-medida.dto";
import { AgregarUnidadMedida, DataUnidadMedida, EliminarUnidadMedida, ListarUnidadMedida } from "../models/unidad-medida.model";

export abstract class UnidadMedidaMapper {
    static toDomainUnidadMedida(param: ListarUnidadMedidaDTO): ListarUnidadMedida {
        return {
            idUnidadMedida: param.codigoUnidadMedida,
            nombre: param.nombre,
            descripcion: param.descripcion
        }
    }

    static toDomainDataUnidadMedida(param: DataUnidadMedidaDTO): DataUnidadMedida {
        return {
            data: param.data.map(this.toDomainUnidadMedida),
            message: param.message,
            isSuccess: param.isSuccess,
            errors: param.errors
        }
    }

    static toApiAgregarUnidadMedida(param: AgregarUnidadMedida): AgregarUnidadMedidaDTO {
        return {
            nombre: param.nombre,
            descripcion: param.descripcion
        }
    }

    static toApiEditarUnidadMedida(param: ListarUnidadMedida): ListarUnidadMedidaDTO {
        return {
            codigoUnidadMedida: param.idUnidadMedida,
            nombre: param.nombre,
            descripcion: param.descripcion
        }
    }

    static toApiEliminarUnidadMedida(param: EliminarUnidadMedida): EliminarUnidadMedidaDTO {
        return {
            codigoUnidadMedida: param.idUnidadMedida
        }
    }

}