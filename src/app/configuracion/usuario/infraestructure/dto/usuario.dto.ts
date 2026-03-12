export interface UsuarioDTO {
    codigo : number,
    nombres: string,
    apellidoPaterno : string,
    apellidoMaterno : string,
    correo : string,
    numeroDocumento : string
}

export interface DataUsuarioDTO {
      data: UsuarioDTO[]
      isSuccess: boolean
      message: string
      errors: any
}

export type CrearUsuarioDTO = Omit<UsuarioDTO, 'codigo'>
export type EditarUsuarioDTO = UsuarioDTO
export type EliminarUsuarioDTO = Pick<UsuarioDTO, 'codigo'>