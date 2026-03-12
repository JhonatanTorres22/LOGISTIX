import { SolicitudCompraDTO, DetalleSolicitudCompraDTO, AgregarSolicitudDTO, GenerarOrdenDeCompraDTO, DataSolicitudCompraDTO, EditarSolicitudCompraDetalleDTO, EliminarSolicitudCompraDetalleDTO } from "../../infraestructure/dto/solicitud-compra.dto";
import { AgregarSolicitud, DataSolicitudCompra, DetalleSolicitudCompra, EditarSolicitudCompraDetalle, EliminarSolicitudCompraDetalle, GenerarOrdenDeCompra, SolicitudCompra } from "../models/solicitud-compra.model";


export class SolicitudCompraMapper {

    static toDomainData = (param : DataSolicitudCompraDTO) : DataSolicitudCompra => {
        return {
            data : param.data.map(this.toDomain),
            errors : param.errors,
            isSuccess : param.isSuccess,
            message : param.message
        }
    }
    static toDomain = (param: SolicitudCompraDTO): SolicitudCompra => {
        return {
            nombreSubTarea : param.datosDeActividad,
            idSolicitudCompra: param.codigoSolicitudCompra,
            idSubTarea: param.codigoSubTarea,
            alcance : param.alcance,
            codigoPlanDeTrabajo: param.codigoPlanDeTrabajo,
            areaResponsable: param.areaResponsable,
            presupuestoProgramado: param.presupuestoProgramado,
            tipoGasto: param.tipoGasto,
            total: param.total,
            detalle: param.detalle.map(d => SolicitudCompraMapper.detalleToDomain(d))
        }
    }

    static detalleToDomain = (param: DetalleSolicitudCompraDTO): DetalleSolicitudCompra => {
        return {
            idSolicitudCompraDetalle: param.codigoSolicitudCompraDetalle,
            idProveedorProducto: param.codigoProveedorProducto,
            cantidad: param.cantidad,
            unidadMedida: param.unidadMedida,
            descripcionDelBien: param.descripcionDelBien,
            precioUnitario: param.precioUnitario,
            precioTotal: param.precioTotal,
            direccion : param.direccionFiscal,
            nombreProveedor : param.nombreRs,
            ordenCompra : param.enOrdenDeCompra,
            ruc : param.ruc
        };
    }


    static toApiAgregar = (param: AgregarSolicitud[]): AgregarSolicitudDTO[] => {
        return param.map(item => ({
            tipoGasto: item.tipoGasto,
            codigoSubTarea: item.idSubTarea,
            areaResponsable: item.areaResponsable,
            alcance : item.alcance,
            codigoPlanDeTrabajo: item.codigoPlanDeTrabajo,
            datosDeActividad: item.datosDeActividad,
            presupuestoProgramado: item.presupuestoProgramado,
            total: item.total,
            codigoProveedorProducto: item.idProveedorProducto,
            cantidad: item.cantidad,
            unidadMedida: item.unidadMedida,
            descripcionDelBien: item.descripcionDelBien,
            precioUnitario: item.precioUnitario,
            precioTotal: item.precioTotal,
        }))
    }

    static ToApiGenerarOrden = (param: GenerarOrdenDeCompra[]): GenerarOrdenDeCompraDTO[] => {
        return param.map(item => ({
            codigoSolicitudCompraDetalle: item.idSolicitudCompraDetalle
        }))
    }

    static toApiEditarSolicitudCompraDetalle = (param : EditarSolicitudCompraDetalle) : EditarSolicitudCompraDetalleDTO => {
        return {
            codigoProveedorProducto : param.idProveedorProducto,
            codigoSolicitudCompraDetalle : param.idSolicitudCompraDetalle,
            descripcionDelBien : param.descripcionDelBien,
            precioTotal : param.precioTotal,
            precioUnitario : param.precioUnitario,
            unidadMedida : param.unidadMedida,
            cantidad : param.cantidad
        }
    }

    static ToApiEliminarSolicitudCompraDetalle = (param : EliminarSolicitudCompraDetalle) : EliminarSolicitudCompraDetalleDTO => {
        return {
            codigoSolicitudCompraDetalle : param.idSolicitudCompraDetalle
        }
    }

}