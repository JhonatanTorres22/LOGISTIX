import { Injectable, signal } from "@angular/core";
import { DataProductoPorAlmacen, ListarProductoPorAlmacen } from "../models/producto-almacen.model";

@Injectable({
    providedIn: 'root'
})

export class ProductoAlmacenSignal {
    listProductoPorAlmacen = signal<ListarProductoPorAlmacen[]>([])
    dataProductoPorAlmacen = signal<DataProductoPorAlmacen | null>(null)
    totalRegistros = signal<number>(0)
    paginaActual = signal<number>(1)
    tamanioPagina = signal<number>(12)

    actionProductoAlmacen = signal<boolean>(false)
}