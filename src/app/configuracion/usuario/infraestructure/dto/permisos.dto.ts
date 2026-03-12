import { AsignarPermisos } from "../../domain/models/permisos.model"

export interface DataModuloPermisoDTO {
  data: ModuloPermisoDTO[]
  isSuccess: boolean
  message: string
  errors: any
}

export interface ModuloPermisoDTO {
  nombreModulo: string
  roles: RolPermisoDTO[]
}

export interface RolPermisoDTO {
  nombreRol: string
  descripcionRol: string
  permisos: PermisoDTO[]
}

export interface PermisoDTO {
  codigoPermiso: number
  descripcionPermiso: string
}

export interface AsignarPermisosDTO {
  codigoUsuario:number,
  codigoPermiso: number
}

export type EliminarPermisosDTO = AsignarPermisosDTO
