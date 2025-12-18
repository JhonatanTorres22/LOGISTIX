import { Observable } from "rxjs";
import { CrearProducto, EditarProducto, EliminarProducto, Producto } from "../../domain/models/producto.model";
import { ProductoRespository } from "../../domain/repository/producto.repository";
import { ProductoService } from "../services/producto.service";
import { Injectable } from "@angular/core";
import { DataProductoDTO } from "../dto/producto.dto";

@Injectable({
    providedIn: 'root'
})

export class ProductoRepositoryImpl implements ProductoRespository {
    constructor(
        private service: ProductoService
    ) { }

    obtener(): Observable<DataProductoDTO<Producto[]>> {
        return this.service.obtenerProducto()
    }

    crear(producto: CrearProducto): Observable<void> {
        return this.service.crear(producto)
    }

    editar(producto: EditarProducto): Observable<void> {
        return this.service.editar(producto)
    }

    eliminar(producto: EliminarProducto): Observable<void> {
        return this.service.eliminar(producto)
    }
}