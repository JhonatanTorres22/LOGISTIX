export interface DataConsultaRucDTO {
    data : ConsultaRucDTO[],
    isSuccess: boolean,
    message: string,
    errors: null
}

export interface ConsultaRucDTO {
    codigoConsultaRuc: number,
    codigoSunat: number,
    numeroRuc: string,
    tipoContribuyente: string,
    nombreComercial: string,
    fechaInscripcion: string | null,
    fechaInicioDeActividades: string | null,
    estadoContribuyente: string,
    condicionDelContribuyente: string,
    domicilioFiscal: string,
    sistemaEmisionDeComprobante: string,
    actividadComercioExterior: string,
    sistemaContabilidad: string,
    actividadPrincipal: string,
    actividadSecundaria: string,
    comprobantesDePago: string,
    sistemaDeEmisionElectronica: string,
    emisorElectronicoDesde: string  | null,
    facturaDesde: string | null,
    boletaDesde: string | null,
    afiliadoAlPleDesde: string | null,
    padrones: string
}

export type EditarConsultaRucDTO = ConsultaRucDTO
export type InsertarConsultaRucDTO = Omit<EditarConsultaRucDTO, 'codigoConsultaRuc'>
export type EliminarConsultaRucDTO = Pick<ConsultaRucDTO, 'codigoConsultaRuc'>