import { Injectable, signal } from "@angular/core";
import { BuscarProductoHistorico } from "../models/producto-historico.model";

@Injectable({
    providedIn : 'root'
})

export class ProductoHistoricoSignal {
    listProductoHistorico = signal<BuscarProductoHistorico[]>([])
}