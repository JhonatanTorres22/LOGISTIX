import { AlcanceRepository } from "@/alcance/domain/repository/alcance.repository";
import { inject } from "@angular/core";
import { AlcanceService } from "../services/alcance.service";
import { AgregarAlcance, DataAlcance, EditarAlcance, EliminarAlcance } from "@/alcance/domain/models/alcance.model";
import { Observable } from "rxjs";
import { ApiResponse } from "@/core/interceptors/error-message.model";

export class AlcanceRepositoryImpl implements AlcanceRepository{
    private service = inject(AlcanceService)

    obtener(): Observable<DataAlcance> {
        return this.service.obtener()
    }
    agregar(agregar: AgregarAlcance): Observable<ApiResponse> {
        return this.service.agregar(agregar)
    }
    editar(editar: EditarAlcance): Observable<ApiResponse> {
        return this.service.editar(editar)
    }
    eliminar(eliminar: EliminarAlcance): Observable<ApiResponse> {
        return this.service.eliminar(eliminar)
    }
}