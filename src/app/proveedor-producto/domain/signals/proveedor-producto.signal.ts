import { Injectable, signal } from "@angular/core";
import { ProveedorProducto } from "../models/proveedor-producto.model";

@Injectable({
    providedIn : 'root'
})

export class ProveedorProductoSignal {
    listProveedorProductoDefault : ProveedorProducto[] = []
    listProveedorProducto = signal(this.listProveedorProductoDefault)

    selectProveedorProducto = signal<any[]>([])

    listProveedorProductoUnificado = signal<any[]>([])

    selectProveedorProductoEditar = signal<any | null>(null)
}