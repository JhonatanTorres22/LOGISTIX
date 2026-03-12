export interface DataUnidadMedidaDTO {
    data: ListarUnidadMedidaDTO[];
    message: string;
    isSuccess: boolean;
    errors: null | string
}

export class ListarUnidadMedidaDTO {
    constructor(
        public codigoUnidadMedida: number,
        public nombre: string,
        public descripcion: string
    ) { }
}

export type AgregarUnidadMedidaDTO = Omit<ListarUnidadMedidaDTO, 'codigoUnidadMedida'>
export type EditarUnidadMedidaDTO = ListarUnidadMedidaDTO
export type EliminarUnidadMedidaDTO = Pick<ListarUnidadMedidaDTO, 'codigoUnidadMedida'>

