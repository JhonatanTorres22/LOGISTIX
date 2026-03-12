export interface DataModuloPermiso {
  data: ModuloPermiso[]
  isSuccess: boolean
  message: string
  errors: any
}

export interface ModuloPermiso {
  nombreModulo: string
  roles: RolPermiso[]
}

export interface RolPermiso {
  nombreRol: string
  descripcionRol: string
  permisos: Permiso[]
}

export interface Permiso {
  codigoPermiso: number
  descripcionPermiso: string
}

export interface AsignarPermisos{
  idUsuario : number,
  idPermiso : number
}

export type EliminarPermisos = AsignarPermisos

export interface ResponsePermisos{
  data: boolean;
  errors: any;
  isSuccess: boolean;
  message: string;
}
