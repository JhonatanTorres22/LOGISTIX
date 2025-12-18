import { SharedModule } from '@/core/components/shared.module';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UiInputComponent } from "@/core/components/ui-input/ui-input.component";
import { ProveedorSignal } from '@/proveedor/domain/signals/proveedor.signal';
import { ProveedorValidation } from '@/proveedor/domain/validations/proveedor.validation';
import { CrearProveedor, EditarProveedor, ResponseProveedor } from '@/proveedor/domain/models/proveedor.model';
import { ProveedorRepository } from '@/proveedor/domain/repositories/proveedor.repository';
import { AlertService } from 'src/assets/demo/services/alert.service';

@Component({
  selector: 'app-add-edit-proveedor',
  imports: [SharedModule, UiInputComponent],
  templateUrl: './add-edit-proveedor.html',
  styleUrl: './add-edit-proveedor.scss'
})
export class AddEditProveedor {
  proveedorForm!: FormGroup
  @Input() visible: boolean = false
  @Output() visibleChange = new EventEmitter<boolean>();
  

  signal = inject(ProveedorSignal)
  proveedorSelect = this.signal.proveedorSelect
  proveedorAccion = this.signal.proveedorAccion

  validation = inject(ProveedorValidation)
  expRegNombre: RegExp = this.validation.expRegNombre
  maxLengthNombre: number = this.validation.maxLengthNombre
  minLengthNombre: number = this.validation.minLengthNombre
  expRegLockNombre: RegExp = this.validation.expRegLockInputNombre

  expRegRuc: RegExp = this.validation.expRegRuc
  maxLengthRuc: number = this.validation.maxLengthRuc
  minLength: number = this.validation.minLengthRuc
  expRegLockRuc: RegExp = this.validation.expRegLockRuc

  expRegDireccion: RegExp = this.validation.expRegDireccion
  maxLengthDireccion: number = this.validation.maxLengthDireccion
  minLengthDireccion: number = this.validation.minLengthDireccion
  expRegLockDir: RegExp = this.validation.expRegLockDireccion

  repository = inject(ProveedorRepository)

  constructor(
    private alert: AlertService,
  ) {
     this.proveedorForm = new FormGroup({
      nombre : new FormControl('', [Validators.required, Validators.maxLength(this.maxLengthNombre), Validators.minLength(this.minLengthNombre), Validators.pattern(this.expRegNombre) ]),
      tipo : new FormControl('', [Validators.required]),
      ruc : new FormControl('', [Validators.required, Validators.maxLength(this.maxLengthRuc), Validators.minLength(this.minLength), Validators.pattern(this.expRegRuc)]),
      direccion : new FormControl('', [Validators.required, Validators.maxLength(this.maxLengthDireccion), Validators.minLength(this.minLengthDireccion), Validators.pattern(this.expRegDireccion)])
    })
  }

    ngOnInit(): void {
    this.proveedorSelect().id !== 0 ? this.patchValue() : ''
  }

    onSubmit = () => {
    const accion : 'Editar' | 'Crear' = this.proveedorSelect().id == 0 ? 'Crear' : 'Editar'
    if(this.proveedorForm.invalid){return}

    this.alert.sweetAlert('question', '¿Confirmar?', `¿Está seguro que desea ${accion}?`)
    .then(isConfirm => {
      if(!isConfirm){return}
      switch(accion) {
        case 'Crear' : {
          const newProveedor : CrearProveedor = {
            direccion : this.proveedorForm.value.direccion,
            nombre : this.proveedorForm.value.nombre,
            ruc : this.proveedorForm.value.ruc,
            tipo : this.proveedorForm.value.tipo,
          }
          this.insertar(newProveedor)
          
        }; break;

        case 'Editar' : {
          const editProveedor : EditarProveedor = {
            direccion : this.proveedorForm.value.direccion,
            nombre : this.proveedorForm.value.nombre,
            ruc : this.proveedorForm.value.ruc,
            tipo : this.proveedorForm.value.tipo,
            id : this.proveedorSelect().id
          }
          this.editar(editProveedor)
          
        }
      }
    })
    
  }

  insertar = (newProveedor : CrearProveedor) => {
    this.repository.crear(newProveedor).subscribe({
      next : (res: ResponseProveedor) => {
        this.alert.showAlert(`Proveedor creado correctamente, ${res.message}`, 'success')
         this.proveedorAccion.set('Agregar')
        this.closeDialog()
      },
      error : (res : ResponseProveedor) => {
        this.alert.showAlert(`Error en crea el proveedor, ${res.message}`, 'error')
      }
    })
  }

  editar = (editProveedor : EditarProveedor) => {
    this.repository.editar(editProveedor).subscribe({
      next : (res: ResponseProveedor) => {
        this.alert.showAlert(`Proveedor editado correctamente, ${res.message}`, 'success')
        this.proveedorAccion.set('Editar')
        this.closeDialog()
      },
      error : (res: ResponseProveedor) => {
        this.alert.showAlert(`Error al editar el proveedor, ${res.message}`, 'error')
      }
    })
  }


    patchValue = () => {
    this.proveedorForm.patchValue({
      nombre : this.proveedorSelect().nombre,
      direccion : this.proveedorSelect().direccion,
      ruc : this.proveedorSelect().ruc.trim(),
      tipo : this.proveedorSelect().tipo
    })
  }
  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
