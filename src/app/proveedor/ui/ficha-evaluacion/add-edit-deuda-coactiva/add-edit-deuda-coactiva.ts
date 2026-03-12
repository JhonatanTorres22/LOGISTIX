import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CardModule } from "primeng/card";
import { UiIconButton } from "@/core/components/ui-icon-button/ui-icon-button";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProveedorModule } from '@/proveedor/proveedor-module';
import { UiInputComponent } from "@/core/components/ui-input/ui-input.component";
import { UiDatePicker } from "@/core/components/ui-date-picker/ui-date-picker";
import { DeudaCoactivaValidation } from '@/proveedor/domain/validations/deudaCoactiva.validation';
import { DeudaCoactivaSignal } from '@/proveedor/domain/signals/deudaCoactiva.signal';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { AgregarDeudaCoactiva, EditarDeudaCoactiva } from '@/proveedor/domain/models/deudaCoactiva.model';
import { DeudaCoactivaRepository } from '@/proveedor/domain/repositories/deudaCoactiva.repository';
import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { EvaluacionSunatSignal } from '@/proveedor/domain/signals/evaluacionSunat.signal';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { EvaluacionSunatRepository } from '@/proveedor/domain/repositories/evaluacionSunat.repository';
import { ActualizarFechaConsulta } from '@/proveedor/domain/models/evaluacionSunat.model';

@Component({
  selector: 'app-add-edit-deuda-coactiva',
  imports: [CardModule, UiIconButton, UiButtonComponent, ProveedorModule, UiInputComponent, UiDatePicker, UiLoadingProgressBarComponent],
  templateUrl: './add-edit-deuda-coactiva.html',
  styleUrl: './add-edit-deuda-coactiva.scss'
})
export class AddEditDeudaCoactiva implements OnInit {
  loading: boolean = false
  @Output() cerrar = new EventEmitter<void>();
  formDeudaCoactiva: FormGroup
  private validation = inject(DeudaCoactivaValidation)
  expRegMonto = this.validation.expRegMonto
  expLockMonto = this.validation.expRegLockMonto
  private signal = inject(DeudaCoactivaSignal)
  selectDeudaCoactiva = this.signal.selectDeudaCoactiva
  actionDeuda = this.signal.actionDeudaCoactiva
  private alert = inject(AlertService)
  private repository = inject(DeudaCoactivaRepository)
  private evaluacionSunatSignal = inject(EvaluacionSunatSignal)
  selectEvaluacionSunat = this.evaluacionSunatSignal.selectEvaluacionSunat
  fechaConsultaForm: FormGroup
  hoy = new Date(new Date().setHours(0, 0, 0, 0));
  constructor() {
    this.formDeudaCoactiva = new FormGroup({
      monto: new FormControl('', [Validators.required, Validators.pattern(this.expRegMonto)]),
      periodo: new FormControl('', [Validators.required]),
      fechaInicioCobranza: new FormControl('', [Validators.required]),
      entidadAsociada: new FormControl('', [Validators.required])
    })

    this.fechaConsultaForm = new FormGroup({
      fechaConsulta: new FormControl('', [Validators.required])
    })
  }
  ngOnInit(): void {
    this.selectDeudaCoactiva().idDeudaCoactiva !== 0 ? this.patchValue() : ''
  }

  tieneDatosDeuda(): boolean {
    const v = this.formDeudaCoactiva.value

    return !!(
      v.monto ||
      v.periodo ||
      v.fechaInicioCobranza ||
      v.entidadAsociada
    )
  }

