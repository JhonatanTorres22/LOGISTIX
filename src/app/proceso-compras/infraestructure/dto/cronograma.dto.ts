export interface DataCronogramaDTO {
    data: ListarCronogramaDTO[]
    isSuccess: boolean
    message: string
    errors: null
}
export interface ListarCronogramaDTO {
    codigoCronogramaPagoProveedor: number,
    concepto: string
    monto: number,
    fechaPago: string,
    tipoDocumento: string,
    documentoTributario: File | null,
    informeProveedor: File | null,
    informeResponsable: File | null,
    comprobante: File | null,
    observacion: string,
    tipoObservacion : string
    estadoProceso: number,
    fechaPagoRealizado: string,
    tipoPago : string
}

export interface InsertarCronogramaPagoDTO {
    codigoAnexoPorFase: number,
    fechaPago: string,
    monto: number,
    concepto: string,
    tipoDocumento: string,
    codigoAnexoPorFaseOrdenCompra: number
}
export type EditarCronogramaDTO = Omit<InsertarCronogramaPagoDTO, 'codigoAnexoPorFase' | 'codigoAnexoPorFaseOrdenCompra'> & Pick<ListarCronogramaDTO, 'codigoCronogramaPagoProveedor'>
export type EliminarCronogramaDTO = Pick<ListarCronogramaDTO, 'codigoCronogramaPagoProveedor'>
export interface ActualizarComprobanteCronogramaDTO {
    cronogramaPagoProveedor_ActualizarComprobante: {
        CodigoCronogramaPagoProveedor: number
    },
    comprobante: File
}

export type ObservarCronogramaPagoDTO = Pick<ListarCronogramaDTO, 'codigoCronogramaPagoProveedor'> & 
{ observacion: string,
    tipoObservacion : string
 }
export type AprobarCronogramaPagoDTO = Pick<ListarCronogramaDTO, 'codigoCronogramaPagoProveedor'>


export interface DataComprobantePorCargarDTO {
    data: ComprobantePorCargarDTO[]
    isSuccess: boolean
    message: string
    errors: any
}

export interface ComprobantePorCargarDTO {
    codigoSolicitudCompra: number
    codigoSubTarea: number
    codigoCronogramaPagoProveedor: number
    concepto: string
    monto: number
    fechaPago: string
    tipoDocumento: string
    codigoCarpeta: number
    prefijoArea: string
    numeracion: string
}

export interface DataDocTributarioPorAprobarDTO {
    data: DocTributarioPorAprobarDTO[]
    isSuccess: boolean
    message: string
    errors: any
}

export type DocTributarioPorAprobarDTO = ComprobantePorCargarDTO & {
    documentoTributario: string
    estadoProceso: number
}

export interface ActualizarPagoRealizadoDTO {
    codigoCronogramaPagoProveedor : number,
    fechaPagoRealizado : string,
    tipoPago : string
}

export interface DataPagosRealizadosDTO {
    data: ListarPagosRealizadosDTO[]
    isSuccess: boolean
    message: string
    errors: any
}

export interface ListarPagosRealizadosDTO {
    codigoCronogramaPagoProveedor: number,
    proveedor : string,
    concepto : string,
    monto: number, 
    fechaPago : string,
    tipoDocumento: string
    fechaPagoRealizado: string,
    tipoPago: string,
    alcance : string
    // local: string,
}