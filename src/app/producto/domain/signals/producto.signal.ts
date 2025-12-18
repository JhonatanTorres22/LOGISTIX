import { Injectable, signal } from "@angular/core";
import { Producto } from "../models/producto.model";

@Injectable({
    providedIn: 'root'
})

export class ProductoSignal  {
    productoListDefault : Producto[] = []
    productoDefault : Producto = {
        id: 0,
        nombreProducto: "",
        modeloProducto: "",
        descripcionProducto: "",
        unidad: "",
        precioReferencial: 0
    }

    productoSelect = signal(this.productoDefault)
    productoList = signal(this.productoListDefault)
}