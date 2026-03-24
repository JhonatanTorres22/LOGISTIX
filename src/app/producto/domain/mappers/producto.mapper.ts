import { ListarMarca } from "@/marca/domain/models/marca.model";
import { CrearProductoDTO, DataProductoDTO, DataProductosNoValidos, EditarProductoDTO, EliminarProductoDTO, ListarProductosNoValidos, ListarProveedoresProductosNoValidos, ProductoCategoriaDTO, ProductoDTO } from "../../infraestructure/dto/producto.dto";
import { CrearProducto, DataProducto, DataProductosNoValidosDTO, EditarProducto, EliminarProducto, ListarProductosNoValidosDTO, ListarProveedoresProductosNoValidosDTO, Producto, ProductoCategoria } from "../models/producto.model";

export class ProductoMapper {
    static toDomain = (param: ProductoCategoriaDTO): ProductoCategoria => {
        return {
            idCategoria: param.codigoCategoria,
            nombre: param.nombre,
            descripcion: param.descripcion,
            productos: param.productosServicios.map(e =>
                new Producto(
                    e.codigoProducto,
                    e.nombre,
                    e.modelo,
                    e.descripcion,
                    e.tipo,
                    e.unidadDeMedida,
                    e.precioReferencial,
                    e.url,
                    e.marca === null
                        ? null
                        : new ListarMarca(
                            e.marca.codigoMarca,
                            e.marca.nombre,
                            e.marca.descripcion
                        )
                )
            )
        };
    };


    static toDomainData = (param: DataProductoDTO): DataProducto => {
        return {
            data: param.data.map(this.toDomain),
            errors: param.errors,
            isSuccess: param.isSuccess,
            message: param.message
        }
    }

    static toApiCrear = (param: CrearProducto): CrearProductoDTO => {
        return {
            codigoCategoria: param.idCategoria,
            descripcion: param.descripcionProducto,
            modelo: param.modeloProducto,
            nombre: param.nombreProducto,
            unidadDeMedida: param.unidad,
            url: param.urlImagen,
            codigoMarca: param.idMarca,
            tipo: param.tipo
        }
    }

    static toApiCrearMasivo = (param: CrearProducto[]): CrearProductoDTO[] => {
        return param.map(producto => this.toApiCrear(producto))
    }

    static toApiEditar = (param: EditarProducto): EditarProductoDTO => {
        return {
            descripcion: param.descripcionProducto,
            modelo: param.modeloProducto,
            nombre: param.nombreProducto,
            unidadDeMedida: param.unidad,
            url: param.urlImagen,
            codigoCategoria: param.idCategoria,
            codigoMarca: param.idMarca,
            codigoProducto: param.id,
            tipo: param.tipo
        }
    }

    static toApiEliminar = (param: EliminarProducto): EliminarProductoDTO => {
        return {
            codigo: param.id
        }
    }

    /* PRODUCTOS NO VÁLIDOS */

    static toDomainDataNoValidos = (param : DataProductosNoValidosDTO): DataProductosNoValidos => {
        return{
            data : param.data.map(this.toDomainNoValidos),
            errors : param.errors,
            isSuccess : param.isSuccess,
            message : param.message
        }
    }

    static toDomainNoValidos = (param: ListarProductosNoValidosDTO): ListarProductosNoValidos => {
        return {
            idProductoServicio: param.codigoProductoServicio,
            nombreProductoServicio: param.nombre,
            url: param.url,
            proveedores: param.proveedores.map(this.toDomainProveedorNoValido)

        }
    }
    static toDomainProveedorNoValido = (param: ListarProveedoresProductosNoValidosDTO ): ListarProveedoresProductosNoValidos => {
        return {
            idProveedor: param.codigoProveedor,
            nombreProveedor: param.nombreLegal,
            precioReferencial: param.precioReferencial,
            estadoEvaluacion: param.estadoEvaluacion
        };
    };
}