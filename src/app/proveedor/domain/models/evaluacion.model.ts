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