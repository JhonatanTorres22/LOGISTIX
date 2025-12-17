export class Proveedor {
    constructor(
        public id : number,
        public tipo : string,
        public nombre : string,
        public ruc : string,
        public direccion: string,
        public evaluacion : boolean
    ){}
}

export type EditarProveedor = Omit <Proveedor, 'evaluacion'>
export type CrearProveedor = Omit <EditarProveedor, 'id'>
export type EliminarProveedor = Pick<Proveedor , 'id'>