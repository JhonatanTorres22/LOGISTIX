import { ActualizarArchivo,  AprobarAnexoPorFase, DataAnexosPorFase, EnviarConstanciaFirma, InsertarAnexoPorFase, ObservarAnexoPorFase, ResponseAnexoPorFase } from "@/proceso-compras/domain/models/anexoPorFase.model";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DataAnexosPorFaseDTO } from "../dto/anexoPorFase.dto";
import { AnexosPorFaseMapper } from "@/proceso-compras/domain/mapper/anexoPorFase.mapper";
import { ApiResponse } from "@/core/interceptors/error-message.model";

@Injectable({
  providedIn: 'root'
})

export class AnexoPorFaseService {
  private http = inject(HttpClient)
  private urlApi: string = environment.EndPoint
  private urlListarAnexo: string = '/api/SolicitudCompra/ListarAnexosPorCodigoSubTarea/'
  private urlInsertar: string = '/api/AnexosPorFase/Insertar'
  private urlInsertarAnexoPorFase : string = '/api/AnexosPorFase/InsertarRetorno'
  private urlActualizarArchivo: string = '/api/AnexosPorFase/ActualizarArchivo'
  private urlAprobarAnexo : string = '/api/AnexosPorFase/Aprobar'
  private urlObservarAnexo : string = '/api/AnexosPorFase/Observar'
  private urlEnviarConstanciaFirma : string = '/api/AnexosPorFase/EnviarConstanciaFirma'

  obtenerAnexo = (id: number): Observable<DataAnexosPorFase> => {
    return this.http.get<DataAnexosPorFaseDTO>(this.urlApi + this.urlListarAnexo + id)
      .pipe(map(apiResponse => AnexosPorFaseMapper.toModelData(apiResponse)))
  }

  insertar = (insertar: InsertarAnexoPorFase): Observable<ResponseAnexoPorFase> => {
    const insertarAnexo = AnexosPorFaseMapper.toApiInsertar(insertar)
    return this.http.post<ResponseAnexoPorFase>(this.urlApi + this.urlInsertar, insertarAnexo)
  }

  actualizarArchivo = (formData: FormData): Observable<string> => {
    return this.http.put( this.urlApi + this.urlActualizarArchivo,formData, { responseType: 'text' })
  };

  aprobarAnexo (aprobar : AprobarAnexoPorFase) : Observable<ApiResponse> {
    const aprobarAnexoPorFase = AnexosPorFaseMapper.toApiAprobarAnexo(aprobar)
    return this.http.put<ApiResponse>(this.urlApi + this.urlAprobarAnexo, aprobarAnexoPorFase)
  }

  observarAnexo (observar : ObservarAnexoPorFase) : Observable<ApiResponse>{
    const observarAnexoPorFase = AnexosPorFaseMapper.toObservarAnexo(observar)
    return this.http.put<ApiResponse>(this.urlApi + this.urlObservarAnexo, observarAnexoPorFase)
  }

  enviarConstanciaFirma = (constanciaFirma : EnviarConstanciaFirma): Observable<ApiResponse> => {
    const enviarConstanciaFirma = AnexosPorFaseMapper.toApiEnviarConstancaFirma(constanciaFirma)
    return this.http.post<ApiResponse>(this.urlApi + this.urlEnviarConstanciaFirma, enviarConstanciaFirma)
  }

  insertarAnexoPorFase (insertar : InsertarAnexoPorFase) : Observable<ResponseAnexoPorFase>{
    const insertarAnexo = AnexosPorFaseMapper.toApiInsertar(insertar)
    return this.http.post<ResponseAnexoPorFase>(this.urlApi + this.urlInsertarAnexoPorFase, insertarAnexo)
  }
}