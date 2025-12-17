export interface CriterioDTO {
    codigoCriterio: number,
    nombreCriterio: string,
    detalleVerificar: string,
    obligatorio: boolean
}

export interface DataCriterioDTO {
    data : CriterioDTO[],
    isSuccess: boolean,
    message: string,
    errors: null
}

export interface CrearEvaluacionDTO {
    codigoProveedor: number
    codigoCriterio: number
    cumple: boolean,
    observacion: string,
    documento: string
}