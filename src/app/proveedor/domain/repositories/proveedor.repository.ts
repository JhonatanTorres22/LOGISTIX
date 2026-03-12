import { Observable, ObservedValueOf } from "rxjs";
import { ActualizarEvaluacion, CrearProveedor, DataProveedor, EditarProveedor, EliminarProveedor, Proveedor, ResponseProveedor } from "../models/proveedor.model";
import { DataConsultaRuc, EditarConsultaRUC, EliminarConsultaRuc, InsertarConsultaRuc } from "../models/consultaRuc.model";
import { ApiResponse } from "@/core/interceptors/error-message.model";

export abstract class ProveedorRepository {
    abstract obtener() : Observable<DataProveedor>
    abstract crear(proveedor : CrearProveedor): Observable<ResponseProveedor>
    abstract editar(proveedor : EditarProveedor) : Observable<ResponseProveedor>
    abstract eliminar (proveedor : EliminarProveedor) : Observable<ResponseProveedor>
    abstract crearMasivo(proveedores : CrearProveedor[]) : Observable<ResponseProveedor>
    abstract actualizarEvaluacion(evaluacion : ActualizarEvaluacion) : Observable<ApiResponse>

    // CONSULTA RUC
    abstract obtenerConsultaRuc(id:number): Observable<DataConsultaRuc>
    abstract agregarConsultaRuc(agregar : InsertarConsultaRuc) : Observable<ApiResponse>
    abstract editarConsultaRUC(editar : EditarConsultaRUC) : Observable<ApiResponse>
    abstract eliminarConsultaRuc(eliminar : EliminarConsultaRuc) : Observable<ApiResponse>
}