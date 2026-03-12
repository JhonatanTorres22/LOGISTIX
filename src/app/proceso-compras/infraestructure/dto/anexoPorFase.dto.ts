export interface DataAnexosPorFaseDTO {
    data: AnexoPorFaseDTO[]
    isSuccess: boolean
    message: string
    errors: null
}

export interface AnexoPorFaseDTO {
    codigoSolicitudCompra: number,
    tipoGasto: string,
    codigoSubtarea: number,
    areaResponsable: string,
    codigoPLanDeTrabajo: string,
    presupuestoProgramado: number,
    total: number,
    fases: FasesAnexosDTO[]
}

export interface FasesAnexosDTO {
    nombre: string,
    anexos: AnexosDTO[]
}
export interface AnexosDTO {
    codigoAnexo: number,
    nombre: string,
    archivos: ArchivoAnexoDTO[]
}
export interface ArchivoAnexoDTO {
    codigoAnexosPorFase: number
    archivo: string,
    observacion: string,
    estadoProceso: number,
    nombresUsuario: string,
    fechaCreacion: string
}

// OBSERVAR - APROBAR ANEXO POR FASE
export type ObservarAnexoPorFaseDTO = Pick<ArchivoAnexoDTO, 'codigoAnexosPorFase' | 'observacion'>
export type AprobarAnexoPorFaseDTO = Pick<ArchivoAnexoDTO, 'codigoAnexosPorFase'>

export interface InsertarAnexoPorFaseDTO {
    codigoSolicitudCompra: number,
    codigoAnexo: number
}

export interface ActualizarArchivoDTO {
    anexosPorFase_ActualizarArchivo: {
        CodigoAnexosPorFase: number,
    },

    archivo: File
}

export interface EnviarConstanciaFirmaDTO {
    numeroOrdenDeCompra : string,
    tipoDeGasto: string,
    areaSolicitante : string,
    nombresSolicitante : string,
    monto : string,
    nombresFirmante: string,
    enlace: string
}