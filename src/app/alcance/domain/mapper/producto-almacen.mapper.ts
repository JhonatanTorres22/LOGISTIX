import { AgregarProductoAlmacenDTO, DataProductoPorAlmacenDTO, ListarProductoPorAlmacenDTO } from "@/alcance/infraestructure/dto/producto-almacen.dto";
import { AgregarProductoAlmacen, DataProductoPorAlmacen, ListarProductoPorAlmacen } from "../models/producto-almacen.model";

export class ProductoAlmacenMapper {

    static toApiAgregarProductosAlmacen(param: AgregarProductoAlmacen): AgregarProductoAlmacenDTO {
        return {
            codigoProductoServicio: param.idProducto,
            codigoAlmacen: param.idAlmacen,
            cantidad: param.cantidad
        }
    }

    static toDomainDataProductoAlmacen (param : DataProductoPorAlmacenDTO) : DataProductoPorAlmacen {
        return{
            data : param.data.map(this.toDomainProductoAlmacen),
            errors : param.errors,
            isSuccess : param.isSuccess,
            message : param.message,
            numeroPagina : param.numeroDePagina,
            paginaPrevia : param.paginaPrevia,
            paginaSiguiente : param.paginaSiguiente,
            totalPaginas : param.totalDePaginas,
            totalRegistros : param.totalDeRegistros
        }
    }

    static toDomainProductoAlmacen (param : ListarProductoPorAlmacenDTO) : ListarProductoPorAlmacen {
        return {
            idProductoPorAlmacen : param.codigoProductoPorAlmacen,
            idProductoServicio : param.codigoProductoServicio,
            pedido : param.pedido,
            stock : param.enStock,
            cantidad : param.cantidad,
            comprometido : param.comprometido,
        }
    }
}