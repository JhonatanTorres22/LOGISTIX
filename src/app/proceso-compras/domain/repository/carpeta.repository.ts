import { Observable } from "rxjs";
import { ActualizarCarpetaConAnexo, DataCarpetas, InsertarCarpetas, InsertarCarpetasConAnexo } from "../models/carpetas.models";
import { ApiResponse } from "@/core/interceptors/error-message.model";

export abstract class CarpetasRepository {
    abstract obtenerCarpeta(prefijo : string): Observable<DataCarpetas>
    abstract insertarCarpeta(carpeta: InsertarCarpetas): Observable<ApiResponse>
    abstract actualizarCarpetaConAnexo(carpeta: ActualizarCarpetaConAnexo): Observable<ApiResponse>
    abstract insertarCarpetaConAnexo(carpeta: InsertarCarpetasConAnexo) : Observable<ApiResponse>
}