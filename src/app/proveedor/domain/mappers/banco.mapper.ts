import { AgregarBancoDTO, DataBancoDTO, EditarBancoDTO, EliminarBancoDTO, ListarBancoDTO } from "@/proveedor/infraestructure/dto/banco.dto";
import { AgregarBanco, DataBanco, EditarBanco, EliminarBanco, ListarBanco } from "../models/banco.model";

export class BancoMapper {
    static toDomainDataBanco (param: DataBancoDTO) : DataBanco {
        return {
            data : param.data.map(this.toDomainBanco),
            errors : param.errors,
            isSuccess : param.isSuccess,
            message : param.message
        }
    }
    static toDomainBanco (param : ListarBancoDTO) : ListarBanco {
        return {
            cci : param.cci,
            cuentaDetraccion : param.ctaDetraccion,
            idBanco : param.codigoBanco,
            idProveedor : param.codigoProveedor,
            nombreBanco : param.nombre,
            numeroCuenta : param.nCuenta
        }
    }

    static toApiAgregar (param : AgregarBanco) : AgregarBancoDTO {
        return {
            cci : param.cci,
            codigoProveedor : param.idProveedor,
            ctaDetraccion : param.cuentaDetraccion,
            nCuenta : param.numeroCuenta,
            nombre : param.nombreBanco
        }
    }

    static toApiEditar (param : EditarBanco) : EditarBancoDTO {
        return {
            cci : param.cci,
            codigoBanco : param.idBanco,
            codigoProveedor : param.idProveedor,
            ctaDetraccion : param.cuentaDetraccion,
            nCuenta : param.numeroCuenta,
            nombre : param.nombreBanco
        }
    }

    static toApiEliminar (param : EliminarBanco): EliminarBancoDTO{
        return {
            codigoBanco : param.idBanco
        }
    }
}