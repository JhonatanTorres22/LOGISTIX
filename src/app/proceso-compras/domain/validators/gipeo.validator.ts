import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class GipeoValidation {
    expRegDni : RegExp = /^[0-9]+$/
    expRegSubTarea : RegExp = /^[0-9]+$/
    
    maxLengthDni : number = 8
    maxLengthPassword : number = 15

    minLengthDni : number = 8
    minLengthPassword : number = 8
    minLengthSubTarea : number =1

    expRegLockDni : RegExp = /[^0-9]/g
    expRegLockSubTarea : RegExp = /[^0-9]/g
}