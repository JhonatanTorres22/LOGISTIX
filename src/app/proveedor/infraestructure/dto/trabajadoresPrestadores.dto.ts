export interface DataTrabajadoresPrestadoresDTO {
    data: TrabajadoresPrestadoresDTO[],
    isSuccess: boolean,
    message: string,
    errors: null
}
export interface TrabajadoresPrestadoresDTO {

    codigoTrabajadoresPrestadoresDeServicio: number,
    periodo: string,
    numeroTrabajadores: number,
    numeroPensionistas: number,
    numeroPrestadoresDeServicios: number,

}
export type EditarTrabajadoresPrestadoresDTO = TrabajadoresPrestadoresDTO & { codigoSunat: number }
export type AgregarTrabajadoresPrestadoresDTO = Omit<EditarTrabajadoresPrestadoresDTO, 'codigoTrabajadoresPrestadoresDeServicio'>
export type EliminarTrabajadoresPrestadoresDTO = Pick<TrabajadoresPrestadoresDTO, 'codigoTrabajadoresPrestadoresDeServicio'>