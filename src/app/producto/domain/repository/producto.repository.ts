import { Observable } from "rxjs";
import { CrearProducto, EditarProducto, EliminarProducto, Producto } from "../models/producto.model";
import { DataProductoDTO } from "@/producto/infraestructure/dto/producto.dto";

export abstract class ProductoRespository {
    abstract obtener() : Observable<DataProductoDTO<Producto[]>>
    abstract crear(producto : CrearProducto) : Observable<void>
    abstract editar(producto : EditarProducto) : Observable<void>
    abstract eliminar(producto : EliminarProducto) : Observable<void>
}