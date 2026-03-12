import { AgregarDeudaCoactivaDTO, DataDeudaCoactivaDTO, EditarDeudaCoactivaDTO, EliminarDeudaCoactivaDTO, ListarDeudaCoactivaDTO } from "@/proveedor/infraestructure/dto/deudaCoactiva.dto";
import { AgregarDeudaCoactiva, DataDeudaCoactiva, EditarDeudaCoactiva, EliminarDeudaCoactiva, ListarDeudaCoactiva } from "../models/deudaCoactiva.model";

export class DeudaCoactivaMapper {
    static toDomainData (param : DataDeudaCoactivaDTO) : DataDeudaCoactiva {
        return {
            data : param.data.map(this.toDomain),
            errors : param.errors,
            isSucces : param.isSucces,
            message : param.message
        }
    }
    static toDomain (param : ListarDeudaCoactivaDTO) : ListarDeudaCoactiva {
        return {
            idSunat : param.codigoSunat,
            entidadAsociada : param.entidadAsociadaAlaDeuda,
            fecha : param.fechaInicioDeCobranzaCoactiva,
            idDeudaCoactiva : param.codigoDeudaCoactiva,
            monto : param.montoDeLaDeuda,
            periodo : param.periodoTributario
        }
    }

    static toApiAgregar ( param : AgregarDeudaCoactiva) : AgregarDeudaCoactivaDTO {
        return{
            codigoSunat : param.idSunat,
            entidadAsociadaAlaDeuda : param.entidadAsociada,
            fechaInicioDeCobranzaCoactiva : param.fecha,
            montoDeLaDeuda : param.monto,
            periodoTributario : param.periodo
        }
    }

    static toApiEditar (param : EditarDeudaCoactiva) : EditarDeudaCoactivaDTO {
        return{
            codigoSunat : param.idSunat,
            codigoDeudaCoactiva : param.idDeudaCoactiva,
            entidadAsociadaAlaDeuda : param.entidadAsociada,
            fechaInicioDeCobranzaCoactiva  : param.fecha,
            montoDeLaDeuda : param.monto,
            periodoTributario : param.periodo
        }
    }

    static toApiEliminar (param : EliminarDeudaCoactiva): EliminarDeudaCoactivaDTO {
        return {
            codigoDeudaCoactiva : param.idDeudaCoactiva
        }
    }
}