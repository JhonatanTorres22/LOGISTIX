export interface DataTrabajadoresPrestadores{
    data : TrabajadoresPrestadores[],
    isSuccess: boolean,
    message: string,
    errors: null
}
export class TrabajadoresPrestadores {
    constructor(
        public idTrabajadores : number,
        public periodo : string,
        public nTrabajadores : number,
        public nPensionistas : number,
        public nPrestadoresDeServicios : number,
    ){}
}
export type EditarTrabajadoresPrestadores = TrabajadoresPrestadores & {idSunat : number}
export type AgregarTrabajadoresPrestadores = Omit<EditarTrabajadoresPrestadores, 'idTrabajadores'>
export type EliminarTrabajadoresPrestadores = Pick<TrabajadoresPrestadores, 'idTrabajadores'>