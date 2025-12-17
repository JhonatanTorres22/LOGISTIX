import { Injectable, signal } from "@angular/core";
import { DataModulo } from "../models/auth.model";


@Injectable({
    providedIn: 'root'
})

export class AuthSignal {
     step = signal<'dni' | 'roles' | 'login'>('dni');
     dni = signal('')
     rol = signal('')

      listaModuloDefault : DataModulo[] = []
     listaModulo = signal(this.listaModuloDefault)
}