import { Observable } from "rxjs";
import { AgregarRepresentanteLegal, DataRepresentanteLegal, EditarRepresentanteLegal, EliminarRepresentanteLegal } from "../models/representanteLegal.model";
import { ApiResponse } from "@/core/interceptors/error-message.model";

export abstract class RepresentanteLegalRepository {
    abstract obtenerRepresentanteLegal (id : number) : Observable<DataRepresentanteLegal>
    abstract agregarRepresentanteLegal (agregar : AgregarRepresentanteLegal) : Observable<ApiResponse>
    abstract editarRepresentanteLegal (editar : EditarRepresentanteLegal) : Observable<ApiResponse>
    abstract eliminarRepresentateLegal (eliminar : EliminarRepresentanteLegal) : Observable<ApiResponse>
}