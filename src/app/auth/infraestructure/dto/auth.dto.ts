export interface DataModuloRolDTO {
     data: DataModuloDTO[]
  isSuccess: boolean
  message: string
  errors: null
}
export interface DataModuloDTO {
    modulos : ModuloDTO[]
}

export interface ModuloDTO {
    nombreModulo : string,
    roles : RolDTO[]
}

export interface RolDTO {
    nombreRol : string
}

export interface LoginRequestDTO {
    nombreUsuario: string;
    contrasenia: string;
    rol: string;
}

export interface LoginResponseDTO {
    data: {
        token: string;
    };
    isSuccess: boolean;
    message: string;
    errors: any;
}

export interface DecodedTokenDTO {
    codigoUsuario: string;
    apellidosyNombres: string;
    correo: string;
    role: string;
    permission: string;
    jti: string;
    rt: string;
    nbf: number;
    exp: number;
    iat: number;
    iss: string;
    aud: string;
}