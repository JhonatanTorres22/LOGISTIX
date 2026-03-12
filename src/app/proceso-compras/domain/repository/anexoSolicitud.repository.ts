import { Observable } from "rxjs";
import { ActualizarArchivo,  AprobarAnexoPorFase, DataAnexosPorFase, EnviarConstanciaFirma, InsertarAnexoPorFase, ObservarAnexoPorFase, ResponseAnexoPorFase } from "../models/anexoPorFase.model";
import { ApiResponse } from "@/core/interceptors/error-message.model";


export abstract class AnexoPorFaseRepository {
    abstract obtenerAnexo(codigo: number): Observable<DataAnexosPorFase>
    abstract insertarAnexo(insertar: InsertarAnexoPorFase): Observable<ResponseAnexoPorFase>

    abstract insertarAnexoPorFase(insertar: InsertarAnexoPorFase): Observable<ResponseAnexoPorFase>
    abstract actualizarArchivo(formData: FormData): Observable<string>
    abstract aprobarAnexo(aprobar : AprobarAnexoPorFase): Observable<ApiResponse>
    abstract observarAnexo(observar : ObservarAnexoPorFase) : Observable<ApiResponse>
    abstract enviarConstanciaFirma(enviarConstancia : EnviarConstanciaFirma): Observable<ApiResponse>
}