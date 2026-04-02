import { ProductoAlmacenMapper } from "@/alcance/domain/mapper/producto-almacen.mapper";
import { ActualizarStockMinimoProductoAlmacen, AgregarProductoAlmacen, AumentarCantidadProductoAlmacen, DataListarProductosConFechaVencimiento, DataProductoPorAlmacen, DisminuirCantidadProductoAlmacen, InsertarFechaVencimientoProductoAlmacen } from "@/alcance/domain/models/producto-almacen.model";
import { ApiResponse } from "@/core/interceptors/error-message.model";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DataListarProductosConFechaVencimientoDTO, DataProductoPorAlmacenDTO } from "../dto/producto-almacen.dto";

@Injectable({
    providedIn: 'root'
})

export class ProductoAlmacenService {
    private http = inject(HttpClient)
    private urlApi: string = environment.EndPoint
    private urlAgregarProductoAlmacen: string = '/api/ProductoPorAlmacen/Insertar'
    private urlListarProductoPorAlmacen: string = '/api/ProductoPorAlmacen/ListarPorAlmacenCompletoConPaginacion?codigoAlmacen='
    private urlAumentarCantidadProductoAlmacen : string = '/api/ProductoPorAlmacen/AumentarCantidad'
    private urlDisminuirCantidadProductoAlmacen : string = '/api/ProductoPorAlmacen/DisminuirCantidad'
    private urlActualizarStockMinimoProductoAlmacen : string = '/api/ProductoPorAlmacen/ActualizarStockMinimo'
    private urlInsertarFechaVencimientoProductoAlmacen : string = '/api/Vencimiento/InsertarMasivo'
    private urlListarProductosConFechaVencimiento : string = '/api/Vencimiento/ListarPorAlmacen/'
    agregarProductoAlmacen(agregarProductoAlmacen: AgregarProductoAlmacen): Observable<ApiResponse> {
        const newProductoAlmacen = ProductoAlmacenMapper.toApiAgregarProductosAlmacen(agregarProductoAlmacen)
        return this.http.post<ApiResponse>(this.urlApi + this.urlAgregarProductoAlmacen, newProductoAlmacen)
    }

    obtenerProductoPorAlmacen (idAlmacen : number, nPagina : number, tamanioPagina: number) : Observable<DataProductoPorAlmacen>{
        return this.http.get<DataProductoPorAlmacenDTO>(this.urlApi + this.urlListarProductoPorAlmacen + idAlmacen + `&numeroDePagina=${nPagina}&tamanioDePagina=${tamanioPagina}`)
        .pipe(map(api => ProductoAlmacenMapper.toDomainDataProductoAlmacen(api)))
    }

    aumentarCantidadProductoAlmacen (aumentarCantidad : AumentarCantidadProductoAlmacen[]) : Observable<ApiResponse>{
        const addCantidades = ProductoAlmacenMapper.toApiAgregarCantidadProductoAlmacen(aumentarCantidad)
        return this.http.put<ApiResponse>(this.urlApi + this.urlAumentarCantidadProductoAlmacen, addCantidades)
    }

    disminuirCantidadProductoAlmacen (disminuirCantidad : DisminuirCantidadProductoAlmacen[]) : Observable<ApiResponse>{
        const deleteCantidades = ProductoAlmacenMapper.toApiDisminuirCantidadProductoAlmacen(disminuirCantidad)
        return this.http.put<ApiResponse>(this.urlApi + this.urlDisminuirCantidadProductoAlmacen, deleteCantidades)
    }

    actualizarStockMinimoProductoAlmacen (actualizarStockMinimo : ActualizarStockMinimoProductoAlmacen[]) : Observable<ApiResponse>{
        const updateStockMinimo = ProductoAlmacenMapper.toApiActualizarStockMinimoProductoAlmacen(actualizarStockMinimo)
        return this.http.put<ApiResponse>(this.urlApi + this.urlActualizarStockMinimoProductoAlmacen, updateStockMinimo)
    }

    insertarFechaVencimientoProductoAlmacen (insertarFechaVencimiento : InsertarFechaVencimientoProductoAlmacen[]) : Observable<ApiResponse>{
        const insertFechaVencimiento = ProductoAlmacenMapper.toInsertarFechaVencimientoProductoAlmacen(insertarFechaVencimiento)
        return this.http.post<ApiResponse>(this.urlApi + this.urlInsertarFechaVencimientoProductoAlmacen, insertFechaVencimiento)
    }

    obtenerProductosConFechaVencimiento (idAlmacen : number) : Observable<DataListarProductosConFechaVencimiento>{
        return this.http.get<DataListarProductosConFechaVencimientoDTO>(this.urlApi + this.urlListarProductosConFechaVencimiento + idAlmacen)
        .pipe(map(api => ProductoAlmacenMapper.toDomainDataListarProductosConFechaVencimiento(api)))
    }
}