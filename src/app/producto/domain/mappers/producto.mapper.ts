import { ListarMarca } from "@/marca/domain/models/marca.model";
import { CrearProductoDTO, DataProductoDTO, EditarProductoDTO, EliminarProductoDTO, ProductoCategoriaDTO, ProductoDTO } from "../../infraestructure/dto/producto.dto";
import { CrearProducto, DataProducto, EditarProducto, EliminarProducto, Producto, ProductoCategoria } from "../models/producto.model";

export class ProductoMapper {
static toDomain = (param: ProductoCategoriaDTO): ProductoCategoria => {
    return {
        idCategoria: param.codigoCategoria,
        nombre: param.nombre,
        descripcion : param.descripcion,
        productos: param.productosServicios.map(e =>
            new Producto(
                e.codigoProducto,
                e.nombre,
                e.modelo,
                e.descripcion,
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


    static toDomainData = (param : DataProductoDTO) : DataProducto => {
        return {
            data : param.data.map(this.toDomain),
            errors : param.errors,
            isSuccess : param.isSuccess,
            message : param.message
        }
    }

    static toApiCrear = (param : CrearProducto) : CrearProductoDTO => {
        return {
            codigoCategoria : param.idCategoria,
            descripcion : param.descripcionProducto,
            modelo : param.modeloProducto,
            nombre : param.nombreProducto,
            unidadDeMedida : param.unidad,
            url : param.urlImagen,
            codigoMarca : param.idMarca
        }
    }

    static toApiCrearMasivo = (param : CrearProducto[]) : CrearProductoDTO[] => {
        return param.map(producto => this.toApiCrear(producto))
    }

    static toApiEditar = (param : EditarProducto) : EditarProductoDTO => {
        return {
            descripcion : param.descripcionProducto,
            modelo : param.modeloProducto,
            nombre : param.nombreProducto,
            unidadDeMedida : param.unidad,
            url : param.urlImagen,
            codigoCategoria : param.idCategoria,
            codigoMarca : param.idMarca,
            codigoProducto : param.id
        }
    }

    static toApiEliminar = (param : EliminarProducto) : EliminarProductoDTO => {
        return {
            codigo : param.id
        }
    }
}