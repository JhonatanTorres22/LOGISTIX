// anexos-solicitud-compra.mapper.ts


import { ActualizarArchivoDTO, AnexoPorFaseDTO, AnexosDTO, AprobarAnexoPorFaseDTO, ArchivoAnexoDTO, DataAnexosPorFaseDTO, EnviarConstanciaFirmaDTO, FasesAnexosDTO, InsertarAnexoPorFaseDTO, ObservarAnexoPorFaseDTO } from "@/proceso-compras/infraestructure/dto/anexoPorFase.dto";
import { ActualizarArchivo, AnexoPorFase, Anexos, AprobarAnexoPorFase, ArchivoAnexo, DataAnexosPorFase, EnviarConstanciaFirma, FasesAnexos, InsertarAnexoPorFase, ObservarAnexoPorFase } from "../models/anexoPorFase.model";

export class AnexosPorFaseMapper {

    static toModelData(
        dto: DataAnexosPorFaseDTO
    ): DataAnexosPorFase {
        return {
            isSuccess: dto.isSuccess,
            message: dto.message,
            errors: dto.errors,
            data: (dto.data ?? []).map(d => this.toDomain(d))
        };
    }

    static toDomain(dto: AnexoPorFaseDTO): AnexoPorFase {
        return {
            idSolicitudCompra: dto.codigoSolicitudCompra,
            tipoGasto: dto.tipoGasto,
            idSubtarea: dto.codigoSubtarea,
            areaResponsable: dto.areaResponsable,
            codigoPLanTrabajo: dto.codigoPLanDeTrabajo,
            presupuestoProgramado: dto.presupuestoProgramado,
            total: dto.total,
            fases: (dto.fases ?? []).map(f => this.mapFase(f))
        };
    }

    private static mapFase(faseDto: FasesAnexosDTO): FasesAnexos {
        return {
            nombre: faseDto.nombre,
            anexos: (faseDto.anexos ?? []).map(a => this.mapAnexo(a))
        };
    }

    private static mapAnexo(anexoDto: AnexosDTO): Anexos {
        return {
            idAnexo: anexoDto.codigoAnexo,
            nombre: anexoDto.nombre,
            archivos: (anexoDto.archivos ?? []).map(ar => this.mapArchivo(ar))
        };
    }

    private static mapArchivo(archivoDto: ArchivoAnexoDTO): ArchivoAnexo {
        return {
            idAnexosPorFase: archivoDto.codigoAnexosPorFase,
            archivo: archivoDto.archivo,
            estado: archivoDto.estadoProceso,
            observacion: archivoDto.observacion,
            fechaCreacion : archivoDto.fechaCreacion,
            nombreUsuario : archivoDto.nombresUsuario
        };
    }

    static toApiAprobarAnexo(param: AprobarAnexoPorFase): AprobarAnexoPorFaseDTO {
        return {
            codigoAnexosPorFase: param.idAnexosPorFase,
        }
    }

    static toObservarAnexo(param: ObservarAnexoPorFase): ObservarAnexoPorFaseDTO {
        return {
            codigoAnexosPorFase: param.idAnexosPorFase,
            observacion: param.observacion
        }
    }

    static toApiInsertar = (param: InsertarAnexoPorFase): InsertarAnexoPorFaseDTO => {
        return {
            codigoAnexo: param.idAnexo,
            codigoSolicitudCompra: param.idSolicitudCompra
        }
    }

    static toApiActualizarArchivo = (param: ActualizarArchivo): ActualizarArchivoDTO => {
        return {
            archivo: param.archivo,
            anexosPorFase_ActualizarArchivo: {
                CodigoAnexosPorFase: param.anexosPorFase_ActualizarArchivo.CodigoAnexosPorFase,
            }
        };
    }

    static toApiEnviarConstancaFirma = (param : EnviarConstanciaFirma) : EnviarConstanciaFirmaDTO => {
        return{
            areaSolicitante : param.areaSolicitante,
            enlace : param.enlace,
            monto : param.monto,
            nombresFirmante : param.nombreFirmante,
            nombresSolicitante : param.nombreSolicitante,
            numeroOrdenDeCompra : param.ordenCompra,
            tipoDeGasto : param.tipoGasto
        }
    }
}
