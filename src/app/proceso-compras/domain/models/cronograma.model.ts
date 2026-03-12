export interface DataCronograma {
    data: ListarCronograma[]
    isSuccess: boolean
    message: string
    errors: null
}
export class ListarCronograma {
    constructor(
        public idCronogramaPagoProveedor: number,
        public monto: number,
        public fecha: string,
        public comprobante: File | null,
        public tipoDocumentoTributario : string,
        public informeProveedor: File | null,
        public informeResponsable : File | null,
        public documentoTributario : File |null,
        public observacion : string,
        public conceptoTributario: string,
        public estado : number,
        public edit?: boolean,
        public uploadTipo?: 'comprobante' | 'docTributario' | 'infProveedor' |'infResponsable'| null
    ) { }
}

export interface InsertarCronogramaPago {
    idAnexoPorFase: number,
    fecha: string,
    monto: number,
    conceptoTributario: string,
    tipoDocumentoTributario: string,
    idAnexoPorFaseOrdenCompra : number

}
export type EditarCronograma = Omit<InsertarCronogramaPago, 'idAnexoPorFase' | 'idAnexoPorFaseOrdenCompra'> & Pick<ListarCronograma, 'idCronogramaPagoProveedor'>
export type EliminarCronograma = Pick<ListarCronograma, 'idCronogramaPagoProveedor'>

export interface ActualizarComprobanteCronograma {
cronogramaPagoProveedor_ActualizarComprobante: {
        CodigoCronogramaPagoProveedor: number
    },
    comprobante: File
}

export interface ActualizarComprobanteFactura {
    cronogramaPagoProveedor_ActualizarFactura : {
        CodigoCronogramaPagoProveedor: number
    },
    comprobante : File
}

export type ObservarCronogramaPago = Pick<ListarCronograma, 'idCronogramaPagoProveedor'> & {observacion : string}
export type AprobarCronogramaPago = Pick<ListarCronograma, 'idCronogramaPagoProveedor'>


export interface DataComprobantePorCargar {
    data: ComprobantePorCargar[]
    isSuccess: boolean
    message: string
    errors: any
}

export interface ComprobantePorCargar {
    idSolicitudCompra: number
    idSubTarea: number
    idCronogramaPagoProveedor: number
    concepto: string
    monto: number
    fechaPago: string
    tipoDocumento: string
    idCarpeta: number
    prefijoCarpeta: string
    numeracionCarpeta: string
}



export interface DataDocTributarioPorAprobar {
  data: DocTributarioPorAprobar[]
  isSuccess: boolean
  message: string
  errors: any
}

export type DocTributarioPorAprobar = ComprobantePorCargar & {
    documentoTributario: string
    estadoProceso: number
}
