import { AgregarProductoAlmacenDTO } from "@/alcance/infraestructure/dto/producto-almacen.dto";
import { AgregarProductoAlmacen } from "../models/producto-almacen.model";

export class ProductoAlmacenMapper {

    static toApiAgregarProductosAlmacen(param: AgregarProductoAlmacen): AgregarProductoAlmacenDTO {
        return {
            codigoProducto: param.idProducto,
            codigoAlmacen: param.idAlmacen,
            cantidad: param.cantidad
        }
    }
}