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

export type EditarEvaluacionDTO = Omit<CrearEvaluacionDTO, 'codigoCriterio'> & {codigoEvaluacion: number}
export interface DataEvaluacionDTO {
    data: ProveedorEvaluacionDTO[],
    isSuccess: boolean,
    message: string,
    error : null
}
export interface ProveedorEvaluacionDTO {
    codigoProveedor : number,
    nombreLegal: string,
    tipo : string,
    direccion: string,
    evaluaciones: EvaluacionDTO[]
}
export interface EvaluacionDTO {
    codigoEvaluacion : number,
    codigoCriterio: number,
    nombreCriterio: string,
    detalleCriterio : string,
    obligatorioCriterio : boolean,
    cumple: boolean,
    observacion: string,
    documento : string
}