import { AgregarProveedorProductoDTO, DataProveedorProductoDTO, EditarProveedorProductoDTO, EliminarProveedorProductoDTO, ProveedorProductoDTO } from "../../infraestructure/dto/proveedor-producto.dto";
import { ProveedorProducto, DataProveedorProducto, AgregarProveedorProducto, EditarProveedorProducto, EliminarProveedorProducto } from "../models/proveedor-producto.model";



export class ProveedorProductoMapper {
    static toDomain(param: ProveedorProductoDTO): ProveedorProducto {
        return {
            idProveedorProducto: param.codigoProveedorProducto,
            precio: param.precioReferencial,
            vigencia : param.vigencia,
            producto : param.productoServicio,
            proveedor: param.proveedor
        }
    }

    static toApiDomain = (param: DataProveedorProductoDTO): DataProveedorProducto => {
        return {
            data: param.data.map(this.toDomain),
            message: param.message,
            isSuccess: param.isSuccess,
            errors: param.errors
        }
    }

    static toApiAgregar = (param: AgregarProveedorProducto[]): AgregarProveedorProductoDTO[] => {
        return param.map(item => ({
            codigoProducto: item.idProducto,
            codigoProveedor: item.idProveedor,
            precioReferencial: item.precio,
            vigencia : item.vigencia
        }))
    }

    static toApiEditar = (param: EditarProveedorProducto[]): EditarProveedorProductoDTO[] => {
        return param.map(item => ({
            codigoProveedorProducto: item.idProveedorProducto,
            precioReferencial: item.precio,
            vigencia : item.vigencia
        }))
    }

    static toApiEliminar = (param: EliminarProveedorProducto[]): EliminarProveedorProductoDTO[] => {
        return param.map(item => ({
            codigoProveedorProducto: item.idProveedorProducto
        }))
    }
}