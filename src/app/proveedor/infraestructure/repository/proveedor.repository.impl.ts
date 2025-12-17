import { Observable } from "rxjs";
import { CrearProveedor, EditarProveedor, EliminarProveedor, Proveedor } from "../../domain/models/proveedor.model";
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
    crear(proveedor: CrearProveedor): Observable<void> {
        return this.proveedorService.crear(proveedor)
    }
    editar(proveedor: EditarProveedor): Observable<void> {
        return this.proveedorService.editar(proveedor)
    }

    eliminar(proveedor: EliminarProveedor): Observable<void> {
        return this.proveedorService.eliminar(proveedor)
    }
}