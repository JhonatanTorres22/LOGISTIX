import { Injectable, signal } from "@angular/core";
import { ComprobantePorCargar, DocTributarioPorAprobar, ListarCronograma, ListarPagosRealizados } from "../models/cronograma.model";

@Injectable({
    providedIn: 'root'
})

export class CronogramaSignal {
    listCronogramaDefault: ListarCronograma[] = []
    listCronograma = signal(this.listCronogramaDefault)

    selectCronogramas = signal<ListarCronograma[]>([]);

    selectCronogramaDefault: ListarCronograma = {
        idCronogramaPagoProveedor: 0,
        monto: 0,
        fecha: "",
        comprobante: null,
        observacion: "",
        estado: 0,
        tipoDocumentoTributario: "",
        informeProveedor: null,
        informeResponsable: null,
        documentoTributario: null,
        conceptoTributario: "",
        fechaPagoRealizado: "",
        tipoPago: "",
        tipoObservacion: ""
    }
    selectCronograma = signal(this.selectCronogramaDefault)


    listDocTributarioPorAprobar = signal<DocTributarioPorAprobar[]>([])
    listComprobantePorCargar = signal<ComprobantePorCargar[]>([])

    listPagosRealizados = signal<ListarPagosRealizados[]>([])
}