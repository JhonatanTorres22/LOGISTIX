import { Observable } from "rxjs";
import { ActualizarEvaluacion, CrearProveedor, DataProveedor, EditarProveedor, EliminarProveedor, Proveedor, ResponseProveedor } from "../../domain/models/proveedor.model";
import { ProveedorRepository } from "../../domain/repositories/proveedor.repository";
import { ProveedorService } from "../services/proveedor.services";
import { Injectable } from "@angular/core";
import { DataConsultaRuc, EditarConsultaRUC, EliminarConsultaRuc, InsertarConsultaRuc } from "@/proveedor/domain/models/consultaRuc.model";
import { ApiResponse } from "@/core/interceptors/error-message.model";

@Injectable({
    providedIn: 'root'
})

export class ProveedorRepositoryImpl implements ProveedorRepository {
    constructor(
        private proveedorService : ProveedorService,
    ){}

    obtener(): Observable<DataProveedor> {
        return this.proveedorService.obtener()
    }
    crear(proveedor: CrearProveedor): Observable<ResponseProveedor> {
        return this.proveedorService.crear(proveedor)
    }
    editar(proveedor: EditarProveedor): Observable<ResponseProveedor> {
        return this.proveedorService.editar(proveedor)
    }

    eliminar(proveedor: EliminarProveedor): Observable<ResponseProveedor> {
        return this.proveedorService.eliminar(proveedor)
    }
    
    crearMasivo(proveedores: CrearProveedor[]): Observable<ResponseProveedor> {
        return this.proveedorService.crearMasivo(proveedores)
    }
    actualizarEvaluacion(evaluacion: ActualizarEvaluacion): Observable<ApiResponse> {
        return this.proveedorService.actualizarEvaluacion(evaluacion)
    }

    // CONSULTA RUC
    obtenerConsultaRuc(id: number): Observable<DataConsultaRuc> {
        return this.proveedorService.obtenerConsultaRuc(id)
    }
    agregarConsultaRuc(agregar: InsertarConsultaRuc): Observable<ApiResponse> {
        return this.proveedorService.agregarConsultaRuc(agregar)
    }
    editarConsultaRUC(editar: EditarConsultaRUC): Observable<ApiResponse> {
        return this.proveedorService.editarConsultaRuc(editar)
    }
    eliminarConsultaRuc(eliminar: EliminarConsultaRuc): Observable<ApiResponse> {
        return this.proveedorService.eliminarConsultaRuc(eliminar)
    }
}