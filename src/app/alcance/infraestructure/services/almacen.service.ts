import { AlmacenMapper } from "@/alcance/domain/mapper/almacen.mapper";
import {  DataAlmacen } from "@/alcance/domain/models/almacen.model";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DataAlmacenDTO } from "../dto/almacen.dto";
import { ApiResponse } from "@/core/interceptors/error-message.model";

@Injectable({
    providedIn: 'root'
})

export class AlmacenService {
    private http = inject(HttpClient)
    private urlApi : string
    private urlListar : string

    constructor(){
        this.urlApi = environment.EndPoint,
        this.urlListar = '/api/Almacen/Listar'
    }

    obtener(): Observable<DataAlmacen>{
        return this.http.get<DataAlmacenDTO>(this.urlApi + this.urlListar)
        .pipe(map(api => AlmacenMapper.toDomainDta(api)))
    }


}