import { CrearEvaluacionDTO, CriterioDTO, DataCriterioDTO, DataEvaluacionDTO, EditarEvaluacionDTO, ProveedorEvaluacionDTO } from "../../infraestructure/dto/evaluacion.dto";
import { CrearEvaluacion, Criterio, DataCriterio, DataEvaluacion, EditarEvaluacion, ProveedorEvaluacion } from "../models/evaluacion.model";

export class EvaluacionMapper {
    static toDomainCriterio = (param : CriterioDTO) : Criterio => {
        return {
            detalle : param.detalleVerificar,
            id : param.codigoCriterio,
            nombre : param.nombreCriterio,
            obligatorio : param.obligatorio
        }
    }

    static toDomainDataCriterio = (param : DataCriterioDTO): DataCriterio => {
        return{
            data: param.data.map(this.toDomainCriterio),
            message : param.message,
            isSuccess: param.isSuccess,
            errors: param.errors
        }
    }
static toApiCrearEvaluacionMasivo = (lista: CrearEvaluacion[]): CrearEvaluacionDTO[] => {
        return lista.map(item => ({
            codigoCriterio: item.idCriterio,
            codigoProveedor: item.idProveedor,
            cumple: item.cumple,
            documento: item.documento,
            observacion: item.observacion
        }));
    }

    static toApiEditar = (param : EditarEvaluacion[]) : EditarEvaluacionDTO[] => {
        return param.map(item => ({
            codigoEvaluacion: item.idEvaluacion,
            codigoProveedor: item.idProveedor,
            cumple: item.cumple,
            documento : item.documento,
            observacion : item.observacion
        }))
    }

    static toDomainEvaluacion = (param : ProveedorEvaluacionDTO): ProveedorEvaluacion =>  {
        return {
            idProveedor: param.codigoProveedor,
            nombre : param.nombreLegal,
            tipo: param.tipo,
            direccion : param.direccion,
            evaluaciones : param.evaluaciones.map(e => ({
                cumple : e.cumple,
                detalleCriterio : e.detalleCriterio,
                documento: e.documento,
                idCriterio: e.codigoCriterio,
                idEvaluacion : e.codigoEvaluacion,
                nombreCriterio: e.nombreCriterio,
                obligatorio : e.obligatorioCriterio,
                observacion : e.observacion
            })),
        }
    }

        static toDomainDataEvaluacion = (param : DataEvaluacionDTO): DataEvaluacion =>{
        return{
            data: param.data.map(this.toDomainEvaluacion),
            message : param.message,
            isSuccess: param.isSuccess,
            error : param.error
        }
    }

    
    
}