export interface DataAlmacen {
    data : ListarAlmacen[],
    isSuccess : boolean,
    message: string,
    errors : null
}

export class ListarAlmacen{
    constructor(
        public id: number,
        public nombre: string,
        public descripcion: string
    ){}
}