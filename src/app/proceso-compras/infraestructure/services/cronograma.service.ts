import { AprobarCronogramaPago, DataComprobantePorCargar, DataCronograma, DataDocTributarioPorAprobar, EditarCronograma, EliminarCronograma, InsertarCronogramaPago, ObservarCronogramaPago } from "@/proceso-compras/domain/models/cronograma.model";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DataComprobantePorCargarDTO, DataCronogramaDTO, DataDocTributarioPorAprobarDTO } from "../dto/cronograma.dto";
import { ApiResponse } from "@/core/interceptors/error-message.model";
import { CronogramaMapper } from "@/proceso-compras/domain/mapper/cronograma.mapper";

@Injectable({
  providedIn: 'root'
})

export class CronogramaService {
  private http = inject(HttpClient)
  private urlApi: string = environment.EndPoint
  private urlListarCronograma: string = '/api/CronogramaPagoProveedor/ListarPorCodigoAnexoPorFase/'
  private urlInsertarCronograma: string = '/api/CronogramaPagoProveedor/Insertar'
  private urlEliminarCronograma: string = '/api/CronogramaPagoProveedor/Eliminar'
  private urlEditarCronograma: string = '/api/CronogramaPagoProveedor/ActualizarMasivo'
  private urlActualizarComprobanteCronograma: string = '/api/CronogramaPagoProveedor/ActualizarComprobante'
  private urlActualizarFacturaCronograma: string = '/api/CronogramaPagoProveedor/ActualizarFactura'
  private urlObservarCronogramaPago: string = '/api/CronogramaPagoProveedor/Observar'
  private urlAprobarCronogramaPago: string = '/api/CronogramaPagoProveedor/Aprobar'
  private urlActualizarInformeProveedor: string = '/api/CronogramaPagoProveedor/ActualizarInformeProveedor'
  private urlActualizarInformeResponsable: string = '/api/CronogramaPagoProveedor/ActualizarInformeResponsable'
  private urlActualizarDocTributario: string = '/api/CronogramaPagoProveedor/ActualizarDocumentoTributario'

  private urlListarDocTributarioPorAprobar : string = '/api/CronogramaPagoProveedor/DocumentosTributariosPorAprobar'
  private urlListarComprobantePorCargar : string = '/api/CronogramaPagoProveedor/ComprobantesPorCargar'

  obtenerCronograma = (id: number): Observable<DataCronograma> => {
    return this.http.get<DataCronogramaDTO>(this.urlApi + this.urlListarCronograma + id)
      .pipe(map(api => CronogramaMapper.toDomainData(api)))
  }
  insertarCronograma = (cronograma: InsertarCronogramaPago[]): Observable<ApiResponse> => {
    const newcronograma = CronogramaMapper.toApiInsertarCronogramaPago(cronograma)
    return this.http.post<ApiResponse>(this.urlApi + this.urlInsertarCronograma, newcronograma)
  }
  editarCronograma = (cronograma: EditarCronograma[]): Observable<ApiResponse> => {
    const editCronograma = CronogramaMapper.toApiEditarCronograma(cronograma)
    return this.http.put<ApiResponse>(this.urlApi + this.urlEditarCronograma, editCronograma)
  }
  eliminarCronograma = (cronograma: EliminarCronograma[]): Observable<ApiResponse> => {
    const eliminarCronograma = CronogramaMapper.toApiEliminarCronograma(cronograma)
    return this.http.delete<ApiResponse>(this.urlApi + this.urlEliminarCronograma, { body: eliminarCronograma })
  }

  actualizarComprobanteCronograma = (formData: FormData): Observable<string> => {
    return this.http.put(this.urlApi + this.urlActualizarComprobanteCronograma, formData, { responseType: 'text' })
  }


  actualizarFacturaCronograma = (formData: FormData): Observable<string> => {
    return this.http.put(this.urlApi + this.urlActualizarFacturaCronograma, formData, { responseType: 'text' })
  }

  actualizarDocTributario = (formData: FormData): Observable<string> => {
    return this.http.put(this.urlApi + this.urlActualizarDocTributario, formData, { responseType: 'text' })
  }

  actualizarInformeProveedor = (formData: FormData): Observable<string> => {
    return this.http.put(this.urlApi + this.urlActualizarInformeProveedor, formData, { responseType: 'text' })
  }
  
  actualizarInformeResponsable = (formData: FormData): Observable<string> => {
    return this.http.put(this.urlApi + this.urlActualizarInformeResponsable, formData, { responseType: 'text' })
  }

  aprobarCronogramaPago = (aprobar: AprobarCronogramaPago): Observable<ApiResponse> => {
    const aprobarCronograma = CronogramaMapper.toApiAprobarCronogramaPago(aprobar)
    return this.http.put<ApiResponse>(this.urlApi + this.urlAprobarCronogramaPago, aprobarCronograma)
  }

  observarCronogramaPago = (observar: ObservarCronogramaPago): Observable<ApiResponse> => {
    const observarCronograma = CronogramaMapper.toApiObservarCronogramaPago(observar)
    return this.http.put<ApiResponse>(this.urlApi + this.urlObservarCronogramaPago, observarCronograma)
  }

  obtenerDocTributarioPorAprobar = (): Observable<DataDocTributarioPorAprobar> => {
    return this.http.get<DataDocTributarioPorAprobarDTO>(this.urlApi + this.urlListarDocTributarioPorAprobar)
      .pipe(map(api => CronogramaMapper.toDomainDataDocumentoTributarioPorAprobar(api)))
  }

  obtenerComprobantePorCargar = (): Observable<DataComprobantePorCargar> => {
    return this.http.get<DataComprobantePorCargarDTO>(this.urlApi + this.urlListarComprobantePorCargar)
      .pipe(map(api => CronogramaMapper.toDomainDataComprobantePorCargar(api)))
  }
}
