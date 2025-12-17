export interface IValidator {
    maxLength: number,
    minLength: number,
    expReg: RegExp,
    expRegInput: RegExp,
}