  onSubmit = () => {
    this.loading = true

    // 1️⃣ Validar fecha de consulta (siempre obligatoria)
    if (this.fechaConsultaForm.invalid) {
      this.fechaConsultaForm.markAllAsTouched()
      this.loading = false
      return
    }

    const tieneDatos = this.tieneDatosDeuda()

    // 2️⃣ Si no registró deuda → solo actualizar fecha
    if (!tieneDatos) {
      this.actualizarFechaConsulta()
      return
    }

    // 3️⃣ Si empezó a llenar deuda → validar todo el formulario
    if (this.formDeudaCoactiva.invalid) {
      this.formDeudaCoactiva.markAllAsTouched()
      this.loading = false
      return
    }
    const accion: 'Editar' | 'Crear' = this.selectDeudaCoactiva().idDeudaCoactiva !== 0 ? 'Editar' : 'Crear'
    this.alert.sweetAlert('question', '¿Confirmar?', `¿Está seguro que desea ${accion} ?`)
      .then(isConfirm => {
        if (!isConfirm) { this.loading = false; return }

        switch (accion) {
          case 'Crear': {
            const agregar: AgregarDeudaCoactiva = {
              idSunat: this.selectEvaluacionSunat().idSunat,
              monto: this.formDeudaCoactiva.value.monto,
              periodo: new Date(this.formDeudaCoactiva.value.periodo).toISOString(),
              entidadAsociada: this.formDeudaCoactiva.value.entidadAsociada,
              fecha: new Date(this.formDeudaCoactiva.value.fechaInicioCobranza).toISOString()
            }
            console.log(agregar);

            this.agregar(agregar)

          }; break;

          case 'Editar': {
            const editar: EditarDeudaCoactiva = {
              idSunat: this.selectEvaluacionSunat().idSunat,
              idDeudaCoactiva: this.selectDeudaCoactiva().idDeudaCoactiva,
              monto: this.formDeudaCoactiva.value.monto,
              periodo: this.formDeudaCoactiva.value.periodo,
              entidadAsociada: this.formDeudaCoactiva.value.entidadAsociada,
              fecha: this.formDeudaCoactiva.value.fechaInicioCobranza
            }
            this.editar(editar)
          }; break;
        }
      })
  }

  agregar = (agregar: AgregarDeudaCoactiva) => {
    this.repository.agregarDeudaCoactiva(agregar).subscribe({
      next: (res: ApiResponse) => {
        if (res.isSuccess) {
          this.actualizarFechaConsulta()
        }
        this.alert.showAlert(`Agregado correctamente, ${res.message}`, 'success')
        // this.loading = false
        // this.closePanel()
        // this.actionDeuda.set(res.isSuccess)
      },
      error: (err: ApiError) => {
        this.alert.showAlert(`Error al agregar, ${err.error.message}`)
        this.loading = false;

      }
    })
  }

  editar = (editar: EditarDeudaCoactiva) => {
    this.repository.editarDeudaCoactiva(editar).subscribe({
      next: (res: ApiResponse) => {
        this.alert.showAlert(`Editado correctamente, ${res.message}`, 'success')
        if (res.isSuccess) {
          this.actualizarFechaConsulta()
        }
        // this.loading = false
        // this.closePanel()
        // this.actionDeuda.set(res.isSuccess)
      },
      error: (err: ApiError) => {
        console.log(err);

        this.alert.showAlert(`Error al editar, ${err.error.message}`)
        this.loading = false;

      }
    })
  }

  toDate(date: any): Date | null {
    if (!date) return null;

    const d = new Date(date);
    return isNaN(d.getTime()) ? null : d;
  }

  patchValue = () => {
    this.formDeudaCoactiva.patchValue({
      monto: this.selectDeudaCoactiva().monto,
      periodo: this.toDate(this.selectDeudaCoactiva().periodo),
      fechaInicioCobranza: this.toDate(this.selectDeudaCoactiva().fecha),
      entidadAsociada: this.selectDeudaCoactiva().entidadAsociada
    })

    this.fechaConsultaForm.patchValue({
      fechaConsulta: this.toDate(this.selectEvaluacionSunat().fechaDeudaCoactiva)
    });
  }
  private evaluacionRepository = inject(EvaluacionSunatRepository)
  actionFechaConsulta = this.evaluacionSunatSignal.actionFechaConsulta
  actionCerrarDrawer = this.evaluacionSunatSignal.actionCerrarDrawer
  actualizarFechaConsulta = () => {
    let actualizarFecha: ActualizarFechaConsulta = {
      fechaConsultaSunat: new Date(this.fechaConsultaForm.value.fechaConsulta).toISOString(),
      idSunat: this.selectEvaluacionSunat().idSunat,
      tipoArchivoSunat: 'DC'
    }

    this.evaluacionRepository.actualizarFechaConsulta(actualizarFecha).subscribe({
      next: (res: ApiResponse) => {
        this.loading = false
        this.alert.showAlert(`Fecha Actualizada, ${res.message}`)
        this.actionDeuda.set(res.isSuccess)
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


  closePanel() {
    this.cerrar.emit();
  }


}
