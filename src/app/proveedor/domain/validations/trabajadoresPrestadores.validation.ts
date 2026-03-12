import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root'
})

export class TrabajadoresPrestadoresValidation {
    expRegTrabajadores: RegExp = /^[0-9]+$/;
    expRegLockTrabajadores : RegExp = /[^0-9]/g;
}