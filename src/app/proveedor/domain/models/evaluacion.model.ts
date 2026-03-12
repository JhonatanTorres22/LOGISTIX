export class Criterio {
    constructor(
        public id: number,
        public nombre: string,
        public detalle : string,
        public obligatorio : boolean
    ){}
}

export interface CrearEvaluacion {
    idProveedor: number
    idCriterio: number
    cumple: boolean,
    observacion: string,
    documento: string 
}

export type EditarEvaluacion = Omit<CrearEvaluacion, 'idCriterio'> & { idEvaluacion: number };

export interface ResponseEvaluacion {
    data: boolean;
    errors: any;
    isSuccess: boolean;
    message: string;
}

export interface DataCriterio{
    data: Criterio[];
    message : string;
    isSuccess: boolean;
    errors: null | string
}

export interface DataEvaluacion {
    data: ProveedorEvaluacion[],
    isSuccess: boolean,
    message: string,
    error : null
}
export interface ProveedorEvaluacion {
    idProveedor : number,
    nombre: string,
    tipo : string,
    direccion: string,
    evaluaciones: Evaluacion[]
}
export interface Evaluacion {
    idEvaluacion : number,
    idCriterio: number,
    nombreCriterio: string,
    detalleCriterio : string,
    obligatorio : boolean,
    cumple: boolean,
    observacion: string,
    documento : string
}