import { Observable } from "rxjs";
import { CrearProducto, DataProducto, EditarProducto, EliminarProducto, Producto, ResponseProducto } from "../../domain/models/producto.model";
import { ProductoRepository } from "../../domain/repository/producto.repository";
import { ProductoService } from "../services/producto.service";
import { Injectable } from "@angular/core";
import { DataProductoDTO } from "../dto/producto.dto";

@Injectable({
    providedIn: 'root'
})

export class ProductoRepositoryImpl implements ProductoRepository {
    constructor(
        private service: ProductoService
    ) { }

    obtener (): Observable<DataProducto> {        
        return this.service.obtenerProducto()
    }

    crear (producto: CrearProducto): Observable<ResponseProducto> {
        return this.service.crear(producto)
    }

    editar  (producto: EditarProducto): Observable<ResponseProducto> {
        return this.service.editar(producto)
    }

    eliminar  (producto: EliminarProducto): Observable<ResponseProducto>{
        return this.service.eliminar(producto)
    }
    crearMasivo  (producto: CrearProducto[]): Observable<ResponseProducto> {
        return this.service.crearMasivo(producto)
    }
}