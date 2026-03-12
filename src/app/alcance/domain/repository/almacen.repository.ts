import { ApiResponse } from "@/core/interceptors/error-message.model";
import { Observable } from "rxjs";
import { DataAlmacen } from "../models/almacen.model";

export abstract class AlmacenRepository {
    abstract obtener() : Observable<DataAlmacen>
    
}