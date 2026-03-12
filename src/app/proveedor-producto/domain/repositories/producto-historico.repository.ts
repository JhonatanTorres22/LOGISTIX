import { Observable } from "rxjs";
import { DataBuscarProductoHistorico, GuardarHistorico, LimpiarPreciosProducto } from "../models/producto-historico.model";
import { ApiResponse } from "@/core/interceptors/error-message.model";

export abstract class ProductoHistoricoRepository{
    abstract buscarPrecioHistorico(id : number): Observable<DataBuscarProductoHistorico>
    abstract guardarHistorico(guardar : GuardarHistorico[]) : Observable<ApiResponse>
    abstract limpiarPrecios(limpiar : LimpiarPreciosProducto) : Observable<ApiResponse>
}