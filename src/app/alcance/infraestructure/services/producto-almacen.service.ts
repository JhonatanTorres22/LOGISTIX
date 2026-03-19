import { ProductoAlmacenMapper } from "@/alcance/domain/mapper/producto-almacen.mapper";
import { AgregarProductoAlmacen, DataProductoPorAlmacen } from "@/alcance/domain/models/producto-almacen.model";
import { ApiResponse } from "@/core/interceptors/error-message.model";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DataProductoPorAlmacenDTO } from "../dto/producto-almacen.dto";

@Injectable({
    providedIn: 'root'
})

export class ProductoAlmacenService {
    private http = inject(HttpClient)
    private urlApi: string = environment.EndPoint
    private urlAgregarProductoAlmacen: string = '/api/ProductoPorAlmacen/Insertar'
    private urlListarProductoPorAlmacen: string = '/api/ProductoPorAlmacen/ListarPorAlmacenConPaginacion?codigoAlmacen='

    agregarProductoAlmacen(agregarProductoAlmacen: AgregarProductoAlmacen): Observable<ApiResponse> {
        const newProductoAlmacen = ProductoAlmacenMapper.toApiAgregarProductosAlmacen(agregarProductoAlmacen)
        return this.http.post<ApiResponse>(this.urlApi + this.urlAgregarProductoAlmacen, newProductoAlmacen)
    }

    obtenerProductoPorAlmacen (idAlmacen : number, nPagina : number, tamanioPagina: number) : Observable<DataProductoPorAlmacen>{
        return this.http.get<DataProductoPorAlmacenDTO>(this.urlApi + this.urlListarProductoPorAlmacen + idAlmacen + `&numeroDePagina=${nPagina}&tamanioDePagina=${tamanioPagina}`)
        .pipe(map(api => ProductoAlmacenMapper.toDomainDataProductoAlmacen(api)))
    }
}