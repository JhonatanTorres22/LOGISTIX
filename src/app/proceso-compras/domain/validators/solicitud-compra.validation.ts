import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class SolicitudCompraValidation {
    expRegLockCantidad : RegExp = /[^0-9]/g //elimina lo que no es número
    expLockCodigo : RegExp = /[^a-zA-Z0-9]/g // elimina lo que no sea número y letras
    expLockArea : RegExp = /[^a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ ]/g // elimina lo que no sea número, letra y espacio

    expRegArea : RegExp = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñÜü]+)*$/ // solo permite letras y espacios, pero no números
    expRegCodigo : RegExp = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü0-9]+$/ // solo permite letras y números, no espacios
    expRegCantidad : RegExp = /^[0-9]+$/ // solo permite numeros


    maxLengthArea : number = 200
    maxLengthCodigo : number = 8
    maxLengthCantidad : number = 8

    minLengthArea : number = 5
    minLengthCodigo : number = 8
    minLengthCantidad : number = 1


}