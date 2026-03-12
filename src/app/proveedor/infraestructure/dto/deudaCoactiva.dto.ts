export interface DataDeudaCoactivaDTO {
    data: ListarDeudaCoactivaDTO[],
    isSucces: boolean,
    message: string,
    errors: null
}

export interface ListarDeudaCoactivaDTO {
    codigoSunat : number
    codigoDeudaCoactiva: number,
    montoDeLaDeuda: number,
    periodoTributario: string,
    fechaInicioDeCobranzaCoactiva: string,
    entidadAsociadaAlaDeuda: string
}

export type EditarDeudaCoactivaDTO = ListarDeudaCoactivaDTO
export type AgregarDeudaCoactivaDTO =Omit<EditarDeudaCoactivaDTO, 'codigoDeudaCoactiva'>
export type EliminarDeudaCoactivaDTO = Pick<ListarDeudaCoactivaDTO, 'codigoDeudaCoactiva'>