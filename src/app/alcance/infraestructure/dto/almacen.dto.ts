export interface DataAlmacenDTO {
    data : ListarAlmacenDTO[],
    isSuccess : boolean,
    message: string,
    errors : null
}

export interface ListarAlmacenDTO {
    codigo: number,
    nombre: string,
    descripcion : string
}
