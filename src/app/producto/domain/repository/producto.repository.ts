import { Observable } from "rxjs";
import { CrearProducto, DataProducto, EditarProducto, EliminarProducto, Producto, ResponseProducto } from "../models/producto.model";

export abstract class ProductoRepository {
    abstract obtener() : Observable<DataProducto>
    abstract crear(producto : CrearProducto) : Observable<ResponseProducto>
    abstract editar(producto : EditarProducto) : Observable<ResponseProducto>
    abstract eliminar(producto : EliminarProducto) : Observable<ResponseProducto>
    abstract crearMasivo(producto : CrearProducto[]): Observable<ResponseProducto>
}