import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
// import { NavigationItem } from "src/app/@theme/types/navigation";
// import { environment } from "src/environments/environment";
import { RootMenu } from "../../domain/models/menu.model";
import { MenuMapper } from "../../domain/mappers/menu.mapper";
import { environment } from "src/environments/environment";
import { MenuItem } from "primeng/api";

@Injectable({
    providedIn: 'root'
})

export class MenuService {
    private urlApi : string
    private urlListar : string

    constructor(
        private http : HttpClient
    ){
        this.urlApi = environment.EndPoint
        this.urlListar = '/api/usuario/ListarMenu'
    }

obtenerMenu = (): Observable<MenuItem[]> => {
  return this.http.get<{ data: RootMenu[] }>(this.urlApi + this.urlListar).pipe(
    map(response => {
      if (response.data) {
        return MenuMapper.mapRootMenuToSakaiItems(response.data);
      }
      return [];
    }),
    tap(mappedMenu => {
      // Guardar en localStorage
      localStorage.setItem('app_menu', JSON.stringify(mappedMenu));
    })
  );
}
getMenu = (): MenuItem[] => {
  const storedMenu = localStorage.getItem('app_menu');  
  return storedMenu ? JSON.parse(storedMenu) : [];
}
}