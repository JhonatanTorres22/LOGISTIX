import { ApiResponse } from "@/core/interceptors/error-message.model";
import { Observable } from "rxjs";
import { AgregarProductoAlmacen, AumentarCantidadProductoAlmacen, DataProductoPorAlmacen, DisminuirCantidadProductoAlmacen } from "../models/producto-almacen.model";

export abstract class ProductoAlmacenRepository {
    abstract agregarProductoAlmacen(agregarProductoAlmacen : AgregarProductoAlmacen) : Observable<ApiResponse>
    abstract obtenerProductoPorAlmacen(idAlmacen : number, nPagina : number, tamanioPagina: number) : Observable<DataProductoPorAlmacen>
    abstract aumentarCantidadProductoAlmacen(aumentarCantidad : AumentarCantidadProductoAlmacen[]) : Observable<ApiResponse>
    abstract disminuirCantidadProductoAlmacen(disminuirCantidad : DisminuirCantidadProductoAlmacen[]) : Observable<ApiResponse>
}