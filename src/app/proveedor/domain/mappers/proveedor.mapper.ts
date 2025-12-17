import { CrearProveedorDTO, EditarProveedorDTO, EliminarProveedorDTO, ProveedorDTO } from "../../infraestructure/dto/proveedor.dto";
import { CrearProveedor, EditarProveedor, EliminarProveedor, Proveedor } from "../models/proveedor.model";

export class ProveedorMapper  {
    static toDomain (param : ProveedorDTO) : Proveedor {
        return {
            id : param.codigoProveedor,
            direccion : param.direccionFiscal,
            evaluacion : param.evaluacion,
            nombre : param.nombreRs,
            ruc : param.ruc,
            tipo : param.tipoProveedor

        }
    }
    static toApiCrear (param : CrearProveedor) : CrearProveedorDTO {
        return {
            direccionFiscal : param.direccion,
            nombreRs : param.nombre,
            ruc : param.ruc,
            tipoProveedor : param.tipo
        }
    }
    static toApiEditar (param : EditarProveedor) : EditarProveedorDTO {
        return {
            codigoProveedor : param.id,
            direccionFiscal : param.direccion,
            nombreRs : param.nombre,
            ruc : param.ruc,
            tipoProveedor : param.tipo
        }
    }
    static toApiEliminar (param : EliminarProveedor) : EliminarProveedorDTO {
        return {
            codigoProveedor : param.id
        }
    }
}