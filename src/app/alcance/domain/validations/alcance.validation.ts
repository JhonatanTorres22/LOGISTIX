import {  Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AlcanceValidation {
    expRegNombre: RegExp = /^[a-zA-ZáÁéÉíÍóÓúÚñÑ\u00C0-\u017F]+(?:\s[a-zA-ZáÁéÉíÍóÓúÚñÑ\u00C0-\u017F]+)*$/;
    maxLengthNombre: number = 80
    minLengthNombre: number = 3
    expRegLockInputNombre: RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]/g;

    expRegCoordenadas: RegExp =/^-?(?:90(?:\.0+)?|[0-8]?\d(?:\.\d+)?),\s*-?(?:180(?:\.0+)?|1[0-7]\d(?:\.\d+)?|\d{1,2}(?:\.\d+)?)$/;
    maxLengthCoordenada: number = 80
    minLengthCoordenada: number = 5
    expRegLockInputCoordenadas: RegExp = /[^0-9.,\-\s]/g;

   expRegDireccion: RegExp =/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9][a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s.,#\-°\/]*[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9]$/;
    maxLengthDireccion: number = 150
    minLengthDireccion: number = 10
    expRegLockInputDireccion: RegExp =/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s.,#\-°\/]/g;







}

