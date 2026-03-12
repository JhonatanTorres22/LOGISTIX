import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private readonly KEY = 'app_permisos';

  private permisos = new Set<string>();
  private permisosSubject = new BehaviorSubject<Set<string>>(new Set());

  permisos$ = this.permisosSubject.asObservable();

  load(): void {
    const data = JSON.parse(localStorage.getItem(this.KEY) || '[]');
    this.permisos = new Set(data);
    this.permisosSubject.next(this.permisos);
  }

  clear(): void {
    this.permisos.clear();
    this.permisosSubject.next(new Set());
    localStorage.removeItem(this.KEY);
  }

  has(permiso: string): boolean {
    return this.permisos.has(permiso);
  }

  resolve<T extends Record<string, string>>(catalogo: T): Record<keyof T, boolean> {
    const result = {} as Record<keyof T, boolean>;

    Object.keys(catalogo).forEach(key => {
      result[key as keyof T] = this.permisos.has(catalogo[key as keyof T]);
    });

    return result;
  }
}
