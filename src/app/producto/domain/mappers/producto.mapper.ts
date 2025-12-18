import { CrearProductoDTO, EditarProductoDTO, EliminarProductoDTO, ProductoDTO } from "../../infraestructure/dto/producto.dto";
import { CrearProducto, EditarProducto, EliminarProducto, Producto } from "../models/producto.model";

export class ProductoMapper {
    static toDomain (param : ProductoDTO) : Producto {
        return {
            id : param.codigo,
            descripcionProducto : param.descripcion,
            modeloProducto : param.modelo,
            nombreProducto : param.nombre,
            precioReferencial : param.precioReferencial,
            unidad : param.unidadDeMedida
        }
    }

    static toApiCrear (param : CrearProducto) : CrearProductoDTO {
        return {
            descripcion : param.descripcionProducto,
            modelo : param.modeloProducto,
            nombre : param.nombreProducto,
            precioReferencial : param.precioReferencial,
            unidadDeMedida : param.unidad
        }
    }

    static toApiEditar (param : EditarProducto) : EditarProductoDTO {
        return {
            codigo : param.id,
            descripcion : param.descripcionProducto,
            modelo : param.modeloProducto,
            nombre : param.nombreProducto,
            precioReferencial : param.precioReferencial,
            unidadDeMedida : param.unidad
        }
    }

    static toApiEliminar (param : EliminarProducto) : EliminarProductoDTO {
        return {
            codigo : param.id
        }
    }
}