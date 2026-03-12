
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";

import { ProductoHistoricoMapper } from "@/proveedor-producto/domain/mappers/producto-historico.mapper";
import { DataBuscarProductoHistorico, GuardarHistorico, LimpiarPreciosProducto } from "@/proveedor-producto/domain/models/producto-historico.model";
import { DataBuscarProductoHistoricoDTO } from "../dto/producto-historico.dto";
import { ApiResponse } from "@/core/interceptors/error-message.model";


@Injectable({
    providedIn : 'root'
})

export class ProductoHistoricoService {
    private http = inject(HttpClient)
    private urlApi : string = environment.EndPoint
    private urlBuscarProductoHistorico : string = '/api/ProveedorProducto/BuscarProductoServicioHistorico/'
    private urlGuardarHistorico : string = '/api/ProveedorProducto/GuardarComoHistorico'
    private urlLimpiarPrecios : string = '/api/ProveedorProducto/LimpiarPreciosPorProveedor'


    buscarProductoHistorico (id: number): Observable<DataBuscarProductoHistorico> {
        return this.http.get<DataBuscarProductoHistoricoDTO>(this.urlApi + this.urlBuscarProductoHistorico + id)
        .pipe(map(api=> ProductoHistoricoMapper.toDomainData(api) ) )

    }

    guardarHistorico(guardar : GuardarHistorico[]):Observable<ApiResponse> {
        const guardarHistorico = ProductoHistoricoMapper.toApiGuardarHistorico(guardar)
        return this.http.post<ApiResponse>(this.urlApi + this.urlGuardarHistorico, guardarHistorico)
    }

        limpiarPrecios (limpiar : LimpiarPreciosProducto) : Observable<ApiResponse>{
        const limpiarPrecios = ProductoHistoricoMapper.toApiLimpiarPrecios(limpiar)
        return this.http.post<ApiResponse>(this.urlApi + this.urlLimpiarPrecios, limpiarPrecios)
    }
}