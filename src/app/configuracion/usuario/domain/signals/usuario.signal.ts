import { Injectable, signal } from "@angular/core";
import { Usuario } from "../models/usuario.model";

@Injectable({
    providedIn : 'root'
})

export class UsuarioSignal {
    listUsuarioDefault : Usuario[] = []
    selectUsuarioDefault : Usuario = {
        id: 0,
        nombres: "",
        apePaterno: "",
        apMaterno: "",
        correo: "",
        nDocumento: ""
    }

    selectUsuario = signal(this.selectUsuarioDefault)
    listUsuario = signal(this.listUsuarioDefault)

    actionUsuario = signal('')
}