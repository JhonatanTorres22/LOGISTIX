export interface DataAlcanceDTO {
    data : ListarAlcanceDTO[],
    isSuccess : boolean,
    message: string,
    errors : null
}

export interface ListarAlcanceDTO {
    codigo: number,
    nombre: string,
    direccion: string,
    coordenadas: string
}

export type AgregarAlcanceDTO = Omit<ListarAlcanceDTO, 'codigo'>;
export type EditarAlcanceDTO = ListarAlcanceDTO
export type EliminarAlcanceDTO = Pick<ListarAlcanceDTO, 'codigo'>;