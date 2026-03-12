import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ProductoValidation {
     expRegNombreModeloDescripcion =/^[a-zA-Z0-9áÁéÉíÍóÓúÚ\u00C0-\u017F/()][a-zA-Z0-9áÁéÉíÍóÓúÚ\u00C0-\u017F\s.\-\/()]*[a-zA-Z0-9áÁéÉíÍóÓúÚ\u00C0-\u017F.)]$/;

     expRegUnidad =  /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F][a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F\s.]*[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F.]$/
     expRegPrecio = /^[0-9]+(\.[0-9]+)?$/

     maxLengthNombre : number = 150
     maxLengthModelo : number = 150
     maxLengthDescripcion : number = 150
     maxLengthUnidad : number = 30
     maxLengthPrecio : number = 10


     minLengthNombre : number = 4
     minLengthModelo : number = 4
     minLengthDecripcion: number = 4
     minLengthUnidad : number = 2

     expRegLockNombreModeloDescripcion: RegExp =/[^a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ .\-\/()]/g;

    //  expRegLockModelo : RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ -]/g;
    //  expRegLockDescripcion : RegExp =  /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]/g
     expRegLockUnidad : RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]/g
     expRegLockPrecio : RegExp = /[^0-9.]/g
}