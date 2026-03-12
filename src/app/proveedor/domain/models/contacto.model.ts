export interface DataContacto {
    data: Contacto[]
    isSuccess: boolean,
    message: string
    errors: null
}

export class Contacto {
    constructor(
        public idContacto: number,
        public idProveedor: number,
        public apePaterno: string,
        public apeMaterno: string,
        public nombres: string,
        public celular: string,
        public correo: string,
        public cargo: string,
        public anotacion1: string,
        public anotacion2: string,
    ) { }
}

export type EditarContacto = Contacto
export type CrearContacto = Omit<Contacto, 'idContacto'>
export type EliminarContacto = Pick<Contacto, 'idContacto'>

export interface ResponseContacto {
    data: boolean;
    errors: any;
    isSuccess: boolean;
    message: string;
}