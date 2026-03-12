import { inject, Injectable } from "@angular/core";
import { ProveedorProductoService } from "../services/proveedor-producto.service";
import { ProveedorProductoRepository } from "../../domain/repositories/proveedor-producto.repository";
import { Observable } from "rxjs";
import { ApiResponse } from "@/core/interceptors/error-message.model";
import { DataProveedorProducto, AgregarProveedorProducto, ResponseProveedorProducto, EditarProveedorProducto, EliminarProveedorProducto } from "@/proveedor-producto/domain/models/proveedor-producto.model";

@Injectable({
    providedIn : 'root'
})
export class ProveedorProductoRepositoryImpl implements ProveedorProductoRepository {
    private service = inject(ProveedorProductoService)

    buscarProducto(producto: string): Observable<DataProveedorProducto> {
        return this.service.buscar(producto)
    }
    obtener(): Observable<DataProveedorProducto> {
        return this.service.obtener()
    }
    agregarProveedorProducto(proveedorProducto: AgregarProveedorProducto[]): Observable<ResponseProveedorProducto> {
        return this.service.agregarProveedorProducto(proveedorProducto)
    }
    editarProveedorProducto(editar: EditarProveedorProducto[]): Observable<ApiResponse> {
        return this.service.actualizarProveedorProducto(editar)
    }
    eliminarProveedorProducto(eliminar: EliminarProveedorProducto[]): Observable<ApiResponse> {
        return this.service.eliminarProveedorProducto(eliminar)
    }
    obtenerPorNombreProducto(nombreProducto: string): Observable<DataProveedorProducto> {
        return this.service.obtenerPorNombreProducto(nombreProducto)
    }
}