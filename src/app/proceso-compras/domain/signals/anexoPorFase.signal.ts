import { Injectable, signal } from "@angular/core";
import { AnexoPorFase, Anexos, ArchivoAnexo } from "../models/anexoPorFase.model";

@Injectable({
    providedIn: 'root'
})

export class AnexoPorFaseSignal {
    listAnexoDefault: AnexoPorFase[] = []
    listAnexos = signal(this.listAnexoDefault)
    tieneOrdenCompraConArchivo = signal(false);

    actionAnexo = signal('')


    selectArchivoAnexoDefault : ArchivoAnexo = {
        idAnexosPorFase: 0,
        archivo: "",
        observacion: "",
        estado: 0,
        nombreUsuario: "",
        fechaCreacion: ""
    }

    selectArchivoAnexo = signal(this.selectArchivoAnexoDefault)

    
    selectAnexoDefault : Anexos = {
        idAnexo: 0,
        nombre: "",
        archivos: []
    }
    selectAnexo = signal(this.selectAnexoDefault)

    siglaArea = signal('')

    actionOrdenFirmada = signal('')


    totalPresupuestoProgramado = signal(0)

}