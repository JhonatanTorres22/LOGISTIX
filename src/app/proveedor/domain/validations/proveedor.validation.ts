import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ProveedorValidation {
     expRegNombre = /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F][a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F\s.&-]*[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F.\.]$/;
    //  expRegDireccion = /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F][a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F\s.]*[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F.]$/;
     expRegRuc =  /^[0-9]+$/

     maxLengthNombre : number = 150
     maxLengthDireccion : number = 150
     maxLengthRuc : number = 11

     minLengthNombre : number = 8
     minLengthDireccion : number = 8
     minLengthRuc = 11

     expRegLockInputNombre: RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ .&-]/g;
     expRegLockRuc : RegExp = /[^0-9]/g;
}