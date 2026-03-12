import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { UiSelect } from "src/app/core/components/ui-select/ui-select.interface";
import { DataRolGipeoDTO, IniciarSesionGipeoDTO } from "../dto/gipeo.dto";
import { GipeoMapper } from "../../domain/mapper/gipeo.mapper";
import { AuthResponse, IniciaSesionGipeo } from "../../domain/models/gipeo.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class GipeoService {
    private urlApiGipeo: string
    private urlApi: string
    private urlListarRol: string
    private urlAuth: string

    constructor(
        private http: HttpClient
    ) {
        this.urlApiGipeo = 'https://gipeo.somee.com/gipeo'
        this.urlApi = environment.EndPoint
        this.urlListarRol = '/api/Perfil/Listar'
        this.urlAuth = '/api/Gipeo/SubTareasPorIndicador'

    }

    obtenerRol = (): Observable<UiSelect[]> => {
        return this.http.get<DataRolGipeoDTO>(this.urlApiGipeo + this.urlListarRol)
            .pipe(map(api => api.data.map(GipeoMapper.toDomain)))
    }

    authGipeo = (auth: IniciaSesionGipeo): Observable<AuthResponse> => {
        const login = GipeoMapper.toApiAuth(auth)
        return this.http.post<AuthResponse>(this.urlApi + this.urlAuth, login)
    }

}