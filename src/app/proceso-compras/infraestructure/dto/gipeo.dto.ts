export interface RolGipeoDTO {
    idPerfil : string,
    descripcion : string
}

export interface DataRolGipeoDTO {
    data : RolGipeoDTO[],
    isSuccess: boolean,
    message : string
}

export interface IniciarSesionGipeoDTO {
    rol : string,
    nombreDeUsuario : string,
    contrasenia : string,
    codigoIndicadorActividadDePoa : number
}