export interface DataContactoDTO {
        data: ContactoDTO[]
        isSuccess: boolean,
        message: string
        errors : null 
}

export class ContactoDTO {
    constructor(
        public codigoContacto: number,
        public codigoProveedor: number,
        public apellidoPaterno: string,
        public apellidoMaterno: string,
        public nombres: string,
        public celular: string,
        public correo: string,
        public cargo: string,
        public anotacion1: string,
        public anotacion2: string,
    ){}
}

export type EditarContactoDTO = ContactoDTO
export type CrearContactoDTO = Omit<ContactoDTO, 'codigoContacto'>
export type EliminarContactoDTO = Pick<ContactoDTO, 'codigoContacto'>
