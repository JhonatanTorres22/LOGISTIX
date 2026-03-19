import { ProductoAlmacenRepository } from "@/alcance/domain/repository/producto-almacen.repository";
import { ProductoAlmacenService } from "../services/producto-almacen.service";
import { inject } from "@angular/core";
import { AgregarProductoAlmacen, DataProductoPorAlmacen } from "@/alcance/domain/models/producto-almacen.model";
import { Observable } from "rxjs";

export class ProductoAlmacenRepositoryImpl implements ProductoAlmacenRepository {
    private service = inject(ProductoAlmacenService)

    agregarProductoAlmacen(agregarProductoAlmacen: AgregarProductoAlmacen) {
        return this.service.agregarProductoAlmacen(agregarProductoAlmacen)
    }
    obtenerProductoPorAlmacen(idAlmacen: number, nPagina: number, tamanioPagina: number): Observable<DataProductoPorAlmacen> {
        return this.service.obtenerProductoPorAlmacen(idAlmacen, nPagina,tamanioPagina)
    }
}