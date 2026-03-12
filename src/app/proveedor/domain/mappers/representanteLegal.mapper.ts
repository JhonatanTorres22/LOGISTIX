import { AgregarRepresentanteLegalDTO, DataRepresentanteLegalDTO, EditarRepresentanteLegalDTO, EliminarRepresentanteLegalDTO, ListarRepresentanteLegalDTO } from "@/proveedor/infraestructure/dto/representanteLegal.dto";
import { AgregarRepresentanteLegal, DataRepresentanteLegal, EditarRepresentanteLegal, EliminarRepresentanteLegal, ListarRepresentanteLegal } from "../models/representanteLegal.model";

export class RepresentanteLegalMappper {
    static toDomainData (param : DataRepresentanteLegalDTO) : DataRepresentanteLegal{
        return {
            data : param.data.map(this.toDomain),
            isSuccess : param.isSuccess,
            message : param.message,
            errors : param.errors
        }
    }
    static toDomain (param : ListarRepresentanteLegalDTO) : ListarRepresentanteLegal {
        return {
            idSunat : param.codigoSunat,
            idRepresentanteLegal : param.codigoRepresentanteLegal,
            nDocumento : param.numeroDocumento,
            tipoDocumento : param.documento,
            nombreRL: param.nombre,
            cargoRL : param.cargo,
            fechaDesde : param.fechaDesde
        }
    }

    static toApiAgregar (param : AgregarRepresentanteLegal) : AgregarRepresentanteLegalDTO {
        return {
            codigoSunat : param.idSunat,
            documento : param.tipoDocumento,
            numeroDocumento : param.nDocumento,
            nombre : param.nombreRL,
            cargo : param.cargoRL,
            fechaDesde : param.fechaDesde,
        }
    }

    static toApiEditar (param : EditarRepresentanteLegal) : EditarRepresentanteLegalDTO {
        return {
            codigoSunat : param.idSunat,
            cargo : param.cargoRL,
            codigoRepresentanteLegal : param.idRepresentanteLegal,
            documento : param.tipoDocumento,
            numeroDocumento : param.nDocumento,
            fechaDesde : param.fechaDesde,
            nombre : param.nombreRL
        }
    }

    static toApiEliminar (param : EliminarRepresentanteLegal) : EliminarRepresentanteLegalDTO {
        return {
            codigoRepresentanteLegal : param.idRepresentanteLegal
        }
    }
}