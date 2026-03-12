export class Categoria{
    constructor(
        public idCategoria: number,
        public nombre: string,
        public descripcion: string
    ){}
}

export type CrearCategoria = Omit<Categoria, 'idCategoria'>;
export type ActualizarCategoria = Partial<Categoria>;
export type EliminarCategoria = Pick<Categoria, 'idCategoria'>;



export interface DataCategoria{
    data: Categoria[];
    message : string;
    isSuccess: boolean;
    errors: null | string
}

export interface ResponseCategoria {
   data: boolean;
  errors: any;
  isSuccess: boolean;
  message: string;
}
