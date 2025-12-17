export interface RootMenu {
  nombreRol: string
  menus: Menu[]
}

export interface Menu {
  tituloMenu: string
  urlMenu: string
  iconoMenu: string
  subMenus: SubMenu[]
}

export interface SubMenu {
  tituloSubMenu: string
  urlSubMenu: string
  iconoSubMenu: string
  permisos: Permiso[]
}

export interface Permiso {
  descripcionPermiso: string
}