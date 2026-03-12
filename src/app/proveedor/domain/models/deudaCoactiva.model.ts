export interface DataDeudaCoactiva {
    data : ListarDeudaCoactiva[],
    isSucces: boolean,
    message : string,
    errors : null
}

export class ListarDeudaCoactiva {
    constructor(
        public idSunat : number,
        public idDeudaCoactiva : number,
        public monto : number,
        public periodo : string,
        public fecha : string,
        public entidadAsociada : string
    ){}
}
export type EditarDeudaCoactiva = ListarDeudaCoactiva
export type AgregarDeudaCoactiva =Omit<EditarDeudaCoactiva, 'idDeudaCoactiva'>
export type EliminarDeudaCoactiva = Pick<ListarDeudaCoactiva, 'idDeudaCoactiva'>