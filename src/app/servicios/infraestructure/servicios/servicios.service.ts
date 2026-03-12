import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn : 'root'
})

export class ServicioService {
    private http = inject(HttpClient)
    private urlApi : string = environment.EndPoint
    private urlListar : string = ''
    private urlAgregar : string = ''
    private urlEditar : string = ''
    private urlEliminar : string = ''

    obtener () {

    }

    agregar () {

    }

    editar () {

    }

    eliminar () {
        
    }
}