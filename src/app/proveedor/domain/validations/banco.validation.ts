import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class BancoValidation {
    expRegCci: RegExp = /^0[0-9]{19}$/
    minLengthCci: number = 20
    maxLengthCci: number = 20
    expRegLockCci : RegExp = /[^0-9]/g;

    expRegNCuentaYCtaRetraccion: RegExp = /^[0-9]+$/
    minLengthNCuenta: number = 12
    maxLengthNCuentaYCtaRetraccion: number = 20
    expRegLockNCuentaYCtaRetraccion : RegExp = /[^0-9]/g;

    minLengthCtaRetraccion: number = 11
}