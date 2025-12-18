import { inject, Injectable } from "@angular/core";
import { CategoriaService } from "../services/categoria.service";
import { Observable } from "rxjs";
import { CategoriaRepository } from "@/categoria/domain/repositories/categoria.repository";
import { ActualizarCategoria, CrearCategoria, DataCategoria, EliminarCategoria, ResponseCategoria } from "@/categoria/domain/models/categoria.model";

@Injectable({
    providedIn: 'root'
})
export class CategoriaRepositoryImpl implements CategoriaRepository  {
    service = inject(CategoriaService)

    obtener(): Observable<DataCategoria> {
        return this.service.obtener()
    }
    crear(categoria: CrearCategoria): Observable<ResponseCategoria> {
        return this.service.crear(categoria)    
    }
    editar(categoria: ActualizarCategoria): Observable<ResponseCategoria> {
        return this.service.editar(categoria)
    }   
    eliminar(categoria: EliminarCategoria): Observable<ResponseCategoria> {
        return this.service.eliminar(categoria)
    }
    constructor() { }
}