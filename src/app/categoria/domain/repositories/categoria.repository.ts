import { Observable } from "rxjs";
import { ActualizarCategoria, CrearCategoria, DataCategoria, EliminarCategoria,  ResponseCategoria } from "../models/categoria.model";

export abstract class CategoriaRepository {
    abstract obtener() : Observable<DataCategoria>
    abstract crear(categoria : CrearCategoria): Observable<ResponseCategoria>
    abstract editar(categoria : ActualizarCategoria) : Observable<ResponseCategoria>
    abstract eliminar (categoria : EliminarCategoria) : Observable<ResponseCategoria>
}