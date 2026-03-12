import { Observable } from "rxjs";
import { AgregarUnidadMedida, DataUnidadMedida, EditarUnidadMedida, EliminarUnidadMedida } from "../models/unidad-medida.model";
import { ApiResponse } from "@/core/interceptors/error-message.model";
import { ResponseProveedorProducto } from "@/proveedor-producto/domain/models/proveedor-producto.model";

export abstract class UnidadMedidaRepository {
    abstract obtener() : Observable<DataUnidadMedida>
    abstract agregarUnidadMedida(unidadMedida : AgregarUnidadMedida) : Observable<ApiResponse>
    abstract editarUnidadMedida(unidadMedida : EditarUnidadMedida) : Observable<ApiResponse>
    abstract eliminarUnidadMedida(unidadMedida : EliminarUnidadMedida) : Observable<ApiResponse>
}