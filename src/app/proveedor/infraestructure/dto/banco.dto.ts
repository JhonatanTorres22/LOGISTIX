export interface DataBancoDTO {
    data: ListarBancoDTO[]
    isSuccess: boolean,
    message: string
    errors: null
}
export interface ListarBancoDTO {
    codigoProveedor: number,
    codigoBanco: number,
    nombre: string,
    nCuenta: string,
    cci: string,
    ctaDetraccion: string

}

export type AgregarBancoDTO = Omit<ListarBancoDTO, 'codigoBanco'>
export type EditarBancoDTO = ListarBancoDTO
export type EliminarBancoDTO = Pick<ListarBancoDTO, 'codigoBanco'>
