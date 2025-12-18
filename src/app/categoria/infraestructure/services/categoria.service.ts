import { ActualizarCategoria, CrearCategoria, DataCategoria, EliminarCategoria,  ResponseCategoria } from "@/categoria/domain/models/categoria.model";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Data } from "@angular/router";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DataCategoriaDTO } from "../dto/categoria.model";
import { CategoriaMapper } from "@/categoria/domain/mappers/categoria.mapper";

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {
    private http = inject(HttpClient)

    private urlApi: string = environment.EndPoint;
    private urlListar: string = '/api/Categoria/Listar';
    private urlAgregar: string = '/api/Categoria/Insertar'
    private urlEditar: string = '/api/Categoria/Actualizar'
    private urlEliminar: string = '/api/Categoria/Eliminar'
    constructor() { }

    obtener = (): Observable<DataCategoria> => {
        return this.http.get<DataCategoriaDTO>(this.urlApi + this.urlListar)
            .pipe(map(apiResponse => CategoriaMapper.toDomainData(apiResponse)));
    }

    crear = (crear : CrearCategoria) :Observable<ResponseCategoria> => {
        const newCategoria = CategoriaMapper.toApiCrear(crear)
        return this.http.post<ResponseCategoria>(this.urlApi + this.urlAgregar, newCategoria)
    }

    editar = (editar : ActualizarCategoria) : Observable<ResponseCategoria> => {
        const editCategoria = CategoriaMapper.toApiEditar(editar)
        return this.http.put<ResponseCategoria>(this.urlApi + this.urlEditar, editCategoria)
    }

    eliminar = (eliminar : EliminarCategoria) : Observable<ResponseCategoria> => {
        const eliminarCategoria = CategoriaMapper.toApiEliminar(eliminar)
        return this.http.delete<ResponseCategoria>(this.urlApi + this.urlEliminar, { body : eliminarCategoria})
    }

}