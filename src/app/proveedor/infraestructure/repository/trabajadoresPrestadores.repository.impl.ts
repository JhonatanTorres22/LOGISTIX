import { TrabajadoresPrestadoresRepository } from "@/proveedor/domain/repositories/trabajadoresPrestadores.repository";
import { inject } from "@angular/core";
import { TrabajadoresPrestadoresService } from "../services/trabajadoresPrestadores.service";
import { AgregarTrabajadoresPrestadores, DataTrabajadoresPrestadores, EditarTrabajadoresPrestadores, EliminarTrabajadoresPrestadores } from "@/proveedor/domain/models/trabajadoresPrestadores.model";
import { Observable } from "rxjs";
import { ApiResponse } from "@/core/interceptors/error-message.model";

export class TrabajadoresPrestadoresRepositoryImpl implements TrabajadoresPrestadoresRepository {
    private service = inject(TrabajadoresPrestadoresService)

    obtener(id: number): Observable<DataTrabajadoresPrestadores> {
        return this.service.obtener(id)
    }

    agregar(agregar: AgregarTrabajadoresPrestadores): Observable<ApiResponse> {
        return this.service.agregar(agregar)
    }
    editar(editar: EditarTrabajadoresPrestadores): Observable<ApiResponse> {
        return this.service.editar(editar)
    }
    eliminar(eliminar: EliminarTrabajadoresPrestadores): Observable<ApiResponse> {
        return this.service.eliminar(eliminar)
    }
}