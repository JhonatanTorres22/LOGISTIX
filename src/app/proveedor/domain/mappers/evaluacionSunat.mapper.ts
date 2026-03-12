import { ActualizarFechaConsultaDTO, ActualizarObservacionDTO, AgregarEvaluacionSunatDTO, ArchivoConsultaRucDTO, DataEvaluacionSunatDTO, EvaluacionSunatDTO } from "@/proveedor/infraestructure/dto/evaluacionSunat.dto";
import { ActualizarFechaConsulta, ActualizarObservacion, AgregarEvaluacionSunat, ArchivoConsultaRuc, DataEvaluacionSunat, ListEvaluacionSunat } from "../models/evaluacionSunat.model";

export class EvaluacionSunatMapper {
    static toDomainData (param : DataEvaluacionSunatDTO) : DataEvaluacionSunat {
        return{
            data : param.data.map(this.toDomain),
            errors : param.errors,
            isSuccess : param.isSuccess,
            message : param.message
        }
    }
    static toDomain (param : EvaluacionSunatDTO) : ListEvaluacionSunat {
        return {
            idProveedor : param.codigoProveedor,
            idSunat : param.codigoSunat,
            archivoConsultaRuc : param.archivoConsultaRuc,
            fechaConsultaRuc: param.fechaConsultaRuc,
            fechaTrabajadoresPrestadores : param.fechaTrabajadoresPrestadoresDeServicio,
            archivoTrabajadoresPrestadores : param.archivoTrabajadoresPrestadoresDeServicio,
            fechaDeudaCoactiva : param.fechaDeudaCoactiva,
            archivoDeudaCoactiva : param.archivoDeudaCoactiva,
            fechaRepresentanteLegal : param.fechaRepresentantesLegales,
            archivoRepresentanteLegal : param.archivoRepresentantesLegales,
            observacion : param.observacion,
            observado : param.observado
        }
    }

    static toApiAgregar (param : AgregarEvaluacionSunat) : AgregarEvaluacionSunatDTO {
        return {
            codigoProveedor : param.idProveedor
        }
    }

    static toActualizarFechaConsulta (param : ActualizarFechaConsulta) : ActualizarFechaConsultaDTO {
        return {
            codigoSunat : param.idSunat,
            fechaConsulta : param.fechaConsultaSunat,
            tipoArchivo : param.tipoArchivoSunat
        }
    }

    static toApiActualizarObservacion (param : ActualizarObservacion) : ActualizarObservacionDTO {
        return {
            codigoSunat : param.idSunat,
            observacion : param.observacion
        }
    }

}