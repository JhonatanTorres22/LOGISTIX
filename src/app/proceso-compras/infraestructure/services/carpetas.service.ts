import { DataCategoriaDTO } from "@/categoria/infraestructure/dto/categoria.model";
import { ApiResponse } from "@/core/interceptors/error-message.model";
import { CarpetasMapper } from "@/proceso-compras/domain/mapper/carpetas.mapper";
import { ActualizarCarpetaConAnexo, DataCarpetas, InsertarCarpetas, InsertarCarpetasConAnexo } from "@/proceso-compras/domain/models/carpetas.models";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable, retry } from "rxjs";
import { environment } from "src/environments/environment";
import { DataCarpetasDTO } from "../dto/carpetas.dto";

@Injectable({
    providedIn : 'root'
})

export class CarpetasService{
    private http = inject(HttpClient)

    private urlApi : string = environment.EndPoint
    private urlListar : string = '/api/Carpeta/ListarPorCodigo/'
    private urlInsertar : string = '/api/Carpeta/Insertar'
    private urlInsertarCarpetaConAnexo : string = '/api/CarpetaConAnexoPorFase/Insertar'
    private urlActualizarCarpeta : string = '/api/CarpetaConAnexoPorFase/Actualizar'
    
    obtenerCarpeta (prefijo : string): Observable<DataCarpetas>  {
        return this.http.get<DataCarpetasDTO>(this.urlApi + this.urlListar + prefijo)
        .pipe(map(api => CarpetasMapper.toDomainData(api)))
    }
    insertarCarpeta (carpeta: InsertarCarpetas) : Observable<ApiResponse> {
        const newCarpeta = CarpetasMapper.toApiInsertar(carpeta)
        return this.http.post<ApiResponse>(this.urlApi + this.urlInsertar, newCarpeta)
    }
    insertarCarpetaConAnexo (carpeta : InsertarCarpetasConAnexo): Observable<ApiResponse> {
        const newCarpetaConAnexo = CarpetasMapper.toApiInsertarCarpetaConAnexo(carpeta) 
        return this.http.post<ApiResponse>(this.urlApi + this.urlInsertarCarpetaConAnexo, newCarpetaConAnexo)
    }
    actualizarCarpetaConAnexo  (carpeta : ActualizarCarpetaConAnexo): Observable<ApiResponse> {
        const editCarpeta = CarpetasMapper.toApiActualizarCarpeta(carpeta)
        return this.http.put<ApiResponse>(this.urlApi + this.urlActualizarCarpeta, editCarpeta)
    }
}