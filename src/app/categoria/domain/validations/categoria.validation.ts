import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CategoriaValidation {
    expRegNombre: RegExp = /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F][a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F\s.]*[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F.]$/;
   expRegDescripcion: RegExp = /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F][a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F\s.,]*[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F.]$/;


    maxLengthNombre: number = 80
    maxLengthDescripcion: number = 200

    minLengthNombre: number = 8
    minLengthDescripcion: number = 8

    expRegLockInputNombre: RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]/g;
    expRegLockDescripcion: RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ,]/g;
}