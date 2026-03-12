import { Injectable, signal } from "@angular/core";
import { ListarBanco } from "../models/banco.model";
@Injectable({
    providedIn: 'root'
})
export class BancoSignal {
    selectBancoDefault : ListarBanco = {
        idProveedor: 0,
        idBanco: 0,
        nombreBanco: "",
        numeroCuenta: "",
        cci: "",
        cuentaDetraccion: ""
    }

    selectBanco = signal(this.selectBancoDefault)
    listBanco = signal<ListarBanco[]>([])

    actionBanco = signal('')
}