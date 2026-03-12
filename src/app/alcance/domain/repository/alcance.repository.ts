import { Observable } from "rxjs";
import { AgregarAlcance, DataAlcance, EditarAlcance, EliminarAlcance } from "../models/alcance.model";
import { ApiResponse } from "@/core/interceptors/error-message.model";

export abstract class AlcanceRepository {
    abstract obtener() : Observable<DataAlcance>
    abstract agregar(agregar: AgregarAlcance): Observable<ApiResponse>
    abstract editar(editar: EditarAlcance): Observable<ApiResponse>
    abstract eliminar(eliminar : EliminarAlcance): Observable<ApiResponse>
}