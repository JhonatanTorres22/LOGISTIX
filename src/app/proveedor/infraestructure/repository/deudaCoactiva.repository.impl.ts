import { DeudaCoactivaRepository } from "@/proveedor/domain/repositories/deudaCoactiva.repository";
import { inject, Injectable } from "@angular/core";
import { DeudaCoactivaService } from "../services/deudaCoactiva.service";
import { AgregarDeudaCoactiva, DataDeudaCoactiva, EditarDeudaCoactiva, EliminarDeudaCoactiva } from "@/proveedor/domain/models/deudaCoactiva.model";
import { Observable } from "rxjs";
import { ApiResponse } from "@/core/interceptors/error-message.model";
@Injectable({
    providedIn : 'root'
})
export class DeudaCoactivaRepositoryImpl implements DeudaCoactivaRepository{
    private service = inject(DeudaCoactivaService)

    obtenerDeudaCoactiva(id: number): Observable<DataDeudaCoactiva> {
        return this.service.obtenerDeudaCoactiva(id)
    }
    agregarDeudaCoactiva(agregar: AgregarDeudaCoactiva): Observable<ApiResponse> {
        return this.service.agregarDeudaCoactiva(agregar)
    }

    editarDeudaCoactiva(editar: EditarDeudaCoactiva): Observable<ApiResponse> {
        return this.service.editarDeudaCoactiva(editar)
    }

    eliminarDeudaCoactiva(eliminar: EliminarDeudaCoactiva): Observable<ApiResponse> {
        return this.service.eliminarDeudaCoactiva(eliminar)
    }
}