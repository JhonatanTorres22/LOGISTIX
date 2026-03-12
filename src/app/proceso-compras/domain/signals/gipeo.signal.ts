import { Injectable, signal } from "@angular/core";
import { UiSelect } from "src/app/core/components/ui-select/ui-select.interface";
import { BuscarSubtarea, IndicadorPoa, SubTarea } from "../models/gipeo.model";

@Injectable({
    providedIn : 'root'
})

export class GipeoSignal {
    listRolDefault : UiSelect[] = []

    listRol = signal(this.listRolDefault)

    searchSubtareaDefault : BuscarSubtarea = {
        tipo: "",
        id: 0
    }
        selectSubTareaDefault : SubTarea = {
        codigoSubTarea: 0,
        nombreSubTarea: "",
        valorPorcentual: 0,
        rh: 0,
        rhGasto: 0,
        rmf: 0,
        rmfGasto: 0,
        inv: 0,
        invGasto: 0,
        impr: 0,
        imprGasto: 0,
        monedaTipo: "",
        fechaInicioST: "",
        horaInicioST: "",
        fechaFinST: "",
        horaFinST: "",
        fechaRealizacionST: "",
        estadoRealizacionST: false,
        color: ""
    }
    
    listIndicadorDefault : IndicadorPoa[] = []
    listIndicador =signal(this.listIndicadorDefault)
    searchSubtarea = signal(this.searchSubtareaDefault)

    selectSubTarea = signal(this.selectSubTareaDefault)

    actionGipeo = signal('')
}