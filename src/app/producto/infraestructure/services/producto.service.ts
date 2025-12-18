import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CrearProducto, EditarProducto, EliminarProducto, Producto } from "../../domain/models/producto.model";
import { DataProductoDTO, ProductoDTO } from "../dto/producto.dto";
import { ProductoMapper } from "../../domain/mappers/producto.mapper";

@Injectable({
    providedIn: 'root'
})

export class ProductoService {
    private urlApi : string
    private urlListar : string
    private urlCrear : string
    private urlEditar : string
    private urlEliminar : string
    constructor(
        private http : HttpClient
    ){
        this.urlApi = environment.EndPoint,
        this.urlListar = '/api/Producto/Listar'
        this.urlCrear = '/api/Producto/Insertar'
        this.urlEditar = '/api/Producto/Actualizar'
        this.urlEliminar = '/api/Producto/Eliminar'
    }

// 2️⃣ Servicio: mapeo desde ProductoDTO a Producto
obtenerProducto = (): Observable<DataProductoDTO<Producto[]>> => {
  return this.http
    .get<DataProductoDTO<ProductoDTO[]>>(this.urlApi + this.urlListar)
    .pipe(
      map(response => ({
        ...response, // preserva message, isSuccess, errors
        data: response.data.map(ProductoMapper.toDomain) // convierte DTO a Domain
      }))
    )
}



    crear = (crear : CrearProducto) : Observable<void> => {
        const newProducto = ProductoMapper.toApiCrear(crear)
        return this.http.post<void>(this.urlApi + this.urlCrear, newProducto)
    }

    editar = (editar : EditarProducto) : Observable<void> => {
        const edit = ProductoMapper.toApiEditar(editar)
        return this.http.put<void>(this.urlApi + this.urlEditar, edit)
    }

    eliminar = (eliminar : EliminarProducto) : Observable<void> => {
        const eliminarProducto = ProductoMapper.toApiEliminar(eliminar)
        return this.http.delete<void>(this.urlApi + this.urlEliminar, {body : eliminarProducto})
    }
}