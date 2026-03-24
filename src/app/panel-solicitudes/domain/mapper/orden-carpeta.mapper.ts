import { CarpetaAnexoPorFaseDTO, CarpetaCronogramaDTO, CarpetasConAnexoPorFaseDTO, DataOrdenCarpetasDTO, DataSolicitudesComprasCompletaDTO, OrdenCarpetasDTO, SolicitudesComprasCompletasDTO } from "@/panel-solicitudes/infraestructure/dto/orden-carpeta.dto";
import { CarpetaAnexoPorFase, CarpetaCronograma, CarpetasConAnexoPorFase, DataOrdenCarpetas, DataSolicitudesComprasCompletas, OrdenCarpetas, SolicitudesComprasCompletas } from "../models/orden-carpeta.model";
import { DataSolicitudCompraDTO } from "@/proceso-compras/infraestructure/dto/solicitud-compra.dto";

export class OrdenCarpetaMapper {

    static toDomainData = (param: DataOrdenCarpetasDTO): DataOrdenCarpetas => {
        return {
            data: param.data.map(this.toDomain),
            isSuccess: param.isSuccess,
            message: param.message,
            errors: param.errors
        }
    }

    static toDomain = (param: OrdenCarpetasDTO): OrdenCarpetas => {
        return {
            idCarpeta: param.codigoCarpeta,
            prefijo: param.prefijoArea,
            numeracion: param.numeracion,
            carpetaConAnexoPorFase: param.carpetaConAnexoPorFase.map(
                this.toDomainCarpetaConAnexoPorFase
            )
        }
    }

    static toDomainCarpetaConAnexoPorFase = ( param: CarpetasConAnexoPorFaseDTO): CarpetasConAnexoPorFase => {
        return {
            idCarpetaConAnexoPorFase: param.codigoCarpetaConAnexoPorFase,
            idCarpeta: param.codigoCarpeta,
            idAnexoPorFase: param.codigoAnexosPorFase,
            anexoPorFase: param.anexosPorFase.map(
                this.toDomainAnexoPorFase
            )
        }
    }

    static toDomainAnexoPorFase = (param: CarpetaAnexoPorFaseDTO): CarpetaAnexoPorFase => {
        return {
            idAnexosPorFase: param.codigoAnexosPorFase,
            archivo: param.archivo,
            nombreAnexo : param.nombreAnexo,
            cronograma: param.cronogramaPagoProveedor.map(
                this.toDomainCronograma
            )
        }
    }

    static toDomainCronograma = ( param: CarpetaCronogramaDTO): CarpetaCronograma => {
        return {
            idCronogramaPagoProveedor: param.codigoCronogramaPagoProveedor,
            monto: param.monto,
            fecha: param.fechaPago,
            documentoTributario : param.documentoTributario,
            informeProveedor : param.informeProveedor,
            informeResponsable : param.informeResponsable,
            comprobantePago : param.comprobante
        }
    }

    static toDomainDataSolicitudCompleta = (param : DataSolicitudesComprasCompletaDTO) : DataSolicitudesComprasCompletas => {
        return {
            data : param.data.map(this.toDomainSolicitudCompleta),
            errors : param.errors,
            isSuccess : param.isSuccess,
            message : param.message
        }
    }

    static toDomainSolicitudCompleta = (param : SolicitudesComprasCompletasDTO) : SolicitudesComprasCompletas=> {
        return{
            idSolicitudCompra : param.codigoSolicitudCompra,
            codigoSubTarea : param.codigoSubTarea,
            presupuesto: param.presupuestoProgramado,
            tipoGasto : param.tipoGasto,
            total : param.total,
            datosActividad : param.datosDeActividad,
            codigoPlanTrabajo : param.codigoPlanDeTrabajo,
            areaResponsable : param.areaResponsable,
            cantidadAnexo : param.cantidadAnexos,
            estadoSolicitud : 4
        }
    }


}
