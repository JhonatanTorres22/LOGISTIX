// export type PermisoClave = 'LISTAR' | 'INSERTAR' | 'ACTUALIZAR' | 'ELIMINAR';

// export type PermisosModulo = Record<PermisoClave, string>;

// export type PermisosComputados = Record<PermisoClave, () => boolean>;

export const PERMISOS = {
  PROVEEDOR: {
    LISTAR: 'Listar Proveedor',
    INSERTAR: 'Insertar Proveedor',
    ACTUALIZAR: 'Actualizar Proveedor',
    ELIMINAR: 'Eliminar Proveedor'
  },
  PRODUCTO: {
    LISTAR: 'Buscar Producto',
    INSERTAR: 'Insertar Producto',
    ACTUALIZAR: 'Actualizar Producto',
    ELIMINAR: 'Eliminar Producto'
  },
  PROVEEDORPRODUCTO: {
    LISTAR: 'Listar Producto Proveedor',
    INSERTAR: 'Insertar Producto Proveedor',
  },
  CATEGORIA: {
    LISTAR: 'Listar Categoria',
    INSERTAR: 'Insertar Categoria',
    ACTUALIZAR: 'Actualizar Categoria',
    ELIMINAR: 'Eliminar Categoria',
  },

  USUARIO: {
    LISTAR: 'Listar Usuario',
    INSERTAR: 'Insertar Usuario',
    ACTUALIZAR: 'Actualizar Usuario',
    ELIMINAR: 'Eliminar Usuario',
  },

  SOLICITUDCOMPRA: {
    DOCUMENTACION_PRELIMINAR: 'Documentacion Preliminar',
    VALIDAR_DOCUMENTACION_PRELIMINAR: 'Validar Documentacion Preliminar',
    COTIZACION: 'Cotizacion',
    VALIDAR_COTIZACION: 'Validar Cotizacion',
    ORDEN_COMPRA: 'Orden de Compra',
    VALIDAR_ORDEN_COMPRA: 'Validar Orden de Compra',
    ORDEN_COMPRA_FIRMADA: 'Orden de Compra Firmada',
    VALIDAR_ORDEN_COMPRA_FIRMADA: 'Validar Orden de Compra Firmada',
    CONTRATO: 'Contrato',
    VALIDAR_CONTRATO: 'Validar Contrato',
    CRONOGRAMA: 'Cronograma',
    VALIDAR_CRONOGRAMA: 'Validar Cronograma',
    GUIA_REMISION: 'Guia Remision',
    VALIDAR_GUIA_REMISION: 'Validar Guia Remision',
    ACTA: 'Acta',
    VALIDAR_ACTA: 'Validar Acta',
    EVIDENCIA : 'Evidencia',
    VALIDAR_EVIDENCIA : 'Validar Evidencia',
    CERRAR_PROCESO: 'Cerrar Proceso',
    ESCRITURA : 'Todo Escritura',
    LECTURA: 'Todo Lectura'
  }

} as const;
