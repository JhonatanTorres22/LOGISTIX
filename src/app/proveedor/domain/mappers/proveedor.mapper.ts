import { ActualizarEvaluacionDTO, CrearProveedorDTO, DataProveedorDTO, EditarProveedorDTO, EliminarProveedorDTO, ProveedorDTO } from "../../infraestructure/dto/proveedor.dto";
import { ActualizarEvaluacion, CrearProveedor, DataProveedor, EditarProveedor, EliminarProveedor, Proveedor } from "../models/proveedor.model";

export class ProveedorMapper  {
    static toDomain = (param : ProveedorDTO) : Proveedor => {
        return {
            id : param.codigoProveedor,
            direccion : param.direccionFiscal,
            evaluacion : param.evaluacion,
            nombre : param.nombreRs,
            ruc : param.ruc,
            tipo : param.tipoProveedor

        }
    }
    static toDomainData = (param : DataProveedorDTO): DataProveedor => {
        return {
            data: param.data.map(this.toDomain),
            message : param.message,
            isSuccess: param.isSuccess,
            errors: param.errors
        }
    }
    static toApiCrear = (param : CrearProveedor) : CrearProveedorDTO => {
        return {
            direccionFiscal : param.direccion,
            nombreRs : param.nombre,
            ruc : param.ruc,
            tipoProveedor : param.tipo
        }
    }
    static toApiEditar = (param : EditarProveedor) : EditarProveedorDTO => {
        return {
            codigoProveedor : param.id,
            direccionFiscal : param.direccion,
            nombreRs : param.nombre,
            ruc : param.ruc,
            tipoProveedor : param.tipo
        }
    }
    static toApiEliminar = (param : EliminarProveedor) : EliminarProveedorDTO => {
        return {
            codigoProveedor : param.id
        }
    }

    static toApiCrearMasivo = (param : CrearProveedor[]) : CrearProveedorDTO[] => {
        return param.map(proveedor => this.toApiCrear(proveedor));
    }

    static toApiActualizarEvaluacion (param : ActualizarEvaluacion) : ActualizarEvaluacionDTO {
        return {
            codigoProveedor : param.id,
            evaluacion : param.evaluacion
        }
    }
}