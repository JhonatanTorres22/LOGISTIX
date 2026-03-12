export interface Usuario {
    id: number,
    nombres: string,
    apePaterno : string,
    apMaterno : string,
    correo: string,
    nDocumento : string
}

export interface DataUsuario {
  data: Usuario[]
  isSuccess: boolean
  message: string
  errors: any
}
export interface ResponseUsuario {
   data: boolean;
  errors: any;
  isSuccess: boolean;
  message: string;
}

export type CrearUsuario = Omit<Usuario, 'id'>
export type EditarUsuario = Usuario
export type EliminarUsuario = Pick<Usuario, 'id'>