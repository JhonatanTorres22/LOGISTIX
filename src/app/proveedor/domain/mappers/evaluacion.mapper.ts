import { P } from "@angular/cdk/platform.d-B3vREl3q";
import { CrearEvaluacionDTO, CriterioDTO } from "../../infraestructure/dto/evaluacion.dto";
import { CrearEvaluacion, Criterio } from "../models/evaluacion.model";

export class EvaluacionMapper {
    static toDomainCriterio (param : CriterioDTO) : Criterio {
        return {
            detalle : param.detalleVerificar,
            id : param.codigoCriterio,
            nombre : param.nombreCriterio,
            obligatorio : param.obligatorio
        }
    }
static toApiCrearEvaluacionMasivo(lista: CrearEvaluacion[]): CrearEvaluacionDTO[] {
        return lista.map(item => ({
            codigoCriterio: item.idCriterio,
            codigoProveedor: item.idProveedor,
            cumple: item.cumple,
            documento: item.documento,
            observacion: item.observacion
        }));
    }
}