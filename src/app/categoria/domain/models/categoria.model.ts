export class Categoria{
    constructor(
        public id: number,
        public nombre: string,
        public descripcion: string
    ){}
}

export type CrearCategoria = Omit<Categoria, 'id'>;
export type ActualizarCategoria = Partial<Categoria>;
export type EliminarCategoria = Pick<Categoria, 'id'>;

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
