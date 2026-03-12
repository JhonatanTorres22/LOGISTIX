export interface DataRepresentanteLegalDTO {
    data : ListarRepresentanteLegalDTO[],
    isSuccess : boolean,
    message : string,
    errors : null
}

export interface ListarRepresentanteLegalDTO {
    codigoSunat : number,
    codigoRepresentanteLegal : number,
    documento : string,
    numeroDocumento : string
    nombre: string,
    cargo : string,
    fechaDesde : string
}

export type EditarRepresentanteLegalDTO = ListarRepresentanteLegalDTO
export type AgregarRepresentanteLegalDTO =  Omit<ListarRepresentanteLegalDTO, 'codigoRepresentanteLegal'>
export type EliminarRepresentanteLegalDTO = Pick<ListarRepresentanteLegalDTO, 'codigoRepresentanteLegal'>