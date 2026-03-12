import { Observable } from "rxjs";
import { DataOrdenCarpetas, DataSolicitudesComprasCompletas } from "../models/orden-carpeta.model";

export abstract class OrdenCarpetaRepository{
    abstract obtener(id: number) : Observable<DataOrdenCarpetas>
    abstract obtenerTotalSolicitudCompra(id: number): Observable<DataSolicitudesComprasCompletas>
}