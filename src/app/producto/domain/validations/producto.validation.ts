import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ProductoValidation {
     expRegNombreModeloDescripcion =/^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F](?:[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F\s.]*-?[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F\s.]*)[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F.]$/;
    //  expRegModelo = /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F](?:[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F\s.]*-?[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F\s.]*)[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F.]$/;
    //  expRegDescripcion = /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F](?:[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F\s.]*-?[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F\s.]*)[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F.]$/;
     expRegUnidad =  /^[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F][a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F\s.]*[a-zA-ZáÁéÉíÍóÓúÚ\u00C0-\u017F.]$/
     expRegPrecio = /^[0-9]+(\.[0-9]+)?$/


     maxLengthNombre : number = 80
     maxLengthModelo : number = 80
     maxLengthDescripcion : number = 100
     maxLengthUnidad : number = 30
     maxLengthPrecio : number = 8


     minLengthNombre : number = 4
     minLengthModelo : number = 4
     minLengthDecripcion: number = 4
     minLengthUnidad : number = 2
     minLengthPrecio : number = 2

     expRegLockNombreModeloDescripcion: RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ -]/g;
    //  expRegLockModelo : RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ -]/g;
    //  expRegLockDescripcion : RegExp =  /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]/g
     expRegLockUnidad : RegExp = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]/g
     expRegLockPrecio : RegExp = /[^0-9.]/g
}