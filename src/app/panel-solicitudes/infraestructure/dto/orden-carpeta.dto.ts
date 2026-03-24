export interface DataOrdenCarpetasDTO {
    data: OrdenCarpetasDTO[],
    isSuccess: boolean,
    message: string,
    errors: null
}

export interface OrdenCarpetasDTO {
    codigoCarpeta: number,
    prefijoArea: string,
    numeracion: string,
    carpetaConAnexoPorFase: CarpetasConAnexoPorFaseDTO[]
}

export interface CarpetasConAnexoPorFaseDTO {
    codigoCarpetaConAnexoPorFase: number,
    codigoCarpeta: number,
    codigoAnexosPorFase: number,
    anexosPorFase: CarpetaAnexoPorFaseDTO[]
}

export interface CarpetaAnexoPorFaseDTO {
    codigoAnexosPorFase: number,
    nombreAnexo: string
    archivo: null | string,
    cronogramaPagoProveedor: CarpetaCronogramaDTO[]
}

export interface CarpetaCronogramaDTO {
    codigoCronogramaPagoProveedor: number,
    monto: number,
    fechaPago: string,
    documentoTributario: string,
    informeProveedor: string,
    informeResponsable: string,
    comprobante: string
}

export interface DataSolicitudesComprasCompletaDTO {
    data: SolicitudesComprasCompletasDTO[]
    isSuccess: boolean,
    message: string,
    errors: null
}
export interface SolicitudesComprasCompletasDTO {
    codigoSolicitudCompra: number,
    tipoGasto: string,
    codigoSubTarea: number,
    areaResponsable: string,
    codigoPlanDeTrabajo: string,
    datosDeActividad: string,
    presupuestoProgramado: number,
    total: number,
    cantidadAnexos: number,
    estadoSolicitud : number
}