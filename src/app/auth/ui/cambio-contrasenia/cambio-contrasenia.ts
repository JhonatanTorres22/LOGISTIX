import { AuthService } from '@/auth/infraestructure/services/auth.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from "primeng/button";
import { PasswordModule } from "primeng/password";
import { Dialog } from "primeng/dialog";
import { CommonModule } from '@angular/common';
import { UiInputComponent } from "@/core/components/ui-input/ui-input.component";
import { DividerModule } from "primeng/divider";
import { TagModule } from "primeng/tag";
import { AlertService } from 'src/assets/demo/services/alert.service';
import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';


@Component({
    selector: 'app-cambio-contrasenia',
    imports: [CommonModule, ButtonModule, PasswordModule, Dialog, FormsModule, ReactiveFormsModule, DividerModule, TagModule],
    templateUrl: './cambio-contrasenia.html',
    styleUrl: './cambio-contrasenia.scss'
})
export class CambioContrasenia {
    @Input() forzado: boolean = false;  // 👈 nuevo input
@Output() onCambioExitoso = new EventEmitter<void>();  // 👈 para avisar al topbar
    @Input() visible: boolean = false;
    @Output() visibleChange = new EventEmitter<boolean>();

    form!: FormGroup;
    dniUsuario: string = '';
    nombreUsuario: string = ''
    loading : boolean = false

    requisitos = {
    mayuscula: false,
    minuscula: false,
    numero: false,
    especial: false,
    longitud: false
};
    constructor(
        private alert : AlertService,
        private authService: AuthService,
    ) { }

   ngOnInit(): void {
    this.dniUsuario = localStorage.getItem('userName') ?? 'Sin usuario';
    this.nombreUsuario = this.authService.getUserData()?.apellidosyNombres ?? 'Sin nombre';

    this.form = new FormGroup({
        password: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmarPassword: new FormControl('', [Validators.required])
    }, { validators: this.validarCoincidencia });

    this.form.get('newPassword')?.valueChanges.subscribe(valor => {
        const v = valor ?? '';
        this.requisitos = {
            mayuscula: /[A-Z]/.test(v),
            minuscula: /[a-z]/.test(v),
            numero:    /[0-9]/.test(v),
            especial:  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(v),
            longitud:  v.length >= 6
        };
    });
}

    
    validarCoincidencia(group: AbstractControl) {
    const nueva = group.get('newPassword')?.value ?? '';
    const confirmar = group.get('confirmarPassword')?.value ?? '';
    const userName = localStorage.getItem('userName') ?? '';

    if (nueva && nueva === userName) {
        return { igualAlUsuario: true };
    }

    if (nueva && nueva !== confirmar) {
        return { noCoincide: true };
    }

    return null;
}

    onGuardar(): void {
        if (this.form.invalid) return;
        this.loading = true;

        const payload = {
            userName: this.dniUsuario,
            password: this.form.get('password')?.value,
            newPassword: this.form.get('newPassword')?.value
        };
        
        this.alert.sweetAlert('question', '¿Confirmar?', '¿Desea Cambiar la contraseña?')
        .then (result => {
            if(!result){this.loading = false; return}
        })
        console.log('Payload:', payload);

        this.authService.cambiarContrasenia(payload).subscribe({
            next: (res: ApiResponse) => {
                 localStorage.removeItem('forzarCambio');
                this.loading = false
                this.alert.showAlert(`Contraseña actualizada, ${res.message}`)
                this.onCerrar();
                this.forzado = false;
            this.onCambioExitoso.emit();  // 👈 avisa al topbar
            },
            error: (err : ApiError) => {
                this.alert.showAlert(`Error al cambiar contraseña, ${err.error.message}`, 'error')
                this.loading = false;
            },
            complete: () => this.loading = false
        });
    }

    get newPasswordValue(): string {
        return this.form.get('newPassword')?.value ?? '';
    }


    onCerrar(): void {
    if (this.forzado) return;  // 👈 no hace nada si es forzado
    this.visibleChange.emit(false);
    this.form.reset();
    this.loading = false;
}
}
