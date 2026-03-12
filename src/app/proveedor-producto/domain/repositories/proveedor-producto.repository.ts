import { Observable } from "rxjs";
import { ApiResponse } from "@/core/interceptors/error-message.model";
import { DataProveedorProducto, AgregarProveedorProducto, ResponseProveedorProducto, EditarProveedorProducto, EliminarProveedorProducto } from "../models/proveedor-producto.model";

export abstract class ProveedorProductoRepository {
    abstract obtener() : Observable<DataProveedorProducto>
    abstract buscarProducto(producto : string) : Observable<DataProveedorProducto>
    abstract agregarProveedorProducto(proveedorProducto : AgregarProveedorProducto[]): Observable<ResponseProveedorProducto>
    abstract editarProveedorProducto(editar : EditarProveedorProducto[]) : Observable<ApiResponse>
    abstract eliminarProveedorProducto(eliminar : EliminarProveedorProducto[]) : Observable<ApiResponse>
    abstract obtenerPorNombreProducto(nombreProducto: string): Observable<DataProveedorProducto>

    
}