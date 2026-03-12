import { AgregarTrabajadoresPrestadoresDTO, DataTrabajadoresPrestadoresDTO, EditarTrabajadoresPrestadoresDTO, EliminarTrabajadoresPrestadoresDTO, TrabajadoresPrestadoresDTO } from "@/proveedor/infraestructure/dto/trabajadoresPrestadores.dto";
import { AgregarTrabajadoresPrestadores, DataTrabajadoresPrestadores, EditarTrabajadoresPrestadores, EliminarTrabajadoresPrestadores, TrabajadoresPrestadores } from "../models/trabajadoresPrestadores.model";

export class TrabajadoresPrestadoresMapper {
    static toDomainData(param: DataTrabajadoresPrestadoresDTO): DataTrabajadoresPrestadores {
        return {
            data: param.data.map(this.toDomain),
            isSuccess: param.isSuccess,
            message: param.message,
            errors: param.errors
        }
    }
    static toDomain(param: TrabajadoresPrestadoresDTO): TrabajadoresPrestadores {
        return {
            idTrabajadores: param.codigoTrabajadoresPrestadoresDeServicio,
            nPensionistas: param.numeroPensionistas,
            nPrestadoresDeServicios: param.numeroPrestadoresDeServicios,
            nTrabajadores: param.numeroTrabajadores,
            periodo: param.periodo,
        }
    }

    static toApiAgregar(param: AgregarTrabajadoresPrestadores): AgregarTrabajadoresPrestadoresDTO {
        return {
            numeroPensionistas: param.nPensionistas,
            codigoSunat : param.idSunat,
            numeroPrestadoresDeServicios: param.nPrestadoresDeServicios,
            numeroTrabajadores: param.nTrabajadores,
            periodo: param.periodo,
        }
    }

    static toApiEditar(param: EditarTrabajadoresPrestadores): EditarTrabajadoresPrestadoresDTO {
        return {
            codigoTrabajadoresPrestadoresDeServicio: param.idTrabajadores,
            codigoSunat : param.idSunat,
            numeroPensionistas: param.nPensionistas,
            numeroPrestadoresDeServicios: param.nPrestadoresDeServicios,
            numeroTrabajadores: param.nTrabajadores,
            periodo: param.periodo,
        }
    }

    static toApiEliminar(param: EliminarTrabajadoresPrestadores): EliminarTrabajadoresPrestadoresDTO {
        return {
            codigoTrabajadoresPrestadoresDeServicio: param.idTrabajadores
        }
    }
}