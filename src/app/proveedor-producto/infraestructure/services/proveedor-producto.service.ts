import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DataProveedorProductoDTO } from "../dto/proveedor-producto.dto";
import { ProveedorProductoMapper } from "../../domain/mappers/proveedor-producto.mapper";
import { Proveedor } from "@/proveedor/domain/models/proveedor.model";
import { ApiResponse } from "@/core/interceptors/error-message.model";
import { AgregarProveedorProducto, DataProveedorProducto, EditarProveedorProducto, EliminarProveedorProducto, ResponseProveedorProducto } from "@/proveedor-producto/domain/models/proveedor-producto.model";
import { LimpiarPreciosProducto } from "@/proveedor-producto/domain/models/producto-historico.model";

@Injectable({
    providedIn: 'root'
})

export class ProveedorProductoService {
    private urlApi: string = environment.EndPoint
    private urlListar: string = '/api/ProveedorProducto/Listar'
    private urlBuscarProducto: string = '/api/Producto/Buscar?valor='
    private urlInsertarProveedorProducto: string = '/api/ProveedorProducto/Insertar'
    private urlEditarProveedorProducto: string = '/api/ProveedorProducto/ActualizarMasivo'
    private urlEliminarProveedorProducto: string = '/api/ProveedorProducto/EliminarMasivo'
    private urlListarPorNombreProducto: string = '/api/ProveedorProducto/ListarPorNombre/'

    constructor(
        private http: HttpClient
    ) { }

    obtener(): Observable<DataProveedorProducto> {
        return this.http.get<DataProveedorProductoDTO>(this.urlApi + this.urlListar)
            .pipe(map(ProveedorProductoMapper.toApiDomain))
    }

    buscar(producto: string): Observable<DataProveedorProducto> {
        return this.http.get<DataProveedorProductoDTO>(this.urlApi + this.urlBuscarProducto + producto)
            .pipe(map(ProveedorProductoMapper.toApiDomain))
    }

    agregarProveedorProducto(agregar: AgregarProveedorProducto[]): Observable<ResponseProveedorProducto> {
        const newProveedorProducto = ProveedorProductoMapper.toApiAgregar(agregar)
        return this.http.post<ResponseProveedorProducto>(this.urlApi + this.urlInsertarProveedorProducto, newProveedorProducto)
    }

    actualizarProveedorProducto(actualizar: EditarProveedorProducto[]): Observable<ApiResponse> {
        const editProveedorProducto = ProveedorProductoMapper.toApiEditar(actualizar)
        return this.http.put<ApiResponse>(this.urlApi + this.urlEditarProveedorProducto, editProveedorProducto)
    }

    eliminarProveedorProducto(eliminar: EliminarProveedorProducto[]): Observable<ApiResponse> {
        const eliminarProveedorProducto = ProveedorProductoMapper.toApiEliminar(eliminar)
        return this.http.request<ApiResponse>('delete', this.urlApi + this.urlEliminarProveedorProducto, { body: eliminarProveedorProducto })
    }

    obtenerPorNombreProducto(nombreProducto: string): Observable<DataProveedorProducto> {
        return this.http.get<DataProveedorProductoDTO>(this.urlApi + this.urlListarPorNombreProducto + nombreProducto)
            .pipe(map(ProveedorProductoMapper.toApiDomain))
    }

}