export interface DataUnidadMedida {
    data: ListarUnidadMedida[];
    message: string;
    isSuccess: boolean;
    errors: null | string
}

export class ListarUnidadMedida {
    constructor(
        public idUnidadMedida: number,
        public nombre: string,
        public descripcion: string
    ){}
}

export type AgregarUnidadMedida = Omit<ListarUnidadMedida, 'idUnidadMedida'>
export type EditarUnidadMedida = ListarUnidadMedida
export type EliminarUnidadMedida = Pick<ListarUnidadMedida, 'idUnidadMedida'>

