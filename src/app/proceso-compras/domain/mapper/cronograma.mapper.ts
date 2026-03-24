import { ActualizarComprobanteCronogramaDTO, ActualizarPagoRealizadoDTO, AprobarCronogramaPagoDTO, ComprobantePorCargarDTO, DataComprobantePorCargarDTO, DataCronogramaDTO, DataDocTributarioPorAprobarDTO, DataPagosRealizadosDTO, DocTributarioPorAprobarDTO, EditarCronogramaDTO, EliminarCronogramaDTO, InsertarCronogramaPagoDTO, ListarCronogramaDTO, ListarPagosRealizadosDTO, ObservarCronogramaPagoDTO } from "@/proceso-compras/infraestructure/dto/cronograma.dto";
import { ActualizarComprobanteCronograma, ActualizarPagoRealizado, AprobarCronogramaPago, ComprobantePorCargar, DataComprobantePorCargar, DataCronograma, DataDocTributarioPorAprobar, DataPagosRealizados, DocTributarioPorAprobar, EditarCronograma, EliminarCronograma, InsertarCronogramaPago, ListarCronograma, ListarPagosRealizados, ObservarCronogramaPago } from "../models/cronograma.model";

export class CronogramaMapper {
    static toDomainData(param: DataCronogramaDTO): DataCronograma {
        return {
            data: param.data.map(this.toDomain),
            errors: param.errors,
            isSuccess: param.isSuccess,
            message: param.message
        }
    }

    static toDomain(param: ListarCronogramaDTO): ListarCronograma {
        return {
            comprobante: param.comprobante,
            idCronogramaPagoProveedor: param.codigoCronogramaPagoProveedor,
            fecha: param.fechaPago,
            monto: param.monto,
            estado : param.estadoProceso,
            observacion : param.observacion,
            conceptoTributario : param.concepto,
            documentoTributario : param.documentoTributario,
            informeProveedor : param.informeProveedor,
            informeResponsable : param.informeResponsable,
            tipoDocumentoTributario : param.tipoDocumento,
            fechaPagoRealizado : param.fechaPagoRealizado,
            tipoPago : param.tipoPago,
            tipoObservacion : param.tipoObservacion

        }
    }

    static toApiInsertarCronogramaPago = (param: InsertarCronogramaPago[]): InsertarCronogramaPagoDTO[] => {
        return param.map(cronograma => ({
            monto: cronograma.monto,
            codigoAnexoPorFase: cronograma.idAnexoPorFase,
            fechaPago: cronograma.fecha,
            concepto : cronograma.conceptoTributario,
            tipoDocumento : cronograma.tipoDocumentoTributario,
            codigoAnexoPorFaseOrdenCompra : cronograma.idAnexoPorFaseOrdenCompra
        }))
    }

    static toApiEditarCronograma = (param: EditarCronograma[]): EditarCronogramaDTO[] => {
        return param.map(cronograma => ({
            codigoCronogramaPagoProveedor: cronograma.idCronogramaPagoProveedor,
            fechaPago: cronograma.fecha,
            monto: cronograma.monto,
            concepto : cronograma.conceptoTributario,
            tipoDocumento : cronograma.tipoDocumentoTributario
        }))
    }

    static toApiEliminarCronograma = (param: EliminarCronograma[]): EliminarCronogramaDTO[] => {
        return param.map(cronograma => ({
            codigoCronogramaPagoProveedor: cronograma.idCronogramaPagoProveedor
        }))
    }

    static toApiActualizarComprobante = (param: ActualizarComprobanteCronograma): ActualizarComprobanteCronogramaDTO => {
        return {
            comprobante: param.comprobante,
            cronogramaPagoProveedor_ActualizarComprobante: {
                CodigoCronogramaPagoProveedor: param.cronogramaPagoProveedor_ActualizarComprobante.CodigoCronogramaPagoProveedor
            }
        }
    }

    static toApiObservarCronogramaPago = (param : ObservarCronogramaPago) : ObservarCronogramaPagoDTO => {
        return {
            codigoCronogramaPagoProveedor : param.idCronogramaPagoProveedor,
            observacion : param.observacion,
            tipoObservacion : param.tipoObservacion
        }
    }

    static toApiAprobarCronogramaPago = (param : AprobarCronogramaPago) : AprobarCronogramaPagoDTO => {
        return {
            codigoCronogramaPagoProveedor : param.idCronogramaPagoProveedor
        }
    }

    static toDomainDataDocumentoTributarioPorAprobar = (param : DataDocTributarioPorAprobarDTO) : DataDocTributarioPorAprobar => {
        return {
            data: param.data.map(this.toDomainDocTributarioPorAprobar),
            errors: param.errors,
            isSuccess: param.isSuccess,
            message: param.message
        }
    }

    static toDomainDocTributarioPorAprobar = (param : DocTributarioPorAprobarDTO) : DocTributarioPorAprobar => {
        return {
            idSolicitudCompra : param.codigoSolicitudCompra,
            idSubTarea : param.codigoSubTarea,
            idCronogramaPagoProveedor : param.codigoCronogramaPagoProveedor,
            concepto : param.concepto,
            monto : param.monto,
            fechaPago : param.fechaPago,
            tipoDocumento : param.tipoDocumento,
            documentoTributario : param.documentoTributario,
            estadoProceso : param.estadoProceso,
            idCarpeta : param.codigoCarpeta,
            numeracionCarpeta : param.numeracion,
            prefijoCarpeta : param.prefijoArea
        }
    }

        static toDomainDataComprobantePorCargar = (param : DataComprobantePorCargarDTO) : DataComprobantePorCargar => {
        return {
            data: param.data.map(this.toDomainComprobantePorCargar),
            errors: param.errors,
            isSuccess: param.isSuccess,
            message: param.message
        }
    }

    static toDomainComprobantePorCargar = (param : ComprobantePorCargarDTO) : ComprobantePorCargar => {
        return {
            idSolicitudCompra : param.codigoSolicitudCompra,
            idSubTarea : param.codigoSubTarea,
            idCronogramaPagoProveedor : param.codigoCronogramaPagoProveedor,
            concepto : param.concepto,
            monto : param.monto,
            fechaPago : param.fechaPago,
            tipoDocumento : param.tipoDocumento,
            idCarpeta : param.codigoCarpeta,
            numeracionCarpeta : param.numeracion,
            prefijoCarpeta : param.prefijoArea
        }
    }

    static toApiActualizarPago (param : ActualizarPagoRealizado) : ActualizarPagoRealizadoDTO{
        return {
            codigoCronogramaPagoProveedor : param.idCronogramaPagoProveedor,
            fechaPagoRealizado : param.fechaRealizado,
            tipoPago : param.tipoPago
        }
    }


    /* PAGOS NO REALIZADOS   */
    static toDomainDataPagosRealizados = (param : DataPagosRealizadosDTO) : DataPagosRealizados =>{
        return{
            data : param.data.map(this.toDomainPagosRealizados),
            errors : param.errors,
            isSuccess : param.isSuccess,
            message : param.message
        }
    }

    static toDomainPagosRealizados = (param : ListarPagosRealizadosDTO ) : ListarPagosRealizados => {
        return {
            idCronogramaPagoProveedor : param.codigoCronogramaPagoProveedor,
            fechaPagoRealizado : param.fechaPagoRealizado,
            monto : param.monto,
            nombreProveedor : param.proveedor,
            tipoPago : param.tipoPago,
            conceptoCronograma : param.concepto,
            fechaPagoCronograma : param.fechaPago,
            tipoDocumento : param.tipoDocumento,
            alcance : param.alcance
        }
    }

}