import { Cons } from "rxjs"

export interface DataConsultaRuc {
    data : ConsultaRuc[],
    isSuccess: boolean,
    message: string,
    errors: null
}

export class ConsultaRuc {
    constructor(
        public idConsultaRuc: number,
        public idSunat: number,
        public ruc: string,
        public tipoContribuyente: string,
        public nombreComercial: string,
        public fechaInscripcion: string |null,
        public fechaInicioDeActividades: string | null,
        public estadoContribuyente: string,
        public condicionDelContribuyente: string,
        public direccion: string,
        public sistemaEmisionDeComprobante: string,
        public actividadComercioExterior: string,
        public sistemaContabilidad: string,
        public actividadPrincipal: string,
        public actividadSecundaria: string,
        public comprobantesDePago: string,
        public sistemaDeEmisionElectronica: string,
        public emisorElectronicoDesde: string| null,
        public facturaDesde: string| null,
        public boletaDesde: string| null,
        public afiliadoAlPleDesde: string | null,
        public padrones: string,
    ) { }
}

export type EditarConsultaRUC = Omit<ConsultaRuc, 'archivo'>
export type InsertarConsultaRuc = Omit<EditarConsultaRUC, 'idConsultaRuc'>
export type EliminarConsultaRuc = Pick<ConsultaRuc, 'idConsultaRuc'>