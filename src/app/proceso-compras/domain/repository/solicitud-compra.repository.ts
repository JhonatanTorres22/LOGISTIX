import { Observable } from "rxjs";
import { AgregarSolicitud, DataSolicitudCompra, EditarSolicitudCompraDetalle, EliminarSolicitudCompraDetalle, GenerarOrdenDeCompra, SolicitudCompra } from "../models/solicitud-compra.model";
import { ApiResponse } from "@/core/interceptors/error-message.model";
import { AgregarOrdenCompraDetalle, DataOrdenCompra, DataOrdenCompraPorFirmar, EditarOrdenCompraDetalle, EliminarOrdenCompraDetalle, ValidarProductoAlmacen } from "../models/ordenCompraDetalle.model";


export abstract class SolicitudCompraRepository {
   abstract obtener(codigo: number) : Observable<DataSolicitudCompra>
   abstract agregar(agregar: AgregarSolicitud[]) : Observable<void>
   abstract generarOrden(generar : GenerarOrdenDeCompra[]) : Observable<void>
   abstract eliminarSolicitudCompraDetalle(eliminar : EliminarSolicitudCompraDetalle) : Observable<ApiResponse>
   abstract editarSolicitudCompraDetalle(editar : EditarSolicitudCompraDetalle) : Observable<ApiResponse>

   /* ORDEN COMPRA DETALLE */
   abstract agregarOrdenCompraDetalle(agregar : AgregarOrdenCompraDetalle[]) : Observable<ApiResponse>
   abstract obtenerOrdenCompraDetalle(id : number) : Observable<DataOrdenCompra>
   abstract editarOrdenCompraDetalle(editar : EditarOrdenCompraDetalle[]) : Observable<ApiResponse>
   abstract eliminarOrdenCompraDetalle(eliminar : EliminarOrdenCompraDetalle[]) : Observable<ApiResponse>

   /* ORDEN COMPRA POR FIRMAR */
   abstract obtenerOrdenCompraPorFirmar() : Observable<DataOrdenCompraPorFirmar>  
   abstract validarProductoPorAlmacen(validar: ValidarProductoAlmacen[]) : Observable<ApiResponse>
}