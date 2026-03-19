export interface DataSolicitudCompra {
  data: SolicitudCompra[]
  isSuccess: boolean
  message: string
  errors: any
}

export interface SolicitudCompra {
  // idProductoServicio: number
  idSolicitudCompra: number
  tipoGasto: string
  idSubTarea: number
  alcance : string
  areaResponsable: string,
  nombreSubTarea : string
  codigoPlanDeTrabajo: string
  presupuestoProgramado: number
  total: number
  detalle: DetalleSolicitudCompra[]
}



export interface DetalleSolicitudCompra {
  idSolicitudCompraDetalle: number
  idProveedorProducto: number
  cantidad: number
  unidadMedida: string
  descripcionDelBien: string
  precioUnitario: number
  precioTotal: number,
  ordenCompra : boolean,
  nombreProveedor: string,
  ruc: string,
  direccion : string
}

export type AgregarSolicitud =
  Omit<SolicitudCompra,
    'idSolicitudCompra' | 'detalle' |'nombreSubTarea'> &

  Omit<DetalleSolicitudCompra,
    'idSolicitudCompraDetalle' | 'direccion' | 'ruc' | 'nombreProveedor' | 'ordenCompra'>
  & {
    datosDeActividad: string
  }

  export interface GenerarOrdenDeCompra {
    idSolicitudCompraDetalle : number
  }

  export type EditarSolicitudCompraDetalle = Omit<DetalleSolicitudCompra, 'ordenCompra' |'nombreProveedor' | 'ruc' | 'direccion'>
  export type EliminarSolicitudCompraDetalle = Pick<DetalleSolicitudCompra, 'idSolicitudCompraDetalle'>