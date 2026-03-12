export class IniciaSesionGipeo {
    constructor(
        public userName: string,
        public password: string,
        public rol: string,
        public idIndicador: number
    ) { }
}

export class RolGipeo {
    constructor(
        public id: number,
        public descripcion: number
    ) { }
}

export interface BuscarSubtarea {
    tipo: string
    id: number
}

export interface SubTarea {
    datosActividad? : string
    codigoSubTarea: number
    nombreSubTarea: string
    valorPorcentual: number
    rh: number
    rhGasto: number
    rmf: number
    rmfGasto: number
    inv: number
    invGasto: number
    impr: number
    imprGasto: number
    monedaTipo: string
    fechaInicioST: string
    horaInicioST: string
    fechaFinST: string
    horaFinST: string
    fechaRealizacionST: string
    estadoRealizacionST: boolean
    color: string
}

export interface Tarea {
    codigoTarea: number
    nombreTarea: string
    totalSubtareas: number
    stfp: SubTarea[]
}

export interface IndicadorPoa {
    codigoIAPoa: number
    descripcion: string
    tfp: Tarea[]
}

export interface AuthResponse {
    data: IndicadorPoa[]
    isSuccess: boolean
    message: string
}

export interface TreeNode {
    name: string;
    data: any;       // Datos completos del objeto original
    children?: TreeNode[];
}

export interface ResponseGipeo {
    data: boolean;
    errors: any;
    isSuccess: boolean;
    message: string;
}

