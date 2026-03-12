import { BancoRepository } from "@/proveedor/domain/repositories/banco.repository";
import { inject } from "@angular/core";
import { BancoService } from "../services/banco.service";
import { ApiResponse } from "@/core/interceptors/error-message.model";
import { AgregarBanco, DataBanco, EditarBanco, EliminarBanco } from "@/proveedor/domain/models/banco.model";
import { Observable } from "rxjs";

export class BancoRepositoryImpl implements BancoRepository {
    private service = inject(BancoService)

    obtenerAllBancos(): Observable<DataBanco> {
        return this.service.obtenerAllBancos()
    }

    obtenerBanco(id: number): Observable<DataBanco> {
        return this.service.obtenerBanco(id)
    }

    agregarBanco(agregar: AgregarBanco): Observable<ApiResponse> {
        return this.service.crearBanco(agregar)
    }

    editarBanco(editar: EditarBanco): Observable<ApiResponse> {
        return this.service.editarBanco(editar)
    }

    eliminarBanco(eliminar: EliminarBanco): Observable<ApiResponse> {
        return this.service.eliminarBanco(eliminar)
    }



}