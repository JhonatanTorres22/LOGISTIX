import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ActualizarEstadoProximo, AgregarSolicitud, DataSolicitudCompra, EditarSolicitudCompraDetalle, EliminarSolicitudCompraDetalle, GenerarOrdenDeCompra, SolicitudCompra } from "../../domain/models/solicitud-compra.model";
import { SolicitudCompraMapper } from "../../domain/mapper/solicitud-compra.mapper";
import { DataSolicitudCompraDTO } from "../dto/solicitud-compra.dto";
import { ApiResponse } from "@/core/interceptors/error-message.model";
import { AgregarOrdenCompraDetalle, DataOrdenCompra, DataOrdenCompraPorFirmar, EditarOrdenCompraDetalle, EliminarOrdenCompraDetalle, ValidarProductoAlmacen } from "@/proceso-compras/domain/models/ordenCompraDetalle.model";
import { OrdenCompraDetalleMapper } from "@/proceso-compras/domain/mapper/ordenCompraDetalle.mapper";
import { DataOrdenCompraDTO, DataOrdenCompraPorFirmarDTO } from "../dto/ordenCompraDetalle.dto";





@Injectable({
    providedIn : 'root'
})

export class SolicitudCompraService {
    private urlApi :string = environment.EndPoint
    private urlListarSolicitud : string = '/api/SolicitudCompra/ListarPorCodigoSubTarea/'
    private urlAgregarSOlicitud : string = '/api/SolicitudCompra/Insertar'
    private urlGenerarOrden : string = '/api/SolicitudCompraDetalle/GenerarOrdenDeCompra'
    private urlListarAnexo : string = '/api/SolicitudCompra/ListarAnexosPorCodigoSubTarea/'
    private urlEditarSolicitudCompraDetalle : string = '/api/SolicitudCompraDetalle/Actualizar'
    private urlEliminarSolicitudCompraDetalle : string = '/api/SolicitudCompraDetalle/Eliminar'

    private urlListarOrdenCompraDetalle : string = '/api/SolicitudCompra/ListarPorSolicitudCompra/'
    private urlAgregarOrdenCompraDetalle : string = '/api/OrdenCompraDetalle/InsertarMasivo'
    private urlEditarOrdenCompraDetalle : string = '/api/OrdenCompraDetalle/ActualizarMasivo'
    private urlEliminarOrdenCompraDetalle : string  = '/api/OrdenCompraDetalle/EliminarMasivo'
    private urlActualizarEstadoProximo : string = '/api/SolicitudCompra/ActualizarEstadoProximo'


    private urlListarOrdenCompraPorFirmar : string = '/api/OrdenCompraDetalle/PorFirmar'
    private urlValidarProductoPorAlmacen : string = '/api/ProductoPorAlmacen/Validar'
    private http = inject(HttpClient)

    obtener = (codigo : number) : Observable<DataSolicitudCompra> => {
        return this.http.get<DataSolicitudCompraDTO>(this.urlApi + this.urlListarSolicitud + codigo)
        .pipe(map(apiResponse => SolicitudCompraMapper.toDomainData(apiResponse)))
    }

    agregar = (agregar : AgregarSolicitud[]) : Observable<void> => {
        const newSolicitud = SolicitudCompraMapper.toApiAgregar(agregar)
        return this.http.post<void>(this.urlApi + this.urlAgregarSOlicitud, newSolicitud)
    }

    generarOrden = (generar : GenerarOrdenDeCompra[]) : Observable<void> => {
        const newOrden = SolicitudCompraMapper.ToApiGenerarOrden(generar)
        return this.http.post<void>(this.urlApi + this.urlGenerarOrden, newOrden)
    }

    editarSolicitudCompraDetalle = (editar : EditarSolicitudCompraDetalle) : Observable<ApiResponse> => {
        const editarSolicitud = SolicitudCompraMapper.toApiEditarSolicitudCompraDetalle(editar)
        return this.http.put<ApiResponse>(this.urlApi + this.urlEditarSolicitudCompraDetalle, editarSolicitud)
    }

    eliminarSolicitudCompraDetalle = (eliminar : EliminarSolicitudCompraDetalle) => {
        const eliminarSolicitud = SolicitudCompraMapper.ToApiEliminarSolicitudCompraDetalle(eliminar)
        return this.http.delete<ApiResponse>(this.urlApi + this.urlEliminarSolicitudCompraDetalle, {body : eliminarSolicitud})
    }

    actualizarEstadoProximo (estadoProximo : ActualizarEstadoProximo) : Observable<ApiResponse>{
        const updateEstadoProximo = SolicitudCompraMapper.toDomainActualizarEstadoProximo(estadoProximo)
        return this.http.put<ApiResponse>(this.urlApi + this.urlActualizarEstadoProximo, updateEstadoProximo)
    }

    /* ORDEN DE COMPRA DETALLE */
    agregarOrdenCompraDetalle (agregar: AgregarOrdenCompraDetalle[]) : Observable<ApiResponse>{
        const newOrdenCompra = OrdenCompraDetalleMapper.toApiAgregar(agregar)
        return this.http.post<ApiResponse>(this.urlApi + this.urlAgregarOrdenCompraDetalle, newOrdenCompra)
    }

    obtenerOrdenCompraDetalle (id : number) : Observable<DataOrdenCompra>{
        return this.http.get<DataOrdenCompraDTO>(this.urlApi + this.urlListarOrdenCompraDetalle + id)
        .pipe(map (api => OrdenCompraDetalleMapper.toDomainData(api)))
    }

    editarOrdenCompraDetalle (editar : EditarOrdenCompraDetalle[]) : Observable<ApiResponse>{
        const editOrdenCompra = OrdenCompraDetalleMapper.toApiEditar(editar)
        return this.http.put<ApiResponse>(this.urlApi + this.urlEditarOrdenCompraDetalle, editOrdenCompra)
    }

    eliminarOrdenCompraDetalle (eliminar : EliminarOrdenCompraDetalle[]) : Observable<ApiResponse> {
        const deleteOrdenCompra  = OrdenCompraDetalleMapper.toApiEliminar(eliminar)
        return this.http.delete<ApiResponse>(this.urlApi + this.urlEliminarOrdenCompraDetalle, {body : deleteOrdenCompra})
    }


    /* ORDEN COMPRA POR FIRMAR */
    obtenerOrdenCompraPorFirmar() : Observable<DataOrdenCompraPorFirmar> {
        return this.http.get<DataOrdenCompraPorFirmarDTO>(this.urlApi + this.urlListarOrdenCompraPorFirmar)
        .pipe(map(api => OrdenCompraDetalleMapper.toDomainDataOrdenPorFirmar(api)))
    }

    validarProductoPorAlmacen (validar : ValidarProductoAlmacen[]) : Observable<ApiResponse>{
        const validarProducto = OrdenCompraDetalleMapper.toApiValidarProductoPorAlmacen(validar)
        return this.http.post<ApiResponse>(this.urlApi + this.urlValidarProductoPorAlmacen, validarProducto)
    }
}