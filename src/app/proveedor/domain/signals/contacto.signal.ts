import { Injectable, signal } from "@angular/core";
import { Contacto } from "../models/contacto.model";
import { single } from "rxjs";

@Injectable({
    providedIn : 'root'
})

export class ContactoSignal {
    listContactoDefault : Contacto[] = []
    selectContactoDefault : Contacto = {
        idContacto: 0,
        idProveedor: 0,
        apePaterno: "",
        apeMaterno: "",
        nombres: "",
        celular: "",
        correo: "",
        cargo: "",
        anotacion1: "",
        anotacion2: ""
    }
    listContacto = signal(this.listContactoDefault)
    selectContacto = signal(this.selectContactoDefault)

    contactoAction = signal('')

}