
import { inject } from "@angular/core";
import { ProductoHistoricoService } from "../services/producto-historico.service";

import { Observable } from "rxjs";
import { ProductoHistoricoRepository } from "@/proveedor-producto/domain/repositories/producto-historico.repository";
import { DataBuscarProductoHistorico, GuardarHistorico, LimpiarPreciosProducto } from "@/proveedor-producto/domain/models/producto-historico.model";
import { ApiResponse } from "@/core/interceptors/error-message.model";

export class ProductoHistoricoRepositoryImpl implements ProductoHistoricoRepository {
    private service = inject(ProductoHistoricoService)

    buscarPrecioHistorico(id: number): Observable<DataBuscarProductoHistorico> {
        return this.service.buscarProductoHistorico(id)
    }

    guardarHistorico(guardar: GuardarHistorico[]): Observable<ApiResponse> {
        return this.service.guardarHistorico(guardar)
    }

    limpiarPrecios(limpiar: LimpiarPreciosProducto): Observable<ApiResponse> {
        return this.service.limpiarPrecios(limpiar)
    }
}