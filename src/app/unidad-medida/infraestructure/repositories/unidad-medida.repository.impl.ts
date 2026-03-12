import { UnidadMedidaRepository } from "@/unidad-medida/domain/repositories/unidad-medida.repository";
import { inject, Injectable } from "@angular/core";
import { UnidadMedidaService } from "../services/unidad-medida.service";
import { AgregarUnidadMedida, DataUnidadMedida, EditarUnidadMedida } from "@/unidad-medida/domain/models/unidad-medida.model";
import { Observable } from "rxjs";
import { ResponseProveedorProducto } from "@/proveedor-producto/domain/models/proveedor-producto.model";
import { ApiResponse } from "@/core/interceptors/error-message.model";

@Injectable({
    providedIn: 'root'
})
export class UnidadMedidaRepositoryImpl implements UnidadMedidaRepository{
    private service = inject(UnidadMedidaService)

    obtener(): Observable<DataUnidadMedida> {
        return this.service.obtenerUnidadMedida()
    }

    agregarUnidadMedida(unidadMedida: AgregarUnidadMedida): Observable<ApiResponse> {
        return this.service.agregarUnidadMedida(unidadMedida)
    }

    editarUnidadMedida(unidadMedida: EditarUnidadMedida): Observable<ApiResponse> {
        return this.service.editarUnidadMedida(unidadMedida)
    }

    eliminarUnidadMedida(unidadMedida: EditarUnidadMedida): Observable<ApiResponse> {
        return this.service.eliminarUnidadMedida(unidadMedida)
    }
}