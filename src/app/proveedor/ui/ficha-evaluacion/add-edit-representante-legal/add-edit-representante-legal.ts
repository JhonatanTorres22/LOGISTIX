import { AgregarRepresentanteLegal, EditarRepresentanteLegal } from '@/proveedor/domain/models/representanteLegal.model';
import { RepresentanteLegalRepository } from '@/proveedor/domain/repositories/representanteLegal.repository';
import { RepresentanteLegalSignal } from '@/proveedor/domain/signals/representanteLegal.signal';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { CardModule } from "primeng/card";
import { UiIconButton } from "@/core/components/ui-icon-button/ui-icon-button";
import { UiDatePicker } from "@/core/components/ui-date-picker/ui-date-picker";
import { UiInputComponent } from "@/core/components/ui-input/ui-input.component";
import { ProveedorModule } from '@/proveedor/proveedor-module';
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { UiSelectComponent } from "@/core/components/ui-select/ui-select.component";
import { UiSelect } from '@/core/components/ui-select/ui-select.interface';
import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { EvaluacionSunatSignal } from '@/proveedor/domain/signals/evaluacionSunat.signal';
import { RepresentanteLegalValidation } from '@/proveedor/domain/validations/representanteLegal.validation';
import { EvaluacionSunatRepository } from '@/proveedor/domain/repositories/evaluacionSunat.repository';
import { ActualizarFechaConsulta } from '@/proveedor/domain/models/evaluacionSunat.model';

@Component({
  selector: 'app-add-edit-representante-legal',
  imports: [UiLoadingProgressBarComponent, CardModule, UiIconButton, UiDatePicker, UiInputComponent, ProveedorModule, UiButtonComponent, UiSelectComponent],
  templateUrl: './add-edit-representante-legal.html',
  styleUrl: './add-edit-representante-legal.scss'
})
export class AddEditRepresentanteLegal implements OnInit {
  @Output() cerrar = new EventEmitter<void>();
  loading: boolean = false
  private signal = inject(RepresentanteLegalSignal)
  selectRepresentanteLegal = this.signal.selectRepresentanteLegal
  actionRepresentante = this.signal.actionRepresentanteLegal
  private alert = inject(AlertService)
  private repository = inject(RepresentanteLegalRepository)
  listTipoDocumento: UiSelect[] = []
  representanteForm: FormGroup
  private evaluacionSunatSignal = inject(EvaluacionSunatSignal)
  selectEvaluacionSunat = this.evaluacionSunatSignal.selectEvaluacionSunat
  private validation = inject(RepresentanteLegalValidation)
  expRegNombre = this.validation.expRegNombre
  maxLengthNombre = this.validation.maxLengthNombre
  minLengthNombre = this.validation.minLengthNombre
  expLockNombre = this.validation.expRegLockInputNombre

