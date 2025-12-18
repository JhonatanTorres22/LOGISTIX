export interface CategoriaDTO{
    codigoCategoria: number;
    nombre: string;
    descripcion: string;
}

export type CrearCategoriaDTO = Omit<CategoriaDTO, 'codigoCategoria'>;
export type ActualizarCategoriaDTO = Partial<CategoriaDTO>;
export type EliminarCategoriaDTO = Pick<CategoriaDTO, 'codigoCategoria'>;

export interface DataCategoriaDTO{
    data: CategoriaDTO[];
    message : string;
    isSuccess: boolean;
    errors: null | string
}
