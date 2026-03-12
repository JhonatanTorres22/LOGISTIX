import { ProductoAlmacenRepository } from "@/alcance/domain/repository/producto-almacen.repository";
import { ProductoAlmacenService } from "../services/producto-almacen.service";
import { inject } from "@angular/core";
import { AgregarProductoAlmacen } from "@/alcance/domain/models/producto-almacen.model";

export class ProductoAlmacenRepositoryImpl implements ProductoAlmacenRepository {
    private service = inject(ProductoAlmacenService)

    agregarProductoAlmacen(agregarProductoAlmacen: AgregarProductoAlmacen) {
        return this.service.agregarProductoAlmacen(agregarProductoAlmacen)
    }
}