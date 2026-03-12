export interface DataMarca{
    data : ListarMarca[]
    isSuccess: boolean,
    message: string,
    errors: null | string
}
export class ListarMarca{
    constructor(
        public idMarca:number,
        public nombreMarca:string,
        public descripcionMarca:string
    ){}
}

export type AgregarMarca = Omit<ListarMarca,'idMarca'>
export type EditarMarca = ListarMarca
export type EliminarMarca = Pick<ListarMarca,'idMarca'>