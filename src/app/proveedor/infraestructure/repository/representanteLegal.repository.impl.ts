import { RepresentanteLegalRepository } from "@/proveedor/domain/repositories/representanteLegal.repository";
import { inject, Injectable } from "@angular/core";
import { RepresentanteLegalService } from "../services/representanteLegal.service";
import { ApiResponse } from "@/core/interceptors/error-message.model";
import { AgregarRepresentanteLegal, DataRepresentanteLegal, EditarRepresentanteLegal, EliminarRepresentanteLegal } from "@/proveedor/domain/models/representanteLegal.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn : 'root'
})

export class RepresentanteLegalRepositoryImpl implements RepresentanteLegalRepository {
    private service = inject(RepresentanteLegalService)

    obtenerRepresentanteLegal(id: number): Observable<DataRepresentanteLegal> {
        return this.service.obtenerRepresenteLegal(id)
    }
    agregarRepresentanteLegal(agregar: AgregarRepresentanteLegal): Observable<ApiResponse> {
       return this.service.agregarRepresentanteLegal(agregar)
    }

    editarRepresentanteLegal(editar: EditarRepresentanteLegal): Observable<ApiResponse> {
        return this.service.editarRepresentanteLegal(editar)
    }

    eliminarRepresentateLegal(eliminar: EliminarRepresentanteLegal): Observable<ApiResponse> {
        return this.service.eliminarRepresentanteLegal(eliminar)
    }
}