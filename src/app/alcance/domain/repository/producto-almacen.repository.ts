import { ApiResponse } from "@/core/interceptors/error-message.model";
import { Observable } from "rxjs";
import { AgregarProductoAlmacen } from "../models/producto-almacen.model";

export abstract class ProductoAlmacenRepository {
    abstract agregarProductoAlmacen(agregarProductoAlmacen : AgregarProductoAlmacen) : Observable<ApiResponse>
}