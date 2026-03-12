import { DataOrdenCarpetas, DataSolicitudesComprasCompletas } from "@/panel-solicitudes/domain/models/orden-carpeta.model";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { DataOrdenCarpetasDTO, DataSolicitudesComprasCompletaDTO } from "../dto/orden-carpeta.dto";
import { environment } from "src/environments/environment";
import { OrdenCarpetaMapper } from "@/panel-solicitudes/domain/mapper/orden-carpeta.mapper";

@Injectable({
    providedIn : 'root'
})

export class OrdenCarpetaService {
    private http = inject(HttpClient)
    private urlApi : string = environment.EndPoint
    private urlListar : string = '/api/AnexosPorFase/ListarPorCarpeta?codigoSolicitudCompra='
    private urlListarTotalSolicitudCompra = '/api/SolicitudCompra/ListarPorUsuario/'
    obtener = (id : number): Observable<DataOrdenCarpetas> => {
        return this.http.get<DataOrdenCarpetasDTO>(this.urlApi + this.urlListar + id)
        .pipe(map(api => OrdenCarpetaMapper.toDomainData(api)))
    }

    obtenerSolicitudCompleta = (id:number):Observable<DataSolicitudesComprasCompletas> => {
        return this.http.get<DataSolicitudesComprasCompletaDTO>(this.urlApi + this.urlListarTotalSolicitudCompra + id)
        .pipe(map(api => OrdenCarpetaMapper.toDomainDataSolicitudCompleta(api)))
    }
}