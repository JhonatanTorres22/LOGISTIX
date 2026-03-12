export class Proveedor {
    constructor(
        public id : number,
        public tipo : string,
        public nombre : string,
        public ruc : string,
        public direccion: string,
        public evaluacion : string
    ){}
}

export type EditarProveedor = Omit <Proveedor, 'evaluacion'>
export type CrearProveedor = Omit <EditarProveedor, 'id'>
export type EliminarProveedor = Pick<Proveedor , 'id'>

export interface DataProveedor{
    data: Proveedor[];
    message : string;
    isSuccess: boolean;
    errors: null | string
}

export interface ResponseProveedor {
    data: boolean;
    errors: any;
    isSuccess: boolean;
    message: string;
}

export type ActualizarEvaluacion = Pick<Proveedor, 'id' | 'evaluacion'>