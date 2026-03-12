import { Observable } from "rxjs";
import { AgregarTrabajadoresPrestadores, DataTrabajadoresPrestadores, EditarTrabajadoresPrestadores, EliminarTrabajadoresPrestadores } from "../models/trabajadoresPrestadores.model";
import { ApiResponse } from "@/core/interceptors/error-message.model";

export abstract class TrabajadoresPrestadoresRepository {
    abstract obtener(id : number): Observable<DataTrabajadoresPrestadores>
    abstract agregar(agregar : AgregarTrabajadoresPrestadores) : Observable<ApiResponse>
    abstract editar(editar : EditarTrabajadoresPrestadores) : Observable<ApiResponse>
    abstract eliminar(eliminar : EliminarTrabajadoresPrestadores) : Observable<ApiResponse>
}