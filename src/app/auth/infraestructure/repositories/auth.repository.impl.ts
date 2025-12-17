import { Injectable } from "@angular/core";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";
import { AuthData, DataModulo, LoginModel } from "../../domain/models/auth.model";
// import { NavigationItem } from "src/app/@theme/types/navigation";
import { MenuService } from "../services/menu.services";
import { MenuItem } from "primeng/api";


@Injectable({
    providedIn: 'root'
})

export class AuthRepositoryImpl implements AuthRepository {
    constructor(
        private service : AuthService,
        private menuService : MenuService
    ){}
    obtener(usuario: string): Observable<DataModulo[]> {
        return this.service.obtenerRol(usuario)
    }
    login(model: LoginModel): Observable<AuthData> {
        return this.service.login(model)
    }
    obtenerMenu(): Observable<MenuItem[]> {
        return this.menuService.obtenerMenu()
    }
}