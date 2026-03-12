export interface DataBuscarProductoHistoricoDTO{
    data : BuscarProductoHistoricoDTO[],
    isSuccess : boolean,
    message : string,
    errors : null
}

export class BuscarProductoHistoricoDTO {
    constructor(
        public codigoProveedorProducto: number,
        public precioReferencial : number,
        public vigencia : string,
        public historico : PrecioHistoricoDTO[],
        public proveedor: ProveedorHistoricoDTO
    ){}
}

export interface PrecioHistoricoDTO {
    precio : number,
    vigencia : string
}

export interface ProveedorHistoricoDTO{
    codigoProveedor: number,
    nombreRs : string
}

export type GuardarHistoricoDTO = Omit<BuscarProductoHistoricoDTO, 'historico' | 'proveedor' |'precioReferencial'> & {precio : number}
export type LimpiarPreciosProductoDTO = Pick<ProveedorHistoricoDTO, 'codigoProveedor'>