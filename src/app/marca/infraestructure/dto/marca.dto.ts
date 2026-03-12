export interface DataMarcaDTO{
    data : ListarMarcaDTO[],
    isSuccess: boolean,
    message: string,
    errors: null | string
}

export interface ListarMarcaDTO{
    codigoMarca:number,
    nombre:string,
    descripcion:string
}

export type AgregarMarcaDTO = Omit<ListarMarcaDTO,'codigoMarca'>
export type EditarMarcaDTO = ListarMarcaDTO
export type EliminarMarcaDTO = Pick<ListarMarcaDTO,'codigoMarca'>