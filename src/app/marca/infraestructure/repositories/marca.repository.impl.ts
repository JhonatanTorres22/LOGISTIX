import { MarcaRepository } from "@/marca/domain/repositories/marca.repository";
import { inject, Inject, Injectable } from "@angular/core";
import { MarcaService } from "../services/marca.service";
import { ApiResponse } from "@/core/interceptors/error-message.model";
import { AgregarMarca, DataMarca, EditarMarca, EliminarMarca } from "@/marca/domain/models/marca.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class MarcaRepositoryImpl implements MarcaRepository {
    private service = inject(MarcaService)
    obtenerMarcas(): Observable<DataMarca> {
        return this.service.obtenerMarca()
    }
    agregarMarca(marca: AgregarMarca): Observable<ApiResponse> {
        return this.service.agregarMarca(marca)
    }
    editarMarca(marca: EditarMarca): Observable<ApiResponse> {
        return this.service.editarMarca(marca)
    }

    eliminarMarca(marca: EliminarMarca): Observable<ApiResponse> {
        return this.service.eliminarMarca(marca)
    }
}