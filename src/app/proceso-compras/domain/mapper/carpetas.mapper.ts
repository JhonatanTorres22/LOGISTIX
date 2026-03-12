import { ActualizarCarpetaConAnexoDTO, DataCarpetasDTO, InsertarCarpetasConAnexoDTO, InsertarCarpetasDTO, ListarCarpetasDTO } from "@/proceso-compras/infraestructure/dto/carpetas.dto";
import { ActualizarCarpetaConAnexo, DataCarpetas, InsertarCarpetas, InsertarCarpetasConAnexo, ListarCarpetas } from "../models/carpetas.models";

export class CarpetasMapper {

    static toDomainData(param : DataCarpetasDTO) : DataCarpetas {
        return{
            data : param.data.map(this.toDomain),
            errors : param.errors,
            isSuccess : param.isSuccess,
            message : param.message
        }
    }

    static toDomain (param : ListarCarpetasDTO) : ListarCarpetas  {
        return {
            idCarpeta : param.codigoCarpeta,
            numeracion : param.numeracion,
            prefijo : param.prefijoArea
        }
    }
    static toApiInsertar(param : InsertarCarpetas) : InsertarCarpetasDTO {
        return {
            numeracion : param.numeracion,
            prefijoArea : param.prefijo
        }
    }

    static toApiActualizarCarpeta  (param : ActualizarCarpetaConAnexo) : ActualizarCarpetaConAnexoDTO {
        return {
            codigoCarpeta : param.idCarpeta,
            codigoCarpetaConAnexoPorFase : param.idCarpetaConAnexo
        }
    }

    static toApiInsertarCarpetaConAnexo (param: InsertarCarpetasConAnexo): InsertarCarpetasConAnexoDTO {
        return {
            codigoAnexosPorFase : param.idAnexosPorFase,
            codigoCarpeta : param.idCarpeta
        }
    }
}