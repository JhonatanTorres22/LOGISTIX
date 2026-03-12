import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class UnidadMedidaValidation {
    maxLengthNombre: number = 100
    minLengthNombre: number = 1

    maxLengthDescripcion: number = 200
    minLengthDescripcion: number = 1

    expReg = /^[a-zA-Z0-9áÁéÉíÍóÓúÚ\u00C0-\u017F][a-zA-Z0-9áÁéÉíÍóÓúÚ\u00C0-\u017F\s.-]*[a-zA-Z0-9áÁéÉíÍóÓúÚ\u00C0-\u017F.-]$/;
    expRegLock: RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]/g;
}