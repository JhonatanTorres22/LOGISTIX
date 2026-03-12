export interface DataBuscarProductoHistorico{
    data : BuscarProductoHistorico[],
    isSuccess : boolean,
    message : string,
    errors : null
}

export class BuscarProductoHistorico {
    constructor(
        public idProveedorProducto: number,
        public precio : number,
        public vigencia : string,
        public historico : PrecioHistorico[],
        public proveedor: ProveedorHistorico
    ){}
}

export interface PrecioHistorico {
    precio : number,
    vigencia : string
}

export interface ProveedorHistorico{
    idProveedor: number,
    nombreProveedor : string
}

export type GuardarHistorico = Omit<BuscarProductoHistorico, 'historico' | 'proveedor'>

export type LimpiarPreciosProducto = Pick<ProveedorHistorico, 'idProveedor'>