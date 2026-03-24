import { Observable } from "rxjs";
import { ActualizarPagoRealizado, AprobarCronogramaPago, DataComprobantePorCargar, DataCronograma, DataDocTributarioPorAprobar, DataPagosRealizados, EditarCronograma, EliminarCronograma, InsertarCronogramaPago, ObservarCronogramaPago } from "../models/cronograma.model";
import { ApiResponse } from "@/core/interceptors/error-message.model";

export abstract class CronogramaRepository {
   abstract obtenerCronograma(id: number): Observable<DataCronograma>
   abstract insertarCronograma(cronograma: InsertarCronogramaPago[]): Observable<ApiResponse>
   abstract editarCronograma(cronograma: EditarCronograma[]): Observable<ApiResponse>
   abstract eliminarCronograma(cronograma: EliminarCronograma[]): Observable<ApiResponse>
   abstract actualizarComprobanteCronograma(formData: FormData): Observable<string>
   abstract actualizarFacturaCronograma(formData: FormData): Observable<string>
   abstract aprobarCronogramaPago(aprobar : AprobarCronogramaPago): Observable<ApiResponse>
   abstract observarCronogramaPago(observar : ObservarCronogramaPago) : Observable<ApiResponse>
   abstract actualizarInformeProveedor(formData: FormData): Observable<string>
   abstract actualizarInformeResponsable(formData: FormData): Observable<string>
   abstract actualizarDocTributaria(formData: FormData): Observable<string>

   abstract obtenerDocTributarioPorAprobar() : Observable<DataDocTributarioPorAprobar>
   abstract obtenerComprobantePorCargar() : Observable<DataComprobantePorCargar>

   abstract actualizarPagoRealizado(actualizar: ActualizarPagoRealizado) : Observable<ApiResponse>

   /* PAGOS REALIZADOS */
   abstract obtenerPagosRealizados () : Observable<DataPagosRealizados>
}