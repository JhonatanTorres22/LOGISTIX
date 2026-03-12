import { AgregarMarcaDTO, DataMarcaDTO, EditarMarcaDTO, EliminarMarcaDTO, ListarMarcaDTO } from "@/marca/infraestructure/dto/marca.dto";
import { AgregarMarca, DataMarca, EditarMarca, EliminarMarca, ListarMarca } from "../models/marca.model";

export class MarcaMapper {
    static toDomainData(param : DataMarcaDTO) : DataMarca {
        return {
            data : param.data.map(this.toDomainMarca),
            errors : param.errors,
            isSuccess : param.isSuccess,
            message : param.message
        }
    }

    static toDomainMarca(param : ListarMarcaDTO) : ListarMarca {
        return{
            idMarca : param.codigoMarca,
            nombreMarca : param.nombre,
            descripcionMarca : param.descripcion
        }
    }

    static toApiAgregar(param : AgregarMarca): AgregarMarcaDTO{
        return{
            nombre : param.nombreMarca,
            descripcion : param.descripcionMarca
        }
    }

    static toApiEditar(param : EditarMarca): EditarMarcaDTO{
        return{
            codigoMarca : param.idMarca,
            nombre : param.nombreMarca,
            descripcion : param.descripcionMarca
        }
    }

    static toApiEliminar(param : EliminarMarca): EliminarMarcaDTO{
        return{
            codigoMarca : param.idMarca
        }
    }
       
}