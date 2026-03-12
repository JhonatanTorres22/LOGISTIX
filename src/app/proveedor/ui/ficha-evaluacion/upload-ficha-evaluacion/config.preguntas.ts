export const EXAMENES_CONFIG: any = {

  RUC: {
    campos: [
      { key: 'razonSocial', label: 'Razón social', tipo: 'text' },
      { key: 'estado', label: 'Estado del contribuyente', tipo: 'dropdown',
        opciones: ['ACTIVO', 'SUSPENDIDO', 'BAJA'] }
    ]
  },

  TRABAJADORES: {
    campos: [
      { key: 'cantidad', label: 'Cantidad de trabajadores', tipo: 'number' },
      { key: 'planilla', label: 'En planilla', tipo: 'checkbox' }
    ]
  },

  DEUDA: {
    campos: [
      { key: 'tieneDeuda', label: '¿Tiene deuda?', tipo: 'checkbox' },
      { key: 'monto', label: 'Monto de deuda', tipo: 'number' }
    ]
  },

  REPRESENTANTES: {
    campos: [
      { key: 'nombre', label: 'Nombre del representante', tipo: 'text' },
      { key: 'dni', label: 'DNI', tipo: 'text' }
    ]
  }

};
