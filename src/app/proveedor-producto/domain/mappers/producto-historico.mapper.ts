import { BuscarProductoHistoricoDTO,  DataBuscarProductoHistoricoDTO,  GuardarHistoricoDTO,  LimpiarPreciosProductoDTO,  PrecioHistoricoDTO, ProveedorHistoricoDTO } from "@/proveedor-producto/infraestructure/dto/producto-historico.dto";
import {  BuscarProductoHistorico, DataBuscarProductoHistorico, GuardarHistorico, LimpiarPreciosProducto, PrecioHistorico, ProveedorHistorico } from "../models/producto-historico.model";

export class ProductoHistoricoMapper {

    static toDomainData(param: DataBuscarProductoHistoricoDTO): DataBuscarProductoHistorico {
        return {
            data: param.data.map(p => this.toDomain(p)),
            errors: param.errors,
            isSuccess: param.isSuccess,
            message: param.message
        };
    }

    static toDomain(param: BuscarProductoHistoricoDTO): BuscarProductoHistorico {
        return {
            idProveedorProducto: param.codigoProveedorProducto,
            precio: param.precioReferencial,
            vigencia: param.vigencia,
            historico: param.historico.map(h => this.toDomainHistorico(h)),
            proveedor: this.toDomianProveedorHistorico(param.proveedor)
        };
    }

    static toDomainHistorico(param: PrecioHistoricoDTO): PrecioHistorico {
        return {
            precio: param.precio,
            vigencia: param.vigencia
        };
    }

    static toDomianProveedorHistorico(param: ProveedorHistoricoDTO): ProveedorHistorico {
        return {
            idProveedor: param.codigoProveedor,
            nombreProveedor: param.nombreRs
        };
    }

    static toApiGuardarHistorico (param : GuardarHistorico[]) : GuardarHistoricoDTO[] {
        return param.map(item => ({
            codigoProveedorProducto : item.idProveedorProducto,
            precio : item.precio,
            vigencia : item.vigencia
        }))
    }

    static toApiLimpiarPrecios (param : LimpiarPreciosProducto) : LimpiarPreciosProductoDTO {
        return {
            codigoProveedor : param.idProveedor
        }
    }
}
