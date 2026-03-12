import { Observable } from "rxjs";
import { AgregarMarca, DataMarca, EditarMarca, EliminarMarca } from "../models/marca.model";
import { ApiResponse } from "@/core/interceptors/error-message.model";

export abstract class MarcaRepository {
    abstract obtenerMarcas(): Observable<DataMarca>;
    abstract agregarMarca(marca: AgregarMarca): Observable<ApiResponse>;
    abstract editarMarca(marca: EditarMarca): Observable<ApiResponse>;
    abstract eliminarMarca(marca: EliminarMarca): Observable<ApiResponse>;
}