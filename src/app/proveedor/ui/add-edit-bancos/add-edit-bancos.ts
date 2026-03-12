import { Component, EventEmitter, Inject, inject, OnInit, Output } from '@angular/core';
import { ProcesoComprasModule } from "@/proceso-compras/proceso-compras-module";
import { UiSelect } from '@/core/components/ui-select/ui-select.interface';
import { UiSelectComponent } from "@/core/components/ui-select/ui-select.component";
import { UiInputComponent } from '@/core/components/ui-input/ui-input.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProveedorSignal } from '@/proveedor/domain/signals/proveedor.signal';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { BancoSignal } from '@/proveedor/domain/signals/banco.signal';
import { AgregarBanco, EditarBanco } from '@/proveedor/domain/models/banco.model';
import { BancoRepository } from '@/proveedor/domain/repositories/banco.repository';
import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { BancoValidation } from '@/proveedor/domain/validations/banco.validation';

@Component({
  selector: 'app-add-edit-bancos',
  imports: [ProcesoComprasModule, UiSelectComponent, FormsModule, ReactiveFormsModule, UiInputComponent],
  templateUrl: './add-edit-bancos.html',
  styleUrl: './add-edit-bancos.scss'
})
export class AddEditBancos implements OnInit {
  loading : boolean = false
  @Output() cerrar = new EventEmitter<void>();
  listTipoBanco: UiSelect[] = []
  formBanco: FormGroup
  mostrarDetraccion = false

  private proveedorSignal = inject(ProveedorSignal)
  selectProveedor = this.proveedorSignal.proveedorSelect
  private bancoSignal = inject(BancoSignal)
  listBanco = this.bancoSignal.listBanco
  selectBanco = this.bancoSignal.selectBanco
  actionBanco = this.bancoSignal.actionBanco
  private alert = inject(AlertService)
  private repository = inject(BancoRepository)
  private validation = inject(BancoValidation)
  expRegCci = this.validation.expRegCci
  minLengthCci = this.validation.minLengthCci
  maxLengthCci = this.validation.maxLengthCci
  expLockCci = this.validation.expRegLockCci

  expReg = this.validation.expRegNCuentaYCtaRetraccion
  minLengthDetraccion = this.validation.minLengthCtaRetraccion
  minLengthNCuenta = this.validation.minLengthCtaRetraccion
  maxLength = this.validation.maxLengthNCuentaYCtaRetraccion
  expLock = this.validation.expRegLockNCuentaYCtaRetraccion

  constructor() {
    this.formBanco = new FormGroup({
      nombreBanco: new FormControl('', [Validators.required]),
      numeroCuenta: new FormControl('', [Validators.required, Validators.minLength(this.minLengthNCuenta), Validators.maxLength(this.maxLength), Validators.pattern(this.expReg)]),
      cci: new FormControl('', [Validators.required, Validators.minLength(this.minLengthCci), Validators.maxLength(this.maxLengthCci), Validators.pattern(this.expRegCci)]),
      ctaDetraccion: new FormControl('', )
    })
  }

ngOnInit(): void {

  this.listTipoBanco = [
    { text: 'BCP', value: 'BCP' },
    { text: 'SCOTIABANK', value: 'SCOTIABANK' },
    { text: 'INTERBANK', value: 'INTERBANK' },
    { text: 'BANCO DE LA NACIÓN', value: 'BANCO DE LA NACIÓN' },
    { text: 'BBVA', value: 'BBVA' },
  ]

  this.formBanco.get('nombreBanco')?.valueChanges.subscribe(banco => {
    const control = this.formBanco.get('ctaDetraccion')
    if (banco === 'BANCO DE LA NACIÓN') {
      this.mostrarDetraccion = true
      control?.setValidators([
        Validators.required,
        Validators.minLength(this.minLengthDetraccion),
        Validators.pattern(this.expReg)
      ])

    } else {
      this.mostrarDetraccion = false
      control?.clearValidators()
      control?.setValue('')
    }
    control?.updateValueAndValidity()
  })

  this.selectBanco().idBanco !== 0 ? this.patchValue() : ''
}

  onSubmit = () => {
    this.loading = true
    const accion : 'Editar' | 'Crear' = this.selectBanco().idBanco == 0 ? 'Crear' : 'Editar'
    if(this.formBanco.invalid){return}
    const cuentaDetraccion = this.formBanco.value.nombreBanco === 'BANCO DE LA NACIÓN'? this.formBanco.value.ctaDetraccion: '0'
    this.alert.sweetAlert('question', '¿Confirmar?', `¿Está seguro que desea ${accion}?`)
    .then(result => {
      if(!result){this.loading = false; return}
      switch(accion){
        case 'Crear' : {
          const crear : AgregarBanco = {
            cci : this.formBanco.value.cci,
            cuentaDetraccion : cuentaDetraccion,
            idProveedor: this.selectProveedor().id,
            nombreBanco : this.formBanco.value.nombreBanco,
            numeroCuenta : this.formBanco.value.numeroCuenta,
          }
          console.log(crear);
          
          this.crear(crear)
        }; break;

        case 'Editar' : {
          const editar : EditarBanco = {
            cci : this.formBanco.value.cci,
            cuentaDetraccion : cuentaDetraccion,
            idProveedor: this.selectProveedor().id,
            nombreBanco : this.formBanco.value.nombreBanco,
            numeroCuenta : this.formBanco.value.numeroCuenta,
            idBanco : this.selectBanco().idBanco
          }
          console.log(editar);
          this.editar(editar)
        }; break;
      }
    })
  }

  crear = (newBanco : AgregarBanco) => {
    this.repository.agregarBanco(newBanco).subscribe({
      next : (res: ApiResponse) => {
        this.loading = false
        this.alert.showAlert(`Banco creado correctamente, ${res.message}`, 'success')
        this.cerrar.emit();
        this.actionBanco.set('CREAR')
      },
      error : (err : ApiError) => {
        console.log(err);
        
        this.alert.showAlert(`Error al crear un banco, ${err.message}`, 'error')
        this.loading = false;
      }
    })
  }


  editar = (editar : EditarBanco) => {
    this.repository.editarBanco(editar).subscribe({
      next : (res: ApiResponse) => {
        this.loading = false
        this.alert.showAlert(`Banco editado correctamente, ${res.message}`, 'success')
        this.cerrar.emit();
        this.actionBanco.set('EDITAR')
      },
      error : (err : ApiError) => {
        console.log(err);
        
        this.alert.showAlert(`Error al editar un banco, ${err.message}`, 'error')
        this.loading = false;
      }
    })
  }

  patchValue = () => {
    this.formBanco.patchValue({
      nombreBanco: this.selectBanco().nombreBanco,
      numeroCuenta: this.selectBanco().numeroCuenta,
      cci: this.selectBanco().cci,
      ctaDetraccion: this.selectBanco().cuentaDetraccion
    })
  }

  cancelar = () => {
  this.cerrar.emit();
}
}
