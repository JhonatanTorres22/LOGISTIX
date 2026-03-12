export interface DataRepresentanteLegal {
    data : ListarRepresentanteLegal[],
    isSuccess : boolean,
    message : string,
    errors : null
}

export class ListarRepresentanteLegal {
    constructor (
        public idSunat : number,
        public idRepresentanteLegal : number,
        public tipoDocumento : string,
        public nDocumento : string,
        public nombreRL : string,
        public cargoRL : string,
        public fechaDesde : string
    ){}
}

export type EditarRepresentanteLegal = ListarRepresentanteLegal
export type AgregarRepresentanteLegal =  Omit<ListarRepresentanteLegal, 'idRepresentanteLegal'>
export type EliminarRepresentanteLegal = Pick<ListarRepresentanteLegal, 'idRepresentanteLegal'>