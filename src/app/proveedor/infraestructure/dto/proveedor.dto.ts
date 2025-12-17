
export interface ProveedorDTO {
    codigoProveedor: number,
    tipoProveedor: string,
    nombreRs: string,
    ruc: string,
    direccionFiscal: string,
    evaluacion: boolean
}

export type CrearProveedorDTO = Omit<EditarProveedorDTO, 'codigoProveedor'>
export type EditarProveedorDTO =Omit < ProveedorDTO, 'evaluacion'>
export type EliminarProveedorDTO = Pick<ProveedorDTO, 'codigoProveedor'>
export interface DataProveedorDTO {
    data : ProveedorDTO[],
    isSuccess: boolean,
    message: string,
    errors: null
}