  expRegDoc = this.validation.expRegDocumento
  maxLengthDoc = this.validation.maxLengthDocumento
  minLengthDoc = this.validation.minLengthDocumento
  expLockDoc = this.validation.expRegLockDocumento
  hoy = new Date(new Date().setHours(0,0,0,0));
  fechaConsultaForm: FormGroup
  constructor() {
    this.representanteForm = new FormGroup({
      tipoDocumento: new FormControl('', [Validators.required]),
      nDocumento: new FormControl('', [Validators.required, Validators.pattern(this.expRegDoc), Validators.maxLength(this.maxLengthDoc), Validators.minLength(this.minLengthDoc)]),
      nombre: new FormControl('', [Validators.required,  Validators.pattern(this.expRegNombre), Validators.maxLength(this.maxLengthNombre), Validators.minLength(this.minLengthNombre)]),
      cargo: new FormControl('', [Validators.required, Validators.pattern(this.expRegNombre), Validators.maxLength(this.maxLengthNombre), Validators.minLength(this.minLengthNombre)]),
      fecha: new FormControl('')
    })

    this.fechaConsultaForm = new FormGroup({
      fechaConsulta: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.selectRepresentanteLegal().idRepresentanteLegal !== 0 ? this.patchValue() : ''
    this.listTipoDocumento = [
      { text: 'DNI', value: 'DNI' },
      // { text: 'CARNET DE EXTRANJERÍA', value: 'CARNET DE EXTRANJERÍA' }
    ]
  }

  onSubmit = () => {
    this.loading = true
    if (this.representanteForm.invalid || this.fechaConsultaForm.invalid) { this.loading = false; return }

    const accion: 'Crear' | 'Editar' = this.selectRepresentanteLegal().idRepresentanteLegal !== 0 ? 'Editar' : 'Crear'
    this.alert.sweetAlert('question', '¿Confirmar?', `Está seguro que desea ${accion}`)
      .then(isConfirm => {
        if (!isConfirm) { this.loading = false; return }

        switch (accion) {
          case 'Crear': {
            let agregar: AgregarRepresentanteLegal = {
              idSunat : this.selectEvaluacionSunat().idSunat,
              nDocumento: this.representanteForm.value.nDocumento,
              tipoDocumento: this.representanteForm.value.tipoDocumento,
              nombreRL: this.representanteForm.value.nombre,
              cargoRL: this.representanteForm.value.cargo,
              fechaDesde: this.representanteForm.value.fecha ?? '1900-01-01T15:00:00.000Z'
            }
            this.agregarRepresentante(agregar)

          }; break;

          case 'Editar': {
            let editar: EditarRepresentanteLegal = {
              idSunat : this.selectEvaluacionSunat().idSunat,
              idRepresentanteLegal: this.selectRepresentanteLegal().idRepresentanteLegal,
              nDocumento: this.representanteForm.value.nDocumento,
              tipoDocumento: this.representanteForm.value.tipoDocumento,
              nombreRL: this.representanteForm.value.nombre,
              cargoRL: this.representanteForm.value.cargo,
              fechaDesde: new Date(this.representanteForm.value.fecha).toISOString() ?? '1900-01-01T15:00:00.000Z',
            }
            this.editarRepresentante(editar)
          }
        }
      })
  }

  agregarRepresentante = (agregar : AgregarRepresentanteLegal) => {
    this.repository.agregarRepresentanteLegal(agregar).subscribe({
      next : (res : ApiResponse) => {
        // this.loading = false
        this.alert.showAlert(`Agregado , ${res.message}`, 'success')
        // this.actionRepresentante.set(res.isSuccess)
        // this.closePanel()
        if(res.isSuccess){
          this.actualizarFechaConsulta()
        }
      },
      error : (err : ApiError) => {
        this.loading = false
        this.alert.showAlert(`Error al agregar , ${err.error.message}`, 'error')
      }
    })
  }

  editarRepresentante = (editar : EditarRepresentanteLegal) => {
    this.repository.editarRepresentanteLegal(editar).subscribe({
      next : (res : ApiResponse) => {
        // this.loading = false
        this.alert.showAlert(`Editado , ${res.message}`, 'success')
        if(res.isSuccess){
          this.actualizarFechaConsulta()
        }
        // this.actionRepresentante.set(res.isSuccess)
        // this.closePanel()
      },
      error : (err : ApiError) => {
        this.loading = false
        this.alert.showAlert(`Error al editar , ${err.error.message}`, 'error')
      }
    })
  }
private evaluacionRepository = inject(EvaluacionSunatRepository)
actionFechaConsulta = this.evaluacionSunatSignal.actionFechaConsulta
actionCerrarDrawer = this.evaluacionSunatSignal.actionCerrarDrawer
  actualizarFechaConsulta = () => {
        let actualizarFecha: ActualizarFechaConsulta = {
          fechaConsultaSunat: new Date(this.fechaConsultaForm.value.fechaConsulta).toISOString(),
          idSunat: this.selectEvaluacionSunat().idSunat,
          tipoArchivoSunat: 'RL'
        }
    
        this.evaluacionRepository.actualizarFechaConsulta(actualizarFecha).subscribe({
          next: (res: ApiResponse) => {
            this.loading = false
            this.alert.showAlert(`Fecha Actualizada, ${res.message}`)
            this.actionRepresentante.set(res.isSuccess)
            this.actionFechaConsulta.set('ACTUALIZAR FECHA')
            this.actionCerrarDrawer.set('CERRAR DRAWER')
            this.closePanel()
          },
          error: (err: ApiError) => {
            this.loading = false
            this.alert.showAlert(`Error, ${err.error.message}`, 'error')
          }
        })
      }

  toDate(date: any): Date | null {
    if (!date) return null;

    const d = new Date(date);
    return isNaN(d.getTime()) ? null : d;
  }

  patchValue = () => {
    this.representanteForm.patchValue({
      tipoDocumento: this.selectRepresentanteLegal().tipoDocumento,
      nDocumento: this.selectRepresentanteLegal().nDocumento,
      nombre: this.selectRepresentanteLegal().nombreRL,
      cargo: this.selectRepresentanteLegal().cargoRL,
      fecha : this.selectRepresentanteLegal().fechaDesde === '1900-01-01T15:00:00' ? null :this.toDate(this.selectRepresentanteLegal().fechaDesde)
      // fecha: this.toDate(this.selectRepresentanteLegal().fechaDesde),
    })
    this.fechaConsultaForm.patchValue({
      fechaConsulta: this.toDate(this.selectEvaluacionSunat().fechaRepresentanteLegal)
    });
  }

  closePanel() {
    this.cerrar.emit();
    // this.selec.set(this.selectEvaluacionDefault)
  }


}
