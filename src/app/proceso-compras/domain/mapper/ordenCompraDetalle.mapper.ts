import { ActualizarEstadoAtencionOrdenDTO, AgregarOrdenCompraDetalleDTO, DataOrdenCompraDTO, DataOrdenCompraPorFirmarDTO, EditarOrdenCompraDetalleDTO, EliminarOrdenCompraDetalleDTO, ListarOrdenCompraDTO, OrdenCompraPorFirmarDTO, ValidarProductoAlmacenDTO } from "@/proceso-compras/infraestructure/dto/ordenCompraDetalle.dto";
import { ActualizarEstadoAtencionOrden, AgregarOrdenCompraDetalle, DataOrdenCompra, DataOrdenCompraPorFirmar, EditarOrdenCompraDetalle, EliminarOrdenCompraDetalle, ListarOrdenCompra, OrdenCompraPorFirmar, ValidarProductoAlmacen } from "../models/ordenCompraDetalle.model";

export class OrdenCompraDetalleMapper {

    static toDomainData(param: DataOrdenCompraDTO): DataOrdenCompra {
        return {
            data: param.data.map(this.toDomainListar),
            errors: param.errors,
            isSuccess: param.isSuccess,
            message: param.message
        }
    }

    static toDomainListar(param: ListarOrdenCompraDTO): ListarOrdenCompra {
        return {
            idSolicitudCompra: param.codigoSolicitudCompra,
            tipoGasto: param.tipoGasto,
            idSubTarea: param.codigoSubTarea,
            areaResponsable: param.areaResponsable,
            codigoPlanDeTrabajo: param.codigoPlanDeTrabajo,
            datosDeActividad: param.datosDeActividad,
            presupuestoProgramado: param.presupuestoProgramado,
            total: param.total,

            anexosPorFases: param.anexosPorFases?.map(anexo => ({
                idAnexosPorFase: anexo.codigoAnexosPorFase,
                archivo: anexo.archivo,

                ordenCompra: anexo.ordenCompra?.map(orden => ({
                    idOrdenCompra: orden.codigoOrdenCompra,
                    cantidad: orden.cantidad,
                    unidadMedida: orden.unidadMedida,
                    descripcionDelBien: orden.descripcionDelBien,
                    idProveedor : orden.codigoProveedor,
                    precioUnitario: orden.precioUnitario,
                    precioTotal: orden.precioTotal,
                    nombreProveedor: orden.nombreLegal,
                    ruc: orden.ruc,
                    direccion: orden.direccionFiscal,
                    idAnexoPorFaseCronograma : orden.codigoAnexoPorFaseCronograma,
                    idProductoPorAlmacen: orden.codigoProductoPorAlmacen,
                    estadoAtencion : orden.estadoAtencion


                })) || []
            })) || []
        }
    }
    static toApiAgregar(param: AgregarOrdenCompraDetalle[]): AgregarOrdenCompraDetalleDTO[] {
        return param.map(ordenCompra => ({
            cantidad: ordenCompra.cantidad,
            codigoAnexosPorFase: ordenCompra.idAnexoPorFase,
            codigoProveedorProducto: ordenCompra.idProveedorProducto,
            codigoSolicitudCompra: ordenCompra.idSolicitudCompra,
            descripcionDelBien: ordenCompra.nombreProducto,
            precioTotal: ordenCompra.precioTotal,
            precioUnitario: ordenCompra.precioUnitario,
            unidadMedida: ordenCompra.unidadMedida
        }))
    }

    static toApiEditar(param: EditarOrdenCompraDetalle[]): EditarOrdenCompraDetalleDTO[] {
        return param.map(ordenCompra => ({
            cantidad: ordenCompra.cantidad,
            codigoOrdenCompra: ordenCompra.idOrdenCompra,
            precioTotal: ordenCompra.precioTotal
        }))
    }

    static toApiEliminar(param: EliminarOrdenCompraDetalle[]): EliminarOrdenCompraDetalleDTO[] {
        return param.map(ordenCompra => ({
            codigoOrdenCompra: ordenCompra.idOrdenCompra
        }))
    }

    static toApiValidarProductoPorAlmacen(param : ValidarProductoAlmacen[]): ValidarProductoAlmacenDTO[]{
        return param.map(ordenCompra => ({
            codigoAlmacen : ordenCompra.idAlmacen,
            codigoProductoServicio : ordenCompra.idProductoServicio
        }))
    }

    static toDomainDataOrdenPorFirmar(param: DataOrdenCompraPorFirmarDTO): DataOrdenCompraPorFirmar {
        return {
            data: param.data.map(this.toDomainOrdenCompraPorFirmar),
            errors: param.errors,
            isSuccess: param.isSuccess,
            message: param.message
        }
    }

    static toDomainOrdenCompraPorFirmar(param: OrdenCompraPorFirmarDTO): OrdenCompraPorFirmar {
        return {
            idSubTarea: param.codigoSubTarea,
            datosActividad: param.datosActividad,
            idSolicitudCompra: param.codigoSolicitudCompra,
            fechaOrdenCompra: param.fechaOrdenCompra,
            idCarpeta: param.codigoCarpeta,
            prefijoCarpeta: param.prefijoArea,
            numeracionCarpeta: param.numeracion
        }
    }


    static toApiActualizarEstadoAtencioOrden (param : ActualizarEstadoAtencionOrden[]): ActualizarEstadoAtencionOrdenDTO[] {
        return param.map(ordenCompra => ({
            codigoOrdenCompra : ordenCompra.idOrdenCompra
        }))
    }
 
}