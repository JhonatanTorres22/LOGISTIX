import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CategoriaValidation {
    expRegNombre: RegExp = /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F][a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F\s]*[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F]$/;
   expRegDescripcion: RegExp = /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F][a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F\s.,]*[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F.]$/;


    maxLengthNombre: number = 500
    maxLengthDescripcion: number = 500

    minLengthNombre: number = 4
    minLengthDescripcion: number = 4

    expRegLockInputNombre: RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]/g;
    expRegLockDescripcion: RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ,]/g;
}