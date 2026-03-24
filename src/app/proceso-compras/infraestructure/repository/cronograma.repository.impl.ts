import { CronogramaRepository } from "@/proceso-compras/domain/repository/cronograma.repository";
import { inject, Injectable } from "@angular/core";
import { CronogramaService } from "../services/cronograma.service";
import { ActualizarPagoRealizado, AprobarCronogramaPago, DataComprobantePorCargar, DataCronograma, DataDocTributarioPorAprobar, DataPagosRealizados, EditarCronograma, EliminarCronograma, InsertarCronogramaPago, ObservarCronogramaPago } from "@/proceso-compras/domain/models/cronograma.model";
import { Observable } from "rxjs";
import { ApiResponse } from "@/core/interceptors/error-message.model";

@Injectable({
    providedIn: 'root'
})

export class CronogramaRepositoryImpl implements CronogramaRepository {
    private service = inject(CronogramaService)

    obtenerCronograma(id: number): Observable<DataCronograma> {
        return this.service.obtenerCronograma(id);
    }
    insertarCronograma(cronograma: InsertarCronogramaPago[]): Observable<ApiResponse> {
        return this.service.insertarCronograma(cronograma)
    }
    editarCronograma(cronograma: EditarCronograma[]): Observable<ApiResponse> {
        return this.service.editarCronograma(cronograma)
    }
    eliminarCronograma(cronograma: EliminarCronograma[]): Observable<ApiResponse> {
        return this.service.eliminarCronograma(cronograma)
    }
    actualizarComprobanteCronograma(formData: FormData): Observable<string> {
        return this.service.actualizarComprobanteCronograma(formData)
    }
    actualizarFacturaCronograma(formData: FormData): Observable<string> {
        return this.service.actualizarFacturaCronograma(formData)
    }
    aprobarCronogramaPago(aprobar: AprobarCronogramaPago): Observable<ApiResponse> {
        return this.service.aprobarCronogramaPago(aprobar)
    }
    observarCronogramaPago(observar: ObservarCronogramaPago): Observable<ApiResponse> {
        return this.service.observarCronogramaPago(observar)
    }
    actualizarDocTributaria(formData: FormData): Observable<string> {
        return this.service.actualizarDocTributario(formData)
    }
    actualizarInformeProveedor(formData: FormData): Observable<string> {
        return this.service.actualizarInformeProveedor(formData);
    }
    actualizarInformeResponsable(formData: FormData): Observable<string> {
       return this.service.actualizarInformeResponsable(formData)
    }

    
    obtenerDocTributarioPorAprobar(): Observable<DataDocTributarioPorAprobar> {
        return this.service.obtenerDocTributarioPorAprobar()
    }
    obtenerComprobantePorCargar(): Observable<DataComprobantePorCargar> {
        return this.service.obtenerComprobantePorCargar()
    }

    /*PAGOS REALIZADOS */
    actualizarPagoRealizado(actualizar: ActualizarPagoRealizado): Observable<ApiResponse> {
        return this.service.actualizarPagoRealizado(actualizar)
    }
    obtenerPagosRealizados(): Observable<DataPagosRealizados> {
        return this.service.obtenerPagosRealizados()
    }
}