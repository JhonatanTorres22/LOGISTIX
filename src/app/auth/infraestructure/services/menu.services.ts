import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuItem } from 'primeng/api';
import { RootMenu } from '../../domain/models/menu.model';
import { MenuMapper } from '../../domain/mappers/menu.mapper';
import { PermissionService } from './permisos.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private urlApi = environment.EndPoint;
  private urlListar = '/api/usuario/ListarMenu';

  private menuSubject = new BehaviorSubject<MenuItem[]>([]);
  menu$ = this.menuSubject.asObservable();

  constructor(
    private http: HttpClient,
    private permissionService: PermissionService
  ) {}

  obtenerMenu(): Observable<MenuItem[]> {
    return this.http.get<{ data: RootMenu[] }>(this.urlApi + this.urlListar).pipe(

      tap(response => {
        if (response.data) {
          const permisos = this.extraerPermisos(response.data);
          localStorage.setItem('app_permisos', JSON.stringify(permisos));
          this.permissionService.load(); // 🔥 reactivo
        }
      }),

      map(response =>
        response.data
          ? MenuMapper.mapRootMenuToSakaiItems(response.data)
          : []
      ),

      tap(menu => {
        localStorage.setItem('app_menu', JSON.stringify(menu));
        this.menuSubject.next(menu); // 🔥 reactivo
      })
    );
  }

  getMenu(): MenuItem[] {
    const stored = localStorage.getItem('app_menu');
    return stored ? JSON.parse(stored) : [];
  }

  cargarMenuDesdeStorage() {
    const menu = this.getMenu();
    if (menu.length > 0) {
      this.menuSubject.next(menu);
    }
  }

  extraerPermisos(rootMenus: RootMenu[]): string[] {
    const permisos = new Set<string>();

    rootMenus.forEach(root => {
      root.menus.forEach(menu => {
        menu.subMenus.forEach(sub => {
          sub.permisos.forEach(p => {
            permisos.add(p.descripcionPermiso);
          });
        });
      });
    });

    return Array.from(permisos);
  }
}
