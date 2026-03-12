export interface DataBanco{
    data: ListarBanco[]
    isSuccess: boolean,
    message: string
    errors: null
}
export class ListarBanco {
    constructor(
        public idProveedor : number,
        public idBanco: number,
        public nombreBanco : string,
        public numeroCuenta : string,
        public cci: string,
        public cuentaDetraccion: string
    ){}
}

export type AgregarBanco = Omit<ListarBanco, 'idBanco'>
export type EditarBanco = ListarBanco
export type EliminarBanco = Pick<ListarBanco, 'idBanco'>
