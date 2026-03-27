import { Observable } from "rxjs";
import { AuthData, CambioContrasenia, DataModulo, LoginModel } from "../models/auth.model";
import { MenuItem } from "primeng/api";
import { ApiResponse } from "@/core/interceptors/error-message.model";
// import { NavigationItem } from "src/app/@theme/types/navigation";

export abstract class AuthRepository {
    abstract obtener(usuario : string) : Observable<DataModulo[]>
    abstract  login(model: LoginModel): Observable<AuthData>
    abstract obtenerMenu () : Observable<MenuItem[]>
    abstract cambioContrasenia (cambio : CambioContrasenia) : Observable<ApiResponse>
}