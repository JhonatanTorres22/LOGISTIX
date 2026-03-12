export interface DataEvaluacionSunat{
    data: ListEvaluacionSunat[];
    message : string;
    isSuccess: boolean;
    errors: null | string
}

export class ListEvaluacionSunat {
    constructor(
       public idSunat: number,
       public idProveedor: number,
       public archivoConsultaRuc: string,
       public fechaConsultaRuc: string,
       public archivoTrabajadoresPrestadores: string,
       public fechaTrabajadoresPrestadores: string,
       public archivoDeudaCoactiva: string,
       public fechaDeudaCoactiva: string,
       public archivoRepresentanteLegal: string,
       public fechaRepresentanteLegal: string,
       public observacion : string,
       public observado : boolean
    ) { }
}

export type AgregarEvaluacionSunat = Pick<ListEvaluacionSunat, 'idProveedor'>

export interface ArchivoConsultaRuc {
    sunat_ActualizarArchivo : {
        CodigoSunat : number,
        TipoArchivo : string
    },
    archivo : string
}

export interface ActualizarFechaConsulta {
    idSunat : number
    tipoArchivoSunat : string,
    fechaConsultaSunat : string
}

export type ActualizarObservacion = Pick<ListEvaluacionSunat, 'idSunat' | 'observacion'>

