import { AgregarBanco, DataBanco, EditarBanco, EliminarBanco } from "@/proveedor/domain/models/banco.model";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DataBancoDTO } from "../dto/banco.dto";
import { BancoMapper } from "@/proveedor/domain/mappers/banco.mapper";
import { ApiResponse } from "@/core/interceptors/error-message.model";

@Injectable({
    providedIn: 'root'
})

export class BancoService {
    private http = inject(HttpClient)
    private urlApi: string = environment.EndPoint
    private urlListarAllBancos: string = '/api/Banco/Listar'
    private urlListarBanco: string = '/api/Banco/ListarPorProveedor/'
    private urlAgregarBancoo: string = '/api/Banco/Insertar'
    private urlEditarBanco: string = '/api/Banco/Actualizar'
    private urlEliminarBanco: string = '/api/Banco/Eliminar'

    obtenerAllBancos(): Observable<DataBanco> {
        return this.http.get<DataBancoDTO>(this.urlApi + this.urlListarAllBancos)
            .pipe(map(api => BancoMapper.toDomainDataBanco(api)))
    }

    obtenerBanco(id : number): Observable<DataBanco> {
        return this.http.get<DataBancoDTO>(this.urlApi + this.urlListarBanco + id)
            .pipe(map(api => BancoMapper.toDomainDataBanco(api)))
    }

    crearBanco(agregar: AgregarBanco): Observable<ApiResponse> {
        const newBanco = BancoMapper.toApiAgregar(agregar)
        return this.http.post<ApiResponse>(this.urlApi + this.urlAgregarBancoo, newBanco)
    }

    editarBanco(editar: EditarBanco): Observable<ApiResponse> {
        const editBanco = BancoMapper.toApiEditar(editar)
        return this.http.put<ApiResponse>(this.urlApi + this.urlEditarBanco, editBanco)
    }

    eliminarBanco(eliminar: EliminarBanco): Observable<ApiResponse> {
        const eliminarBanco = BancoMapper.toApiEliminar(eliminar)
        return this.http.delete<ApiResponse>(this.urlApi + this.urlEliminarBanco, { body: eliminarBanco })
    }


}