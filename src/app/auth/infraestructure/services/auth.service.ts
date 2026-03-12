import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthData, DataModulo, DecodedToken, LoginModel } from "../../domain/models/auth.model";
import { DataModuloRolDTO, LoginRequestDTO, LoginResponseDTO } from "../dto/auth.dto";
import { AuthMapper } from "../../domain/mappers/auth.mappers";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private urlApi: string
    private urlListarRol: string
    private urlLogin: string
    private urlRefreshToken: string
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.urlApi = environment.EndPoint,
            this.urlListarRol = '/api/usuario/ListarRoles?nombreUsuario='
        this.urlLogin = '/api/usuario/Autenticar'
        this.urlRefreshToken = '/api/Usuario/RefreshToken'
    }

    obtenerRol = (usuario: string): Observable<DataModulo[]> => {
        return this.http.get<DataModuloRolDTO>(this.urlApi + this.urlListarRol + usuario)
            .pipe(map(api => api.data.map(AuthMapper.toDomain)))
    }
    login(model: LoginModel): Observable<AuthData> {
        const dto: LoginRequestDTO = AuthMapper.toDTO(model);
        return this.http.post<LoginResponseDTO>(this.urlApi + this.urlLogin, dto)
            .pipe(
                map(response => {
                    if (response.isSuccess) {
                        const authData = AuthMapper.fromResponse(response);

                        // Guardar token original
                        localStorage.setItem('token', authData.token);

                        // Decodificar JWT y guardar decodificado
                        const decoded = AuthMapper.decodeToken(authData.token);
                        authData.decoded = decoded;
                        localStorage.setItem('decodedToken', JSON.stringify(decoded));

                        return authData;
                    } else {
                        throw new Error(response.message || 'Error de autenticación');
                    }
                })
            );
    }


    getToken(): string | null {
        return localStorage.getItem('token');
    }

    refreshToken(): Observable<AuthData> {
        const token = this.getToken();

        if (!token) {
            console.log('[AuthService] No hay token para refrescar');
            return throwError(() => new Error('No hay token para refrescar'));
        }

        console.log('[AuthService] Intentando refrescar token...');

        return this.http.post<LoginResponseDTO>(this.urlApi + this.urlRefreshToken, { token }).pipe(
            map(response => {
                if (response.isSuccess) {
                    const authData = AuthMapper.fromResponse(response);

                    console.log('[AuthService] Refresh token exitoso:', authData.token);

                    // Guardar token nuevo
                    localStorage.setItem('token', authData.token);

                    // Guardar token decodificado
                    const decoded = AuthMapper.decodeToken(authData.token);
                    authData.decoded = decoded;
                    localStorage.setItem('decodedToken', JSON.stringify(decoded));

                    return authData;
                } else {
                    console.log('[AuthService] Error al refrescar token:', response.message);
                    throw new Error(response.message || 'Error al refrescar token');
                }
            }),
            // log de cualquier error HTTP
            catchError(err => {
                console.log('[AuthService] Refresh token falló', err);
                return throwError(() => err);
            })
        );
    }


    getUserData(): DecodedToken | null {
        const decoded = localStorage.getItem('decodedToken');
        return decoded ? JSON.parse(decoded) : null;
    }

    logout() {
        localStorage.removeItem('app_permisos')
        localStorage.removeItem('decodedToken');
        localStorage.removeItem('token');
        localStorage.removeItem('app_menu');
        this.router.navigate(['/login'])
    }

}