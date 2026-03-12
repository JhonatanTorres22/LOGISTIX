import { ProductoAlmacenMapper } from "@/alcance/domain/mapper/producto-almacen.mapper";
import { AgregarProductoAlmacen } from "@/alcance/domain/models/producto-almacen.model";
import { ApiResponse } from "@/core/interceptors/error-message.model";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ProductoAlmacenService {
    private http = inject(HttpClient)
    private urlApi : string = environment.EndPoint
    private urlAgregarProductoAlmacen : string = '/api/ProductoPorAlmacen/Insertar'

        agregarProductoAlmacen(agregarProductoAlmacen : AgregarProductoAlmacen): Observable<ApiResponse> {
        const newProductoAlmacen = ProductoAlmacenMapper.toApiAgregarProductosAlmacen(agregarProductoAlmacen)
        return this.http.post<ApiResponse>(this.urlApi + this.urlAgregarProductoAlmacen, newProductoAlmacen)
    }
}