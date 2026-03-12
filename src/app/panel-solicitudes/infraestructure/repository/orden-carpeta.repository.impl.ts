import { DataOrdenCarpetas, DataSolicitudesComprasCompletas, OrdenCarpetas } from "@/panel-solicitudes/domain/models/orden-carpeta.model";
import { OrdenCarpetaRepository } from "@/panel-solicitudes/domain/repository/orden-carpeta.repository";
import { inject } from "@angular/core";
import { OrdenCarpetaService } from "../services/orden-carpeta.service";
import { Observable } from "rxjs";

export class OrdenCarpetaRepositoryImpl implements OrdenCarpetaRepository{
    private service = inject(OrdenCarpetaService)

    obtener(id : number): Observable<DataOrdenCarpetas> {
        return this.service.obtener(id)
    }
    obtenerTotalSolicitudCompra(id: number): Observable<DataSolicitudesComprasCompletas> {
        return this.service.obtenerSolicitudCompleta(id)
    }

}