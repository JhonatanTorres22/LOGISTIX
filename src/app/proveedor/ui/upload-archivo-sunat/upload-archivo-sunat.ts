import { EvaluacionSunatSignal } from '@/proveedor/domain/signals/evaluacionSunat.signal';
import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { DialogModule } from "primeng/dialog";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { EvaluacionSunatRepository } from '@/proveedor/domain/repositories/evaluacionSunat.repository';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProveedorModule } from '@/proveedor/proveedor-module';
import { UploadFileComponent } from "@/core/components/upload-file-component/upload-file-component";
import { ArchivoConsultaRuc } from '@/proveedor/domain/models/evaluacionSunat.model';
import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-archivo-sunat',
  imports: [DialogModule, UiButtonComponent, ProveedorModule, UploadFileComponent, UiLoadingProgressBarComponent],
  templateUrl: './upload-archivo-sunat.html',
  styleUrl: './upload-archivo-sunat.scss'
})
export class UploadArchivoSunat {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() tipoArchivo!: 'RUC' | 'TRABAJADORES' | 'DEUDA' | 'REPRESENTANTE' | null

  loading: boolean = false
  archivoActual: string | null = null

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['tipoArchivo']) {

      const evaluacion = this.selectEvaluacionSunat()

      if (!evaluacion) return

      switch (this.tipoArchivo) {
        case 'RUC':
          this.archivoActual = evaluacion.archivoConsultaRuc
          break

        case 'TRABAJADORES':
          this.archivoActual = evaluacion.archivoTrabajadoresPrestadores
          break

        case 'DEUDA':
          this.archivoActual = evaluacion.archivoDeudaCoactiva
          break

        case 'REPRESENTANTE':
          this.archivoActual = evaluacion.archivoRepresentanteLegal
          break

        default:
          this.archivoActual = null
      }
    }
  }

  private signal = inject(EvaluacionSunatSignal)
  selectEvaluacionSunat = this.signal.selectEvaluacionSunat
  actionEvaluacionSunat = this.signal.actionEvaluacionSunat
  private repository = inject(EvaluacionSunatRepository)
  private alert = inject(AlertService)
  formActualizarArchivo: FormGroup
  constructor() {
    this.formActualizarArchivo = new FormGroup({
      archivo: new FormControl('', [Validators.required])
    })
  }

  get titulo(): string {
    switch (this.tipoArchivo) {
      case 'RUC':
        return 'CONSULTA RUC'
      case 'TRABAJADORES':
        return 'TRABAJADORES PRESTADORES DE SERVICIO'
      case 'DEUDA':
        return 'DEUDA COACTIVA'
      case 'REPRESENTANTE':
        return 'REPRESENTANTE LEGAL'
      default:
        return 'Subir Archivo'
    }
  }
  private mapTipoArchivo(): string {
    switch (this.tipoArchivo) {
      case 'RUC':
        return 'CR'
      case 'TRABAJADORES':
        return 'TPS'
      case 'DEUDA':
        return 'DC'
      case 'REPRESENTANTE':
        return 'RL'
      default:
        return ''
    }
  }


  verArchivoActual() {

    if (!this.archivoActual) return

    window.open(
      `${environment.EndPoint}/wwwroot/Sunat/${this.archivoActual}`,
      '_blank'
    )
  }

  actualizarArchivoSunat = () => {
    this.loading = true
    console.log(this.formActualizarArchivo, 'actualizar el archivo sunat');
    
    if (this.formActualizarArchivo.invalid) {
      this.formActualizarArchivo.markAllAsTouched()
      this.loading = false
      return
    }

    const evaluacion = this.selectEvaluacionSunat()
    const tipo = this.mapTipoArchivo()
    const archivo: File = this.formActualizarArchivo.value.archivo

    console.log(tipo, 'tipo');
    
    if (!tipo) {
      this.alert.showAlert('Tipo de archivo inválido', 'error')
      this.loading = false
      return
    }

    const formData = new FormData()

    const payload = {
      CodigoSunat: evaluacion.idSunat,
      TipoArchivo: tipo
    }

    formData.append(
      'sunat_ActualizarArchivo',
      JSON.stringify(payload)
    )
    formData.append('archivo', archivo)

    for (const [key, value] of formData.entries()) {
      console.log(key, value)
    }

    this.repository.actualizarArchivoSunat(formData).subscribe({
      next: () => {
        this.loading = false
        this.alert.showAlert('Archivo actualizado correctamente', 'success')
        this.actionEvaluacionSunat.set('SUBIR ARCHIVO')
        this.closeDialog()
      },
      error: (err: ApiError) => {
        this.loading = false
        console.log(err)
        this.alert.showAlert(`Error al actualizar archivo, ${err.error.message}`, 'error')
      }
    })
  }

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

}
