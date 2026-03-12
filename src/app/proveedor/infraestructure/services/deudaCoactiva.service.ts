import { AgregarDeudaCoactiva, DataDeudaCoactiva, EditarDeudaCoactiva, EliminarDeudaCoactiva } from "@/proveedor/domain/models/deudaCoactiva.model";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DataDeudaCoactivaDTO } from "../dto/deudaCoactiva.dto";
import { DeudaCoactivaMapper } from "@/proveedor/domain/mappers/deudaCoactiva.mapper";
import { ApiResponse } from "@/core/interceptors/error-message.model";

@Injectable({
    providedIn : 'root'
})

export class DeudaCoactivaService {
    private http = inject(HttpClient)
    private urlApi = environment.EndPoint
    private urlListarDeuda : string = '/api/DeudaCoactiva/ListarPorSunat/'
    private urlAgregarDeuda : string = '/api/DeudaCoactiva/Insertar'
    private urlEditarDeuda : string = '/api/DeudaCoactiva/Actualizar'
    private urlEliminarDeuda : string = '/api/DeudaCoactiva/Eliminar'
    
    obtenerDeudaCoactiva (id : number) : Observable<DataDeudaCoactiva>{
        return this.http.get<DataDeudaCoactivaDTO>(this.urlApi + this.urlListarDeuda + id)
        .pipe(map(api => DeudaCoactivaMapper.toDomainData(api)))
    }

    agregarDeudaCoactiva (agregar : AgregarDeudaCoactiva) : Observable<ApiResponse>{
        const newDeuda = DeudaCoactivaMapper.toApiAgregar(agregar)
        return this.http.post<ApiResponse>(this.urlApi + this.urlAgregarDeuda, newDeuda)
    }

    editarDeudaCoactiva (editar : EditarDeudaCoactiva) : Observable<ApiResponse>{
        const editDeuda = DeudaCoactivaMapper.toApiEditar(editar)
        return this.http.put<ApiResponse>(this.urlApi + this.urlEditarDeuda, editDeuda)
    }

    eliminarDeudaCoactiva (eliminar : EliminarDeudaCoactiva) : Observable<ApiResponse>{
        const deleteDeuda = DeudaCoactivaMapper.toApiEliminar(eliminar)
        return this.http.delete<ApiResponse>(this.urlApi + this.urlEliminarDeuda, {body: deleteDeuda})
    }
}