export interface DataOrdenCarpetas {
    data: OrdenCarpetas[],
    isSuccess: boolean,
    message: string,
    errors: null
}

export class OrdenCarpetas{
    constructor(
   public idCarpeta:number,
   public prefijo : string,
   public numeracion : string,
   public carpetaConAnexoPorFase: CarpetasConAnexoPorFase[]
    ){}

}

export interface CarpetasConAnexoPorFase {
    idCarpetaConAnexoPorFase : number,
    idCarpeta: number,
    idAnexoPorFase : number,
    anexoPorFase : CarpetaAnexoPorFase[]
}

export interface CarpetaAnexoPorFase{
    idAnexosPorFase : number,
    nombreAnexo :string,
    archivo: null | string,
    cronograma : CarpetaCronograma[]
}

export interface CarpetaCronograma{
    idCronogramaPagoProveedor:number,
    monto : number,
    fecha : string,
    documentoTributario : string,
    informeProveedor : string,
    informeResponsable : string,
    comprobantePago : string
}

export interface DataSolicitudesComprasCompletas{
    data : SolicitudesComprasCompletas[],
    isSuccess: boolean,
    message: string,
    errors: null
}
export class SolicitudesComprasCompletas {
    constructor(
       public idSolicitudCompra : number,
       public tipoGasto : string,
       public codigoSubTarea : number,
       public areaResponsable: string,
       public codigoPlanTrabajo : string,
       public datosActividad: string,
       public presupuesto : number,
       public total : number,
       public cantidadAnexo: number,
       public estadoProximo : string
    ){}
}