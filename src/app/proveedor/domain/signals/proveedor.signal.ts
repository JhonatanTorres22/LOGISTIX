import { Injectable, signal } from "@angular/core";
import { Proveedor } from "../models/proveedor.model";

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
        evaluacion: false
    }

    proveedorSelect = signal(this.proveedorDefault)
    proveedorList = signal(this.proveedorListDefault)

    proveedorAccion = signal('')

}