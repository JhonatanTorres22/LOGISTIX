import { Injectable, signal } from "@angular/core";
import { ListarAlmacen } from "../models/almacen.model";

@Injectable({
    providedIn: 'root'
})

export class AlmacenSignal {
    listAlmacen = signal<ListarAlmacen[]>([])
    
}