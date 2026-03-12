
export interface DataAlcance {
    data: ListarAlcance[],
    isSuccess: boolean,
    message: string,
    errors: null
}
export class ListarAlcance {
    constructor(
        public id: number,
        public descripcion: string,
        public direccion: string,
        public coordenada: string
    ) { }
}

export type AgregarAlcance = Omit<ListarAlcance, 'id'>
export type EditarAlcance = ListarAlcance
export type EliminarAlcance = Pick<ListarAlcance, 'id'>