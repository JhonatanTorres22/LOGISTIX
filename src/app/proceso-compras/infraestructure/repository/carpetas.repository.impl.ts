import { CarpetasRepository } from "@/proceso-compras/domain/repository/carpeta.repository";
import { inject } from "@angular/core";
import { CarpetasService } from "../services/carpetas.service";
import { ApiResponse } from "@/core/interceptors/error-message.model";
import { ActualizarCarpetaConAnexo, DataCarpetas, InsertarCarpetas, InsertarCarpetasConAnexo } from "@/proceso-compras/domain/models/carpetas.models";
import { Observable } from "rxjs";

export class CarpetasRepositoryImpl implements CarpetasRepository{
    private service = inject(CarpetasService)

    insertarCarpeta(carpeta: InsertarCarpetas): Observable<ApiResponse> {
        return this.service.insertarCarpeta(carpeta)
    }
    obtenerCarpeta(prefijo: string): Observable<DataCarpetas> {
        return this.service.obtenerCarpeta(prefijo)
    }
    insertarCarpetaConAnexo(carpeta: InsertarCarpetasConAnexo): Observable<ApiResponse> {
        return this.service.insertarCarpetaConAnexo(carpeta)
    }
    actualizarCarpetaConAnexo(carpeta: ActualizarCarpetaConAnexo): Observable<ApiResponse> {
        return this.service.actualizarCarpetaConAnexo(carpeta)
    }
}