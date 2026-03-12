import { ContactoRepository } from "@/proveedor/domain/repositories/contacto.repository";
import { inject, Injectable } from "@angular/core";
import { ContactoService } from "../services/contacto.service";
import { CrearContacto, DataContacto, EditarContacto, EliminarContacto, ResponseContacto } from "@/proveedor/domain/models/contacto.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn : 'root'
})

export class ContactoRepositoryImpl implements ContactoRepository {
    private service = inject(ContactoService)

    obtener(idProveedor : number): Observable<DataContacto> {
        return this.service.obtener(idProveedor)
    }
    crear(crear: CrearContacto): Observable<ResponseContacto> {
        return this.service.crear(crear)
    }

    editar(editar: EditarContacto): Observable<ResponseContacto> {
        return this.service.editar(editar)
    }

    eliminar(eliminar: EliminarContacto): Observable<ResponseContacto> {
        return this.service.eliminar(eliminar)
    }
}