import {  DataAlmacen } from "@/alcance/domain/models/almacen.model"
import { AlmacenRepository } from "@/alcance/domain/repository/almacen.repository"
import { inject } from "@angular/core"
import { Observable } from "rxjs"
import { AlmacenService } from "../services/almacen.service"
import { ApiResponse } from "@/core/interceptors/error-message.model"

export class AlmacenRepositoryImpl implements AlmacenRepository {
    private service = inject(AlmacenService)

    obtener(): Observable<DataAlmacen> {
        return this.service.obtener()
    }
}