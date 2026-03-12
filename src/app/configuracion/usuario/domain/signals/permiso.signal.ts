import { Injectable, signal } from "@angular/core";
import { ModuloPermiso } from "../models/permisos.model";

@Injectable({
    providedIn : 'root'
})

export class PermisoSignal {
    listPermisoDefault : ModuloPermiso[] = []
    listPermiso = signal(this.listPermisoDefault)
}