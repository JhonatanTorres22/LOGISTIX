import { PanelSolicitudesRoutingModule } from "@/panel-solicitudes/panel-solicitudes-routing-module"

export interface DataAnexosPorFase {
    data: AnexoPorFase[]
    isSuccess: boolean
    message: string
    errors: null
}

export interface AnexoPorFase {
    idSolicitudCompra: number,
    tipoGasto: string,
    idSubtarea: number,
    areaResponsable: string,
    codigoPLanTrabajo: string,
    presupuestoProgramado: number,
    total: number,
    fases: FasesAnexos[]
}

export interface FasesAnexos {
    nombre: string,
    anexos: Anexos[]
}
export interface Anexos {
    idAnexo: number,
    nombre: string,
    archivos: ArchivoAnexo[]
}
export interface ArchivoAnexo {
    idAnexosPorFase: number
    archivo: string,
    observacion : string,
    estado : number,
    nombreUsuario: string,
    fechaCreacion : string
}

// OBSERVAR - APROBAR ANEXO POR FASE
export type ObservarAnexoPorFase = Pick<ArchivoAnexo, 'idAnexosPorFase' |'observacion'>
export type AprobarAnexoPorFase = Pick<ArchivoAnexo, 'idAnexosPorFase'>



export interface InsertarAnexoPorFase {
    idSolicitudCompra: number,
    idAnexo: number
}

export interface ActualizarArchivo {
    anexosPorFase_ActualizarArchivo: {
        CodigoAnexosPorFase : number
    },
    archivo: File
}

export interface EnviarConstanciaFirma {
    ordenCompra : string,
    tipoGasto: string,
    areaSolicitante : string,
    nombreSolicitante : string,
    monto : string,
    nombreFirmante: string,
    enlace: string
}

export interface ResponseAnexoPorFase {
     data:  number;
    errors: any;
    isSuccess: boolean;
    message: string;
}