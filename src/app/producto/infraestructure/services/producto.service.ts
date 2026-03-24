import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CrearProducto, DataProducto, DataProductosNoValidosDTO, EditarProducto, EliminarProducto, Producto, ResponseProducto } from "../../domain/models/producto.model";
import { DataProductoDTO, DataProductosNoValidos } from "../dto/producto.dto";
import { ProductoMapper } from "../../domain/mappers/producto.mapper";

@Injectable({
    providedIn: 'root'
})

export class ProductoService {
    private urlApi : string = environment.EndPoint
    private urlListar : string = '/api/ProductoServicio/ListarPorCategoria'
    private urlCrear : string = '/api/ProductoServicio/Insertar'
    private urlCrearMasivo : string = '/api/ProductoServicio/InsertarMasivo'
    private urlEditar : string = '/api/ProductoServicio/Actualizar'
    private urlEliminar : string = '/api/ProductoServicio/Eliminar'

    /* PRODUCTOS NO VÁLIDOS */
    private urlProductoNoValidos : string = '/api/ProductoServicio/ListarNoValidos'
    constructor(
        private http : HttpClient
    ){}

    obtenerProducto = ():Observable<DataProducto> => {
        return this.http.get<DataProductoDTO>(this.urlApi + this.urlListar)
        .pipe(map (apiResponse => ProductoMapper.toDomainData(apiResponse)))
    }

    crear = (crear : CrearProducto) : Observable<ResponseProducto> => {
        const newProducto = ProductoMapper.toApiCrear(crear)
        return this.http.post<ResponseProducto>(this.urlApi + this.urlCrear, newProducto)
    }

    editar = (editar : EditarProducto) : Observable<ResponseProducto> => {
        const edit = ProductoMapper.toApiEditar(editar)
        return this.http.put<ResponseProducto>(this.urlApi + this.urlEditar, edit)
    }

    eliminar = (eliminar : EliminarProducto) : Observable<ResponseProducto> => {
        const eliminarProducto = ProductoMapper.toApiEliminar(eliminar)
        return this.http.delete<ResponseProducto>(this.urlApi + this.urlEliminar, {body : eliminarProducto})
    }

    crearMasivo = (crear : CrearProducto[]) : Observable<ResponseProducto> => {
        const newProductos = ProductoMapper.toApiCrearMasivo(crear)
        return this.http.post<ResponseProducto>(this.urlApi + this.urlCrearMasivo, newProductos)
    }

    /* PRODUCTOS NO VÁLIDOS */
    obtenerNoValidos = (): Observable<DataProductosNoValidos> => {
        return this.http.get<DataProductosNoValidosDTO>(this.urlApi + this.urlProductoNoValidos)
        .pipe(map(api => ProductoMapper.toDomainDataNoValidos(api)))
    }
}