import { SharedModule } from '@/core/components/shared.module';
import { CrearContacto, EditarContacto, ResponseContacto } from '@/proveedor/domain/models/contacto.model';
import { ContactoRepository } from '@/proveedor/domain/repositories/contacto.repository';
import { ContactoSignal } from '@/proveedor/domain/signals/contacto.signal';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { UiInputComponent } from "@/core/components/ui-input/ui-input.component";
import { ContactoValidation } from '@/proveedor/domain/validations/contacto.validation';
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { ProveedorSignal } from '@/proveedor/domain/signals/proveedor.signal';

@Component({
  selector: 'app-add-edit-contacto',
  imports: [SharedModule, UiInputComponent, UiButtonComponent],
  templateUrl: './add-edit-contacto.html',
  styleUrl: './add-edit-contacto.scss'
})
export class AddEditContacto {
  @Output() cerrar = new EventEmitter<void>(); 
  contactoForm: FormGroup
  signal = inject(ContactoSignal)
  selectContacto = this.signal.selectContacto
  contactoAction = this.signal.contactoAction

  signalProveedor = inject(ProveedorSignal)
  proveedorSelect = this.signalProveedor.proveedorSelect
  repository = inject(ContactoRepository)
  validation = inject(ContactoValidation)
  expReg = this.validation.expReg
  expRegCelular = this.validation.expRegCelular
  maxLength = this.validation.maxLength
  maxLengthCelular = this.validation.maxLengthCelular

  minLength = this.validation.minLength
  minLengthCelular = this.validation.minLengthCelular
  expLock = this.validation.expRegLock
  expLockCelular = this.validation.expRegLockCelular

   layout: string = 'grid';
   loading : boolean = false

  constructor(
    private alert: AlertService
  ) {
    this.contactoForm = new FormGroup({
      apePaterno: new FormControl('', [Validators.required, Validators.pattern(this.expReg), Validators.maxLength(this.maxLength),Validators.maxLength(this.maxLength) ]),
      apeMaterno: new FormControl('',[Validators.required,Validators.pattern(this.expReg), Validators.maxLength(this.maxLength),Validators.maxLength(this.maxLength)]),
      nombres: new FormControl('',[Validators.required,Validators.pattern(this.expReg), Validators.maxLength(this.maxLength),Validators.maxLength(this.maxLength)]),
      celular: new FormControl('',[Validators.required,Validators.maxLength(this.maxLengthCelular), Validators.minLength(this.minLengthCelular)]),
      correo: new FormControl('',[Validators.required,Validators.maxLength(this.maxLength),Validators.maxLength(this.maxLength)]),
      cargo: new FormControl('',[Validators.required,Validators.maxLength(this.maxLength),Validators.maxLength(this.maxLength)]),
      anotacion1: new FormControl('-', [Validators.required,]),
      anotacion2: new FormControl('-', [Validators.required,])
    })
  }

  ngOnInit() {

    this.selectContacto().idContacto !== 0 ? this.patchValue() : ''
  }

  onSubmit = () => {
    this.loading = true
    const accion: 'Editar' | 'Crear' = this.selectContacto().idContacto == 0 ? 'Crear' : 'Editar'
    if (this.contactoForm.invalid) {this.loading = false; return }

    this.alert.sweetAlert('question', '¿Confirmar?', `¿Está seguro que desea ${accion} ?`)
      .then(isConfirm => {
        if (!isConfirm) { this.loading = false; return }

        switch (accion) {
          case 'Crear': {
            const newContacto: CrearContacto = {
              apePaterno: this.contactoForm.value.apePaterno,
              apeMaterno: this.contactoForm.value.apeMaterno,
              nombres: this.contactoForm.value.nombres,
              celular: this.contactoForm.value.celular,
              correo: this.contactoForm.value.correo,
              cargo: this.contactoForm.value.cargo,
              anotacion1: this.contactoForm.value.anotacion1,
              anotacion2: this.contactoForm.value.anotacion2,
              idProveedor: this.proveedorSelect().id
            }
            console.log(newContacto);
            
            this.insertar(newContacto)
          }; break;

          case 'Editar': {
            const editar: EditarContacto = {
              apePaterno: this.contactoForm.value.apePaterno,
              apeMaterno: this.contactoForm.value.apeMaterno,
              nombres: this.contactoForm.value.nombres,
              celular: this.contactoForm.value.celular,
              correo: this.contactoForm.value.correo,
              cargo: this.contactoForm.value.cargo,
              anotacion1: this.contactoForm.value.anotacion1,
              anotacion2: this.contactoForm.value.anotacion2,
              idProveedor: this.proveedorSelect().id,
              idContacto: this.selectContacto().idContacto
            }
            console.log(editar);
            
            this.editar(editar)
          }
        }
      })
  }

  insertar = (newContacto: CrearContacto) => {
    this.repository.crear(newContacto).subscribe({
      next: (res: ResponseContacto) => {
        this.alert.showAlert(`Contacto creado correctamente, ${res.message}`, 'success')
        this.cerrar.emit();
        this.contactoAction.set('Agregar')
        this.loading = false;
      },
      error: (res: ResponseContacto) => {
        this.alert.showAlert(`Error al crear un contacto, ${res.message}`, 'error')
        this.loading = false;
      }
    })
  }

  editar = (editContacto: EditarContacto) => {
    this.repository.editar(editContacto).subscribe({
      next: (res: ResponseContacto) => {
        this.alert.showAlert(`Contacto editado correctamente, ${res.message}`, 'success')
        this.cerrar.emit();
        this.contactoAction.set('Editar')
        this.loading = false;
      },
      error: (res: ResponseContacto) => {
        this.alert.showAlert(`Error al editar un contacto, ${res.message}`, 'error')
        this.loading = false;
      }
    })
  }

  patchValue = () => {
    this.contactoForm.patchValue({
      apePaterno: this.selectContacto().apePaterno,
      apeMaterno: this.selectContacto().apeMaterno,
      nombres: this.selectContacto().nombres,
      celular: this.selectContacto().celular,
      correo: this.selectContacto().correo,
      cargo: this.selectContacto().cargo,
      anotacion1: this.selectContacto().anotacion1,
      anotacion2: this.selectContacto().anotacion2
    })
  }

cancelar = () => {
  this.cerrar.emit();
}
}
