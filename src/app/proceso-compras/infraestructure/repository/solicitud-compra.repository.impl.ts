import { inject, Injectable } from "@angular/core";
import { SolicitudCompraRepository } from "../../domain/repository/solicitud-compra.repository";
import { SolicitudCompraService } from "../services/solicitud-compra.service";
import { Observable } from "rxjs";
import { AgregarSolicitud, DataSolicitudCompra, EditarSolicitudCompraDetalle, EliminarSolicitudCompraDetalle, GenerarOrdenDeCompra, SolicitudCompra } from "../../domain/models/solicitud-compra.model";
import { ApiResponse } from "@/core/interceptors/error-message.model";
import { AgregarOrdenCompraDetalle, DataOrdenCompra, DataOrdenCompraPorFirmar, EditarOrdenCompraDetalle, EliminarOrdenCompraDetalle, ValidarProductoAlmacen } from "@/proceso-compras/domain/models/ordenCompraDetalle.model";


@Injectable({
    providedIn : 'root'
})

export class SolicitudCompraRepositoryImpl implements SolicitudCompraRepository {
   private service = inject(SolicitudCompraService)

     obtener = (codigo: number): Observable<DataSolicitudCompra> =>{
        return this.service.obtener(codigo)
    }
    agregar = (agregar: AgregarSolicitud[]): Observable<void> => {
        return this.service.agregar(agregar)
    }
    generarOrden = (generar: GenerarOrdenDeCompra[]): Observable<void> => {
        return this.service.generarOrden(generar)
    }
    editarSolicitudCompraDetalle(editar: EditarSolicitudCompraDetalle): Observable<ApiResponse> {
        return this.service.editarSolicitudCompraDetalle(editar)
    }

    eliminarSolicitudCompraDetalle(eliminar: EliminarSolicitudCompraDetalle): Observable<ApiResponse> {
        return this.service.eliminarSolicitudCompraDetalle(eliminar)
    }

    /* ORDEN COMPRA DETALLE */

    obtenerOrdenCompraDetalle(id: number): Observable<DataOrdenCompra> {
        return this.service.obtenerOrdenCompraDetalle(id)
    }
    agregarOrdenCompraDetalle(agregar: AgregarOrdenCompraDetalle[]): Observable<ApiResponse> {
        return this.service.agregarOrdenCompraDetalle(agregar)    
    }

    editarOrdenCompraDetalle(editar: EditarOrdenCompraDetalle[]): Observable<ApiResponse> {
        return this.service.editarOrdenCompraDetalle(editar)
    }

    eliminarOrdenCompraDetalle(eliminar: EliminarOrdenCompraDetalle[]): Observable<ApiResponse> {
        return this.service.eliminarOrdenCompraDetalle(eliminar)
    }

    /* ORDEN COMPRA POR FIRMAR */
    obtenerOrdenCompraPorFirmar(): Observable<DataOrdenCompraPorFirmar> {
        return this.service.obtenerOrdenCompraPorFirmar()
    }

    validarProductoPorAlmacen(validar: ValidarProductoAlmacen[]): Observable<ApiResponse> {
        return this.service.validarProductoPorAlmacen(validar)
    }
}