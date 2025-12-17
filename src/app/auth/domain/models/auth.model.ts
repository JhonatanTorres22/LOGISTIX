export interface DataModulo {
    modulo : Modulo[]
}

export interface Modulo {
    nombre : string,
    roles : Rol[]
}

export interface Rol {
    nombre : string
}

// login.model.ts
export interface LoginModel {
    username: string;
    password: string;
    role: string;
}

export interface AuthData {
    token: string;
    decoded?: DecodedToken;
}

export interface DecodedToken {
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