import { Observable } from "rxjs";
import { AgregarBanco, DataBanco, EditarBanco, EliminarBanco } from "../models/banco.model";
import { ApiResponse } from "@/core/interceptors/error-message.model";

export abstract class BancoRepository {
    abstract obtenerAllBancos():Observable<DataBanco>
    abstract obtenerBanco(id:number): Observable<DataBanco>
    abstract agregarBanco(agregar: AgregarBanco):Observable<ApiResponse>
    abstract editarBanco(editar: EditarBanco): Observable<ApiResponse>
    abstract eliminarBanco(eliminar : EliminarBanco) : Observable<ApiResponse>
}