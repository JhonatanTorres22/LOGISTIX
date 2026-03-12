import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class UsuarioValidation {
    expRegNombre: RegExp = /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F][a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F\s]*[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F]$/;
    expRegDocumento : RegExp =/^(?!0)[0-9]+$/;;

    maxLengthNombre: number = 80
    maxLengthDocumento: number = 8

    minLengthNombre: number = 4
    minLengthDocumento: number = 8
    expRegLockInputNombre: RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]/g;
    expRegLockDocumento: RegExp = /[^0-9]/g;

}