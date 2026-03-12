import { Injectable, signal } from "@angular/core";
import { Proveedor } from "../models/proveedor.model";
import { ConsultaRuc } from "../models/consultaRuc.model";

@Injectable({
    providedIn: 'root'
})

export class ProveedorSignal {
    proveedorListDefault : Proveedor[] = []
    proveedorDefault : Proveedor = {
        id: 0,
        tipo: "",
        nombre: "",
        ruc: "",
        direccion: "",
        evaluacion: ""
    }

    proveedorSelect = signal(this.proveedorDefault)
    proveedorList = signal(this.proveedorListDefault)

    proveedorAccion = signal('')

    selectConsultaRucDefault : ConsultaRuc = {
        idConsultaRuc: 0,
        idSunat: 0,
        ruc: "",
        tipoContribuyente: "",
        nombreComercial: "",
        fechaInscripcion: "",
        fechaInicioDeActividades: "",
        estadoContribuyente: "",
        condicionDelContribuyente: "",
        direccion: "",
        sistemaEmisionDeComprobante: "",
        actividadComercioExterior: "",
        sistemaContabilidad: "",
        actividadPrincipal: "",
        actividadSecundaria: "",
        comprobantesDePago: "",
        sistemaDeEmisionElectronica: "",
        emisorElectronicoDesde: "",
        facturaDesde: "",
        boletaDesde: "",
        afiliadoAlPleDesde: "",
        padrones: ""
    }

    listConsultaRuc = signal<ConsultaRuc[]>([])
    selectConsultaRuc = signal(this.selectConsultaRucDefault)
    actionConsultaRuc = signal('')


}