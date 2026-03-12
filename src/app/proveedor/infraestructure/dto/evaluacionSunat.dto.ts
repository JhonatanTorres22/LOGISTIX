export interface DataEvaluacionSunatDTO{
    data: EvaluacionSunatDTO[];
    message : string;
    isSuccess: boolean;
    errors: null | string
}

export interface EvaluacionSunatDTO {
    codigoSunat : number,
    codigoProveedor : number,
    archivoConsultaRuc : string,
    fechaConsultaRuc: string,
    archivoTrabajadoresPrestadoresDeServicio : string,
    fechaTrabajadoresPrestadoresDeServicio: string,
    archivoDeudaCoactiva : string,
    fechaDeudaCoactiva: string,
    archivoRepresentantesLegales : string,
    fechaRepresentantesLegales : string,
    observacion : string
    observado : boolean
}

export type AgregarEvaluacionSunatDTO = Pick<EvaluacionSunatDTO , 'codigoProveedor'>

export interface ArchivoConsultaRucDTO {
    sunat_ActualizarArchivo : {
        CodigoSunat : number,
        TipoArchivo : string
    },
    archivo : string
}

export interface ActualizarFechaConsultaDTO{
    codigoSunat : number,
    tipoArchivo : string,
    fechaConsulta : string
}

export type ActualizarObservacionDTO = Pick<EvaluacionSunatDTO, 'codigoSunat' | 'observacion'>