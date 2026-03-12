export interface DataCarpetas{
    data: ListarCarpetas[],
    isSuccess:boolean,
    message : string,
    errors : null
}
export interface ListarCarpetas{
    idCarpeta: number,
    prefijo : string,
    numeracion : string
}

export type InsertarCarpetas = Omit<ListarCarpetas, 'idCarpeta'>

export interface ActualizarCarpetaConAnexo {
    idCarpetaConAnexo : number,
    idCarpeta: number
}
export interface InsertarCarpetasConAnexo {
    idAnexosPorFase: number,
    idCarpeta: number
}