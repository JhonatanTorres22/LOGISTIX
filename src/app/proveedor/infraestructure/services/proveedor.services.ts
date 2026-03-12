import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ActualizarEvaluacion, CrearProveedor, DataProveedor, EditarProveedor, EliminarProveedor, Proveedor, ResponseProveedor } from "../../domain/models/proveedor.model";
import { DataProveedorDTO } from "../dto/proveedor.dto";
import { ProveedorMapper } from "../../domain/mappers/proveedor.mapper";
import { DataConsultaRuc, EditarConsultaRUC, EliminarConsultaRuc, InsertarConsultaRuc } from "@/proveedor/domain/models/consultaRuc.model";
import { DataConsultaRucDTO } from "../dto/consultaRuc.dto";
import { ConsultaRucMapper } from "@/proveedor/domain/mappers/consultaRuc.mapper";
import { ApiResponse } from "@/core/interceptors/error-message.model";

@Injectable({
    providedIn: 'root'
})

export class ProveedorService {
    private urlApi: string = environment.EndPoint
    private urlListar: string = '/api/proveedor/Listar'
    private urlAgregar: string = '/api/proveedor/Insertar'
    private urlEditar: string = '/api/proveedor/Actualizar'
    private urlEliminar: string = '/api/proveedor/Eliminar'
    private urlAgregarMasivo: string = '/api/proveedor/InsertarMasivo'
    private urlActualizarEvaluacion : string = '/api/proveedor/ActualizarEvaluacion'

    private urlListarConsultaRuc: string = '/api/ConsultaRuc/ListarPorSunat/'
    private urlAgregarConsultaRuc: string = '/api/ConsultaRuc/Insertar'
    private urlEditarConsultaRuc: string = '/api/ConsultaRuc/Actualizar'
    private urlEliminarConsultaRuc: string = '/api/ConsultaRuc/Eliminar'

    constructor(
        private http: HttpClient
    ) { }

    obtener = (): Observable<DataProveedor> => {
        return this.http.get<DataProveedorDTO>(this.urlApi + this.urlListar)
            .pipe(map(apiResponse => ProveedorMapper.toDomainData(apiResponse)));
    }

    crear = (crear: CrearProveedor): Observable<ResponseProveedor> => {
        const newProveedor = ProveedorMapper.toApiCrear(crear)
        return this.http.post<ResponseProveedor>(this.urlApi + this.urlAgregar, newProveedor)
    }

    editar = (editar: EditarProveedor): Observable<ResponseProveedor> => {
        const editProveedor = ProveedorMapper.toApiEditar(editar)
        return this.http.put<ResponseProveedor>(this.urlApi + this.urlEditar, editProveedor)
    }

    eliminar = (eliminar: EliminarProveedor): Observable<ResponseProveedor> => {
        const eliminarProveedor = ProveedorMapper.toApiEliminar(eliminar)
        return this.http.delete<ResponseProveedor>(this.urlApi + this.urlEliminar, { body: eliminarProveedor })
    }

    crearMasivo = (crearProveedores: CrearProveedor[]): Observable<ResponseProveedor> => {
        const newProveedores = ProveedorMapper.toApiCrearMasivo(crearProveedores)
        return this.http.post<ResponseProveedor>(this.urlApi + this.urlAgregarMasivo, newProveedores)
    }

    actualizarEvaluacion (evaluacion : ActualizarEvaluacion) : Observable<ApiResponse> {
        const updateEvaluacion = ProveedorMapper.toApiActualizarEvaluacion(evaluacion)
        return this.http.put<ApiResponse>(this.urlApi + this.urlActualizarEvaluacion, updateEvaluacion)
    }

    // CONSULTA RUC
    obtenerConsultaRuc(id: number): Observable<DataConsultaRuc> {
        return this.http.get<DataConsultaRucDTO>(this.urlApi + this.urlListarConsultaRuc + id)
            .pipe(map(api => ConsultaRucMapper.toDomainData(api)))
    }

    agregarConsultaRuc(agregar: InsertarConsultaRuc): Observable<ApiResponse> {
        const agregarConsulta = ConsultaRucMapper.toApiInsertar(agregar)
        return this.http.post<ApiResponse>(this.urlApi + this.urlAgregarConsultaRuc, agregarConsulta)
    }
    editarConsultaRuc(editar: EditarConsultaRUC): Observable<ApiResponse> {
        const editarConsulta = ConsultaRucMapper.toApiEditar(editar)
        return this.http.put<ApiResponse>(this.urlApi + this.urlEditarConsultaRuc, editarConsulta)
    }
    eliminarConsultaRuc (eliminar : EliminarConsultaRuc) : Observable<ApiResponse>{
        const eliminarConsulta = ConsultaRucMapper.toApiEliminar(eliminar)
        return this.http.delete<ApiResponse>(this.urlApi + this.urlEliminarConsultaRuc, {body: eliminarConsulta})
    }


}