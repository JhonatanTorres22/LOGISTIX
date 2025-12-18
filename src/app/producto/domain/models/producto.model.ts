export class Producto {
    constructor(
        public id: number,
        public nombreProducto: string,
        public modeloProducto: string,
        public descripcionProducto: string,
        public unidad: string,
        public precioReferencial: number
    ){}
}

export type EditarProducto = Producto
export type CrearProducto = Omit<Producto, 'id'>
export type EliminarProducto = Pick<Producto, 'id'>