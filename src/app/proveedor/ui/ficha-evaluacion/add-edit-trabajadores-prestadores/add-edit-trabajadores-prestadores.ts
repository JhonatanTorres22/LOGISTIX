import { Component, effect, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogModule } from "primeng/dialog";
import { ProcesoComprasModule } from "@/proceso-compras/proceso-compras-module";
import { CommonModule } from '@angular/common';
import { ProveedorModule } from '@/proveedor/proveedor-module';
import { UiDatePicker } from "@/core/components/ui-date-picker/ui-date-picker";
import { TrabajadoresPrestadoresSignal } from '@/proveedor/domain/signals/trabajadoresPrestadores.signal';
import { TrabajadoresPrestadoresRepository } from '@/proveedor/domain/repositories/trabajadoresPrestadores.repository';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { AgregarTrabajadoresPrestadores, EditarTrabajadoresPrestadores } from '@/proveedor/domain/models/trabajadoresPrestadores.model';
import { ProveedorSignal } from '@/proveedor/domain/signals/proveedor.signal';
import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { TrabajadoresPrestadoresValidation } from '@/proveedor/domain/validations/trabajadoresPrestadores.validation';
import { CardModule } from "primeng/card";
import { UiIconButton } from "@/core/components/ui-icon-button/ui-icon-button";
import { EvaluacionSunatSignal } from '@/proveedor/domain/signals/evaluacionSunat.signal';
import { ActualizarFechaConsulta } from '@/proveedor/domain/models/evaluacionSunat.model';
import { EvaluacionSunatRepository } from '@/proveedor/domain/repositories/evaluacionSunat.repository';

@Component({
  selector: 'app-add-edit-trabajadores-prestadores',
  imports: [DialogModule, ProcesoComprasModule, ProveedorModule, UiDatePicker, CardModule, UiIconButton],
  templateUrl: './add-edit-trabajadores-prestadores.html',
  styleUrl: './add-edit-trabajadores-prestadores.scss'
})
export class AddEditTrabajadoresPrestadores implements OnInit {

  trabajadorForm!: FormGroup
  fechaConsultaForm: FormGroup
  @Output() cerrar = new EventEmitter<void>();
  loading : boolean = false
  private signal = inject(TrabajadoresPrestadoresSignal)
  selectTrabajadores = this.signal.selectTrabajadores
  actionTrabajadores = this.signal.actionTrabajadores
  private proveedorSignal = inject(ProveedorSignal)
  selectProveedor = this.proveedorSignal.proveedorSelect
  private repository = inject(TrabajadoresPrestadoresRepository)
  private alert = inject(AlertService)
  private validation = inject(TrabajadoresPrestadoresValidation)
  private signalEvaluacion = inject(EvaluacionSunatSignal)
  selectEvaluacionSunat = this.signalEvaluacion.selectEvaluacionSunat
  selectEvaluacionDefault = this.signalEvaluacion.selectEvaluacionSunatDefault
  actionFechaConsulta = this.signalEvaluacion.actionFechaConsulta
  actionCerrarDrawer = this.signalEvaluacion.actionCerrarDrawer

  private evaluacionRepository = inject(EvaluacionSunatRepository)

  expRegTrabajadores = this.validation.expRegTrabajadores
  expLockTrabajadores = this.validation.expRegLockTrabajadores

