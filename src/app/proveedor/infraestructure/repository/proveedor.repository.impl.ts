import { Observable } from "rxjs";
import { CrearProveedor, EditarProveedor, EliminarProveedor, Proveedor, ResponseProveedor } from "../../domain/models/proveedor.model";
import { ProveedorRepository } from "../../domain/repositories/proveedor.repository";
import { ProveedorService } from "../services/proveedor.services";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ProveedorRepositoryImpl implements ProveedorRepository {
    constructor(
        private proveedorService : ProveedorService
    ){}

    obtener(): Observable<Proveedor[]> {
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
}