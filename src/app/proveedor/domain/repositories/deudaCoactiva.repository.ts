import { Observable } from "rxjs";
import { AgregarDeudaCoactiva, DataDeudaCoactiva, EditarDeudaCoactiva, EliminarDeudaCoactiva } from "../models/deudaCoactiva.model";
import { ApiResponse } from "@/core/interceptors/error-message.model";

export abstract class DeudaCoactivaRepository {
    abstract obtenerDeudaCoactiva(id : number) : Observable<DataDeudaCoactiva>
    abstract agregarDeudaCoactiva(agregar : AgregarDeudaCoactiva) : Observable<ApiResponse>
    abstract editarDeudaCoactiva(editar : EditarDeudaCoactiva) : Observable<ApiResponse>
    abstract eliminarDeudaCoactiva(eliminar : EliminarDeudaCoactiva) : Observable<ApiResponse>
}