import { Contacto, CrearContacto, DataContacto, EditarContacto, EliminarContacto, ResponseContacto } from "@/proveedor/domain/models/contacto.model";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DataContactoDTO } from "../dto/contacto.dto";
import { ContactoMapper } from "@/proveedor/domain/mappers/contacto.mapper";
import { ResponseProveedor } from "@/proveedor/domain/models/proveedor.model";

@Injectable({
    providedIn : 'root'
})

export class ContactoService {
    private http = inject(HttpClient)
    private urlApi : string = environment.EndPoint
    private urlListar : string = '/api/contacto/ListarPorProveedor/'
    private urlAgregar : string = '/api/Contacto/Insertar'
    private urlEditar : string = '/api/Contacto/Actualizar'
    private urlEliminar : string = '/api/Contacto/Eliminar'

    obtener = (idProveedor:number) : Observable<DataContacto> => {
        return this.http.get<DataContactoDTO>(this.urlApi + this.urlListar + idProveedor)
        .pipe(map(apiResponse => ContactoMapper.toDomainData(apiResponse)))
    }

    crear = (crear : CrearContacto): Observable<ResponseContacto> => {
        const newContacto  = ContactoMapper.toApiCrear(crear)
        return this.http.post<ResponseContacto>(this.urlApi + this.urlAgregar, newContacto)
    }

    editar = (editar : EditarContacto) : Observable<ResponseContacto> => {
        const editContacto = ContactoMapper.toApiEditar(editar)
        return this.http.put<ResponseContacto>(this.urlApi + this.urlEditar, editContacto)
    }

    eliminar = (eliminar : EliminarContacto) : Observable<ResponseContacto> => {
        const eliminarContacto = ContactoMapper.toApiEliminar(eliminar)
        return this.http.delete<ResponseContacto>(this.urlApi + this.urlEliminar, {body : eliminarContacto})
    }
}
