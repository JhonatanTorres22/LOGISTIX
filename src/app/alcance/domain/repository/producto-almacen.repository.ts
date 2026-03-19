import { ApiResponse } from "@/core/interceptors/error-message.model";
import { Observable } from "rxjs";
import { AgregarProductoAlmacen, DataProductoPorAlmacen } from "../models/producto-almacen.model";

export abstract class ProductoAlmacenRepository {
    abstract agregarProductoAlmacen(agregarProductoAlmacen : AgregarProductoAlmacen) : Observable<ApiResponse>
    abstract obtenerProductoPorAlmacen(idAlmacen : number, nPagina : number, tamanioPagina: number) : Observable<DataProductoPorAlmacen>
}