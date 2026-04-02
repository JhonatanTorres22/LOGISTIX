import { ActualizarStockMinimoProductoAlmacenDTO, AgregarProductoAlmacenDTO, AumentarCantidadProductoAlmacenDTO, DataListarProductosConFechaVencimientoDTO, DataProductoPorAlmacenDTO, DisminuirCantidadProductoAlmacenDTO, InsertarFechaVencimientoProductoAlmacenDTO, ListarProductoPorAlmacenDTO, ListarProductosConFechaVencimientoDTO } from "@/alcance/infraestructure/dto/producto-almacen.dto";
import { ActualizarStockMinimoProductoAlmacen, AgregarProductoAlmacen, AumentarCantidadProductoAlmacen, DataListarProductosConFechaVencimiento, DataProductoPorAlmacen, DisminuirCantidadProductoAlmacen, InsertarFechaVencimientoProductoAlmacen, ListarProductoPorAlmacen, ListarProductosConFechaVencimiento } from "../models/producto-almacen.model";

export class ProductoAlmacenMapper {

    static toApiAgregarProductosAlmacen(param: AgregarProductoAlmacen): AgregarProductoAlmacenDTO {
        return {
            codigoProductoServicio: param.idProducto,
            codigoAlmacen: param.idAlmacen,
            cantidad: param.cantidad
        }
    }

    static toDomainDataProductoAlmacen(param: DataProductoPorAlmacenDTO): DataProductoPorAlmacen {
        return {
            data: param.data.map(this.toDomainProductoAlmacen),
            errors: param.errors,
            isSuccess: param.isSuccess,
            message: param.message,
            numeroPagina: param.numeroDePagina,
            paginaPrevia: param.paginaPrevia,
            paginaSiguiente: param.paginaSiguiente,
            totalPaginas: param.totalDePaginas,
            totalRegistros: param.totalDeRegistros
        }
    }

    static toDomainProductoAlmacen(param: ListarProductoPorAlmacenDTO): ListarProductoPorAlmacen {
        return {
            idProductoPorAlmacen: param.codigoProductoPorAlmacen,
            idProductoServicio: param.codigoProductoServicio,
            pedido: param.pedido,
            stock: param.enStock,
            cantidad: param.cantidad,
            comprometido: param.comprometido,
            marca: param.marca,
            modelo: param.modelo,
            nombreProducto: param.nombre,
            urlImagen: param.url,
            stockMinimo: param.stockMinimo
        }
    }

    static toApiAgregarCantidadProductoAlmacen(param: AumentarCantidadProductoAlmacen[]): AumentarCantidadProductoAlmacenDTO[] {
        return param.map(productoAlmacen => ({
            cantidad: productoAlmacen.cantidad,
            codigoProductoPorAlmacen: productoAlmacen.idProductoPorAlmacen
        }))
    }

    static toApiDisminuirCantidadProductoAlmacen(param: DisminuirCantidadProductoAlmacen[]): DisminuirCantidadProductoAlmacenDTO[] {
        return param.map(productoAlmacen => ({
            cantidad: productoAlmacen.cantidad,
            codigoProductoPorAlmacen: productoAlmacen.idProductoPorAlmacen
        }))
    }

    static toApiActualizarStockMinimoProductoAlmacen(param: ActualizarStockMinimoProductoAlmacen[]): ActualizarStockMinimoProductoAlmacenDTO[] {
        return param.map(productoAlmacen => ({
            stockMinimo: productoAlmacen.stockMinimo,
            codigoProductoPorAlmacen: productoAlmacen.idProductoPorAlmacen
        }))
    }

    static toInsertarFechaVencimientoProductoAlmacen(param: InsertarFechaVencimientoProductoAlmacen[]): InsertarFechaVencimientoProductoAlmacenDTO[] {
        return param.map(productoAlmacen => ({
            codigoProductoPorAlmacen: productoAlmacen.idProductoPorAlmacen,
            fechaCaducidad: productoAlmacen.fechaVencimiento
        }))
    }

    static toDomainDataListarProductosConFechaVencimiento(param: DataListarProductosConFechaVencimientoDTO): DataListarProductosConFechaVencimiento {
        return {
            data: param.data.map(this.toDomainListarProductosConFechaVencimiento),
            errors: param.errors,
            isSuccess: param.isSuccess,
            message: param.message
        }
    }

    static toDomainListarProductosConFechaVencimiento(param: ListarProductosConFechaVencimientoDTO): ListarProductosConFechaVencimiento {
        return {
            idProductoPorAlmacen: param.codigoProductoPorAlmacen,
            nombreProducto: param.nombre,
            marca: param.marca,
            modelo: param.modelo,
            descripcionProducto: param.descripcion,
            unidadMedida: param.unidadDeMedida,
            urlImagen: param.url,
            fechaVencimiento: param.vencimientos.map(vencimiento => ({
                idVencimiento: vencimiento.codigoVencimiento,
                fechaVencimiento: vencimiento.fechaCaducidad
            }))
        }
    }
}