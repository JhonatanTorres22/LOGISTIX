
import { AnexoPorFaseRepository } from "@/proceso-compras/domain/repository/anexoSolicitud.repository";
import { inject, Injectable } from "@angular/core";
import { AnexoPorFaseService } from "../services/anexoPorFase.service";

import { Observable } from "rxjs";
import { ActualizarArchivo,  AprobarAnexoPorFase, DataAnexosPorFase, EnviarConstanciaFirma, InsertarAnexoPorFase, ObservarAnexoPorFase, ResponseAnexoPorFase } from "@/proceso-compras/domain/models/anexoPorFase.model";
import { ApiResponse } from "@/core/interceptors/error-message.model";

@Injectable({
    providedIn: 'root'
})

export class AnexoPorFaseRepositoryImpl implements AnexoPorFaseRepository {
    private service = inject(AnexoPorFaseService)

    obtenerAnexo(codigo: number): Observable<DataAnexosPorFase> {
        return this.service.obtenerAnexo(codigo)
    }
    insertarAnexo(insertar: InsertarAnexoPorFase): Observable<ResponseAnexoPorFase> {
        return this.service.insertar(insertar)
    }
    insertarAnexoPorFase(insertar: InsertarAnexoPorFase): Observable<ResponseAnexoPorFase> {
        return this.service.insertarAnexoPorFase(insertar)
    }
    actualizarArchivo(formData: FormData): Observable<string> {
        return this.service.actualizarArchivo(formData)
    }
    aprobarAnexo(aprobar: AprobarAnexoPorFase): Observable<ApiResponse> {
        return this.service.aprobarAnexo(aprobar)
    }
    observarAnexo(observar: ObservarAnexoPorFase): Observable<ApiResponse> {
        return this.service.observarAnexo(observar)
    }
    enviarConstanciaFirma(enviarConstancia: EnviarConstanciaFirma): Observable<ApiResponse> {
        return this.service.enviarConstanciaFirma(enviarConstancia)
    }
}