import { ConsultaRucDTO, DataConsultaRucDTO, EditarConsultaRucDTO, EliminarConsultaRucDTO, InsertarConsultaRucDTO } from "@/proveedor/infraestructure/dto/consultaRuc.dto";
import { ConsultaRuc, DataConsultaRuc, EditarConsultaRUC, EliminarConsultaRuc, InsertarConsultaRuc } from "../models/consultaRuc.model";
import { ArchivoConsultaRuc } from "../models/evaluacionSunat.model";
import { ArchivoConsultaRucDTO } from "@/proveedor/infraestructure/dto/evaluacionSunat.dto";

export class ConsultaRucMapper {
    static toDomainData(param: DataConsultaRucDTO): DataConsultaRuc {
        return {
            data: param.data.map(this.toDomain),
            errors: param.errors,
            isSuccess: param.isSuccess,
            message: param.message
        }
    }

    static toDomain(param: ConsultaRucDTO): ConsultaRuc {
        return {
            actividadComercioExterior: param.actividadComercioExterior,
            actividadPrincipal: param.actividadPrincipal,
            actividadSecundaria: param.actividadSecundaria,
            afiliadoAlPleDesde: param.afiliadoAlPleDesde,
            boletaDesde: param.boletaDesde,
            comprobantesDePago: param.comprobantesDePago,
            condicionDelContribuyente: param.condicionDelContribuyente,
            direccion: param.domicilioFiscal,
            emisorElectronicoDesde: param.emisorElectronicoDesde,
            estadoContribuyente: param.estadoContribuyente,
            facturaDesde: param.facturaDesde,
            fechaInicioDeActividades: param.fechaInicioDeActividades,
            fechaInscripcion: param.fechaInscripcion,
            idConsultaRuc: param.codigoConsultaRuc,
            idSunat: param.codigoSunat,
            nombreComercial: param.nombreComercial,
            padrones: param.padrones,
            ruc: param.numeroRuc,
            sistemaContabilidad: param.sistemaContabilidad,
            sistemaDeEmisionElectronica: param.sistemaDeEmisionElectronica,
            sistemaEmisionDeComprobante: param.sistemaEmisionDeComprobante,
            tipoContribuyente: param.tipoContribuyente,

        }
    }

    static toApiInsertar(param: InsertarConsultaRuc): InsertarConsultaRucDTO {
        return {
            actividadComercioExterior: param.actividadComercioExterior,
            actividadPrincipal: param.actividadPrincipal,
            actividadSecundaria: param.actividadSecundaria,
            afiliadoAlPleDesde: param.afiliadoAlPleDesde,
            boletaDesde: param.boletaDesde,
            comprobantesDePago: param.comprobantesDePago,
            condicionDelContribuyente: param.condicionDelContribuyente,
            domicilioFiscal: param.direccion,
            emisorElectronicoDesde: param.emisorElectronicoDesde,
            estadoContribuyente: param.estadoContribuyente,
            facturaDesde: param.facturaDesde,
            fechaInicioDeActividades: param.fechaInicioDeActividades,
            fechaInscripcion: param.fechaInscripcion,

            nombreComercial: param.nombreComercial,
            padrones: param.padrones,
            numeroRuc: param.ruc,
            codigoSunat: param.idSunat,
            sistemaContabilidad: param.sistemaContabilidad,
            sistemaDeEmisionElectronica: param.sistemaDeEmisionElectronica,
            sistemaEmisionDeComprobante: param.sistemaEmisionDeComprobante,
            tipoContribuyente: param.tipoContribuyente,
        }
    }

    static toApiEditar(param: EditarConsultaRUC): EditarConsultaRucDTO {
        return {
            codigoConsultaRuc: param.idConsultaRuc,
            actividadComercioExterior: param.actividadComercioExterior,
            actividadPrincipal: param.actividadPrincipal,
            actividadSecundaria: param.actividadSecundaria,
            afiliadoAlPleDesde: param.afiliadoAlPleDesde,
            boletaDesde: param.boletaDesde,
            comprobantesDePago: param.comprobantesDePago,
            condicionDelContribuyente: param.condicionDelContribuyente,
            domicilioFiscal: param.direccion,
            emisorElectronicoDesde: param.emisorElectronicoDesde,
            estadoContribuyente: param.estadoContribuyente,
            facturaDesde: param.facturaDesde,
            fechaInicioDeActividades: param.fechaInicioDeActividades,
            fechaInscripcion: param.fechaInscripcion,

            nombreComercial: param.nombreComercial,
            padrones: param.padrones,
            numeroRuc: param.ruc,
            codigoSunat: param.idSunat,
            sistemaContabilidad: param.sistemaContabilidad,
            sistemaDeEmisionElectronica: param.sistemaDeEmisionElectronica,
            sistemaEmisionDeComprobante: param.sistemaEmisionDeComprobante,
            tipoContribuyente: param.tipoContribuyente,
        }
    }

    static toApiEliminar(param: EliminarConsultaRuc): EliminarConsultaRucDTO {
        return {
            codigoConsultaRuc: param.idConsultaRuc
        }
    }

        static toSubirArchivo (param : ArchivoConsultaRuc) : ArchivoConsultaRucDTO {
        return{
            archivo : param.archivo,
            sunat_ActualizarArchivo :{
                CodigoSunat : param.sunat_ActualizarArchivo.CodigoSunat,
                TipoArchivo : param.sunat_ActualizarArchivo.TipoArchivo
            }
        }
    }
}