export interface DataCarpetasDTO {
    data: ListarCarpetasDTO[],
    isSuccess: boolean,
    message: string,
    errors: null
}

export interface ListarCarpetasDTO {
    codigoCarpeta: number,
    prefijoArea: string,
    numeracion: string
}

export type InsertarCarpetasDTO = Omit<ListarCarpetasDTO, 'codigoCarpeta'>

export interface ActualizarCarpetaConAnexoDTO {
    codigoCarpetaConAnexoPorFase: number,
    codigoCarpeta: number
}

export interface InsertarCarpetasConAnexoDTO {
    codigoAnexosPorFase: number,
    codigoCarpeta: number
}
