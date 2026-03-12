import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root'
})

export class ContactoValidation {
    expReg : RegExp =  /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F][a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F\s]*[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F]$/;
    expRegCelular : RegExp = /^[0-9]{9}$/;

    maxLength : number = 150
    maxLengthCelular : number = 9
    // maxLengthCorreo : number = 200

    minLength : number = 4
    minLengthCelular :number = 9

    expRegLock : RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]/g
    expRegLockCelular : RegExp = /[^0-9]/g;
}