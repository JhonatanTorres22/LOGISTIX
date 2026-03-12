import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root'
})

export class DeudaCoactivaValidation {
    expRegMonto : RegExp = /^\d+(\.\d+)?$/

    expRegLockMonto : RegExp = /[^0-9.]|(\..*\.)/g


}