  hoy = new Date(new Date().setHours(0,0,0,0));
  constructor() {
    this.trabajadorForm = new FormGroup({
      periodo: new FormControl('', [Validators.required]),
      nTrabajadores: new FormControl('', [Validators.required, Validators.pattern(this.expRegTrabajadores)]),
      nPensionistas: new FormControl('', [Validators.required, Validators.pattern(this.expRegTrabajadores)]),
      nPrestadoresServicios: new FormControl('', [Validators.required, Validators.pattern(this.expRegTrabajadores)])
    })

    this.fechaConsultaForm = new FormGroup({
      fechaConsulta: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.selectTrabajadores().idTrabajadores !== 0 ? this.patchValue() : ''
  }

  onSubmit = () => {
    this.loading = true
    if (this.trabajadorForm.invalid || this.fechaConsultaForm.invalid) {this.loading = false; return }
    const accion: 'Editar' | 'Crear' = this.selectTrabajadores().idTrabajadores !== 0 ? 'Editar' : 'Crear'

    this.alert.sweetAlert('question', '¿Confirmar?', `¿Está seguro que desea ${accion}?`)
      .then(isConfirm => {
        if (!isConfirm) {this.loading = false; return }
        switch (accion) {
          case 'Crear': {
            const agregar: AgregarTrabajadoresPrestadores = {
              idSunat: this.selectEvaluacionSunat().idSunat,
              nPensionistas: Number(this.trabajadorForm.value.nPensionistas),
              nPrestadoresDeServicios: Number(this.trabajadorForm.value.nPrestadoresServicios),
              nTrabajadores: Number(this.trabajadorForm.value.nTrabajadores),
              periodo: new Date(this.trabajadorForm.value.periodo).toISOString(),
            }
            console.log(agregar);
            this.agregar(agregar)
          }; break;

          case 'Editar': {
            const editar: EditarTrabajadoresPrestadores = {
              periodo: this.trabajadorForm.value.periodo,
              idSunat: this.selectEvaluacionSunat().idSunat,
              nPensionistas: this.trabajadorForm.value.nPensionistas,
              nPrestadoresDeServicios: this.trabajadorForm.value.nPrestadoresServicios,
              nTrabajadores: this.trabajadorForm.value.nTrabajadores,
              idTrabajadores: this.selectTrabajadores().idTrabajadores
            }
            console.log(editar);
            this.editar(editar)

          }; break;
        }
      })
  }

  agregar = (agregar: AgregarTrabajadoresPrestadores) => {
    this.repository.agregar(agregar).subscribe({
      next: (res: ApiResponse) => {
        this.alert.showAlert(`Agregado, ${res.message}`, 'success')
        if (res.isSuccess) {
          this.actualizarFechaConsulta()
        }
      },
      error: (err: ApiError) => {
        this.loading = false
        console.log(err);

        this.alert.showAlert(`Error, ${err.error.message}`, 'error')
      }
    })
  }

  editar = (editar: EditarTrabajadoresPrestadores) => {
    this.repository.editar(editar).subscribe({
      next: (res: ApiResponse) => {
        this.alert.showAlert(`Editado, ${res.message}`, 'success')

        if (res.isSuccess) {
          this.actualizarFechaConsulta()
        }
      },
      error: (err: ApiError) => {
        this.loading = false
        console.log(err);

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
    this.trabajadorForm.patchValue({
      periodo: this.toDate(this.selectTrabajadores().periodo),
      nTrabajadores: this.selectTrabajadores().nTrabajadores,
      nPensionistas: this.selectTrabajadores().nPensionistas,
      nPrestadoresServicios: this.selectTrabajadores().nPrestadoresDeServicios
    })

    this.fechaConsultaForm.patchValue({
      fechaConsulta: this.toDate(this.selectEvaluacionSunat().fechaTrabajadoresPrestadores)
    });
  }

  actualizarFechaConsulta = () => {
    let actualizarFecha: ActualizarFechaConsulta = {
      fechaConsultaSunat: new Date(this.fechaConsultaForm.value.fechaConsulta).toISOString(),
      idSunat: this.selectEvaluacionSunat().idSunat,
      tipoArchivoSunat: 'TPS'
    }

    this.evaluacionRepository.actualizarFechaConsulta(actualizarFecha).subscribe({
      next: (res: ApiResponse) => {
        this.loading = false
        this.alert.showAlert(`Fecha Actualizada, ${res.message}`)
        this.actionTrabajadores.set('Editar')
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
    this.selectEvaluacionSunat.set(this.selectEvaluacionDefault)
  }
}
