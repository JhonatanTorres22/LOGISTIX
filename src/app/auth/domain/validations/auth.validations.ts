import { Injectable } from "@angular/core";
import { IValidator } from "../models/input.models";



@Injectable({
    providedIn: 'root'
})

export class AuthValidations {

    validatorUsername: IValidator = {
        maxLength: 15,
        minLength: 8,
        expReg: /^\d{8,15}$/,
        expRegInput: /^(?!\d+$).+$/
    }

    validatorPassword: IValidator = {
        maxLength: 15,
        minLength: 8,
        expReg: /^\d{8,15}$/,
        expRegInput: / /
    }

    /* USERNAME */
    maxLengthUserName = 15;
    minLengthUserName = 8;
    expRegUserName = /[0-9]{8,15}/ ;
    expRegUserNameToLockInput : RegExp = /[^0-9]/g;

    /* PASSWORD */
    maxLengthPassword = 15;
    minLengthPassword = 8;

    expRegPassword = / /;
    expRegPasswordToLockInput = / /;


    /* AUTHENTICATION */
    // errorLoginMes = 'El usuario o la contraseña es incorrecto'

    errorLogin( message: string ): string {
        let messageError = ''; 

        switch ( message ) {
            case 'Usuario o contraseña incorrectos': messageError = message;
            break;

            default: messageError = 'Ocurrió un error, comunicarse con el administrador....'
        }

        return messageError
    }
}