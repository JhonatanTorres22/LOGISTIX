import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { ActualizarObservacion, AgregarEvaluacionSunat, ListEvaluacionSunat } from '@/proveedor/domain/models/evaluacionSunat.model';
import { EvaluacionSunatRepository } from '@/proveedor/domain/repositories/evaluacionSunat.repository';
import { EvaluacionSunatSignal } from '@/proveedor/domain/signals/evaluacionSunat.signal';
import { ProveedorSignal } from '@/proveedor/domain/signals/proveedor.signal';
import { Component, effect, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { DrawerModule } from "primeng/drawer";
import { TableModule } from "primeng/table";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { TagModule } from "primeng/tag";
import { InputTextModule } from 'primeng/inputtext';
import { UiIconButton } from "@/core/components/ui-icon-button/ui-icon-button";
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { UiCardNotItemsComponent } from "@/core/components/ui-card-not-items/ui-card-not-items.component";
import { FichaEvaluacion } from "../ficha-evaluacion/ficha-evaluacion";
import { UploadArchivoSunat } from "../upload-archivo-sunat/upload-archivo-sunat";
import { environment } from 'src/environments/environment';
import { ProveedorModule } from '@/proveedor/proveedor-module';
import { ProveedorRepository } from '@/proveedor/domain/repositories/proveedor.repository';
import { ActualizarEvaluacion } from '@/proveedor/domain/models/proveedor.model';
import { MenuModule } from "primeng/menu";

@Component({
  selector: 'app-evaluacion-sunat',
  imports: [ProveedorModule, DrawerModule, TableModule, IconFieldModule, InputIconModule, UiButtonComponent, TagModule, InputTextModule, UiIconButton, UiLoadingProgressBarComponent, UiCardNotItemsComponent, FichaEvaluacion, UploadArchivoSunat, MenuModule],
  templateUrl: './evaluacion-sunat.html',
  styleUrl: './evaluacion-sunat.scss'
})
export class EvaluacionSunat implements OnInit {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>()
  loading: boolean = false
  private repository = inject(EvaluacionSunatRepository)
  private alert = inject(AlertService)
  private signal = inject(EvaluacionSunatSignal)
  listEvaluacionSunat = this.signal.listEvaluacionSunat
  selectEvaluacionSunat = this.signal.selectEvaluacionSunat
  actionEvaluacionSunat = this.signal.actionEvaluacionSunat
  actionFechaConsulta = this.signal.actionFechaConsulta
  private signalProveedor = inject(ProveedorSignal)
  selectProveedor = this.signalProveedor.proveedorSelect
  visibleAdd: boolean = false
  visibleSubirArchivo: boolean = false
  tipoArchivoSeleccionado: 'RUC' | 'TRABAJADORES' | 'DEUDA' | 'REPRESENTANTE' | null = null;
  private repositoryProveedor = inject(ProveedorRepository)

  mostrarObservacion: boolean = false
  constructor() {
    effect(() => {
      if (this.actionEvaluacionSunat() == '') { return }
      if (this.actionEvaluacionSunat() !== '') {
        this.obtenerEvaluacionSunat()
        this.actionEvaluacionSunat.set('')
      }
    })

    effect(() => {
      if (this.actionFechaConsulta() == '') { return }
      if (this.actionFechaConsulta() !== '') {
        this.obtenerEvaluacionSunat()
        this.actionFechaConsulta.set('')
      }
    })
  }

  ngOnInit(): void {
    this.obtenerEvaluacionSunat()
  }

  obtenerEvaluacionSunat = () => {
    this.loading = true
    this.repository.obtenerEvaluacionSunat(this.selectProveedor().id).subscribe({
      next: (data) => {
        this.loading = false
        this.alert.showAlert(`Listando, ${data.message}`, 'success')
        this.listEvaluacionSunat.set(data.data)

        const ultimaEvaluacion = this.listEvaluacionSunat()[this.listEvaluacionSunat().length - 1]
        if (ultimaEvaluacion.archivoConsultaRuc && ultimaEvaluacion.fechaConsultaRuc !== '0001-01-01T00:00:00'
          && ultimaEvaluacion.archivoTrabajadoresPrestadores && ultimaEvaluacion.fechaTrabajadoresPrestadores !== '0001-01-01T00:00:00'
          && ultimaEvaluacion.archivoDeudaCoactiva && ultimaEvaluacion.fechaDeudaCoactiva !== '0001-01-01T00:00:00'
          && ultimaEvaluacion.archivoRepresentanteLegal && ultimaEvaluacion.fechaRepresentanteLegal !== '0001-01-01T00:00:00') {
          this.mostrarObservacion = true
        }
      },
      error: (err: ApiError) => {
        this.loading = false
        this.alert.showAlert(`Error, ${err.error.message}`, 'error')
      }
    })
  }

  seleccionarEvaluacion = (evaluacion: ListEvaluacionSunat) => {
    console.log('**');
    this.selectEvaluacionSunat.set(evaluacion)
    this.visibleAdd = true
  }
  abrirSubidaArchivo(evaluacion: ListEvaluacionSunat, tipo: 'RUC' | 'TRABAJADORES' | 'DEUDA' | 'REPRESENTANTE') {
    this.selectEvaluacionSunat.set(evaluacion)
    this.tipoArchivoSeleccionado = tipo
    this.visibleSubirArchivo = true
  }

  itemsArchivo: any[] = []

  @ViewChild('menuArchivo') menuArchivo!: any

  abrirMenuArchivo(
    event: Event,
    evaluacion: ListEvaluacionSunat,
    tipo: 'RUC' | 'TRABAJADORES' | 'DEUDA' | 'REPRESENTANTE'
  ) {

    this.selectEvaluacionSunat.set(evaluacion)
    this.tipoArchivoSeleccionado = tipo
    const puedeActualizar = this.listEvaluacionSunat()[this.listEvaluacionSunat().length - 1].idSunat === evaluacion.idSunat && this.selectProveedor().evaluacion === 'EVALUACIÓN EN PROCESO';
    this.itemsArchivo = [
      {
        label: 'Ver archivo',
        icon: 'pi pi-eye',
        command: () => {
          this.verArchivo(this.selectEvaluacionSunat(), this.tipoArchivoSeleccionado!)
        }
      },
      {
        label: 'Actualizar archivo',
        icon: 'pi pi-upload',
        visible: puedeActualizar,
        command: () => {
          this.abrirSubidaArchivo(this.selectEvaluacionSunat(), this.tipoArchivoSeleccionado!)
        }
      }
    ]

    this.menuArchivo.toggle(event)
  }


  validarEvaluaciones = (): { valido: boolean, cantidad?: number } => {

    const lista = this.listEvaluacionSunat()

    if (!lista || lista.length === 0) {
      return { valido: true }
    }
    let contadorErrores = 0
    const esFechaVacia = (fecha: string | null | undefined): boolean => {
      return !fecha || fecha.startsWith('0001-01-01')
    }

    lista.forEach(item => {

      if (!item.archivoConsultaRuc) contadorErrores++
      if (!item.archivoTrabajadoresPrestadores) contadorErrores++
      if (!item.archivoDeudaCoactiva) contadorErrores++
      if (!item.archivoRepresentanteLegal) contadorErrores++
      if (esFechaVacia(item.fechaConsultaRuc)) contadorErrores++
      if (esFechaVacia(item.fechaTrabajadoresPrestadores)) contadorErrores++
      if (esFechaVacia(item.fechaDeudaCoactiva)) contadorErrores++
      if (esFechaVacia(item.fechaRepresentanteLegal)) contadorErrores++

    })

    if (contadorErrores > 0) {
      return {
        valido: false,
        cantidad: contadorErrores
      }
    }

    return { valido: true }
  }



  agregar = () => {
    const proveedor = this.selectProveedor()
    const evaluaciones = this.listEvaluacionSunat()
    const ultimaEvaluacion = evaluaciones.at(-1) // obtiene la última

    if (proveedor.evaluacion === 'EVALUACIÓN EN PROCESO' && evaluaciones.length > 0) {
      this.alert.sweetAlert(
        'warning',
        '¡Importante!',
        'Ya existe una evaluación en proceso, no se pueden agregar más evaluaciones hasta que se resuelva la evaluación actual.'
      )
      return
    }

    if (
      proveedor.evaluacion === 'RECHAZADO' &&
      ultimaEvaluacion &&
      !ultimaEvaluacion.observacion
    ) {
      this.alert.sweetAlert(
        'warning',
        '¡Importante!',
        'La última evaluación fue rechazada y debe tener una observación antes de registrar una nueva.'
      )
      return
    }
    this.loading = true
    const validacion = this.validarEvaluaciones()

    if (!validacion.valido) {
      this.alert.sweetAlert('warning', '¡Importante!', `Hay ${validacion.cantidad} campos pendientes por completar`)
      this.loading = false
      return
    }

    this.alert.sweetAlert('question', '¿Confirmar?', '¿Está seguro que desea guardar la evaluación?')
      .then(isConfirm => {
        if (!isConfirm) { this.loading = false; return }
        let agregar: AgregarEvaluacionSunat = {
          idProveedor: this.selectProveedor().id
        }
        this.repository.agregarEvaluacionSunat(agregar).subscribe({
          next: (res: ApiResponse) => {
            this.loading = false
            this.alert.showAlert(`Agregado, ${res.message}`, 'success')
            if (res.isSuccess) {
              let evaluacion: ActualizarEvaluacion = {
                id: this.selectProveedor().id,
                evaluacion: 'EVALUACIÓN EN PROCESO'
              }
              this.repositoryProveedor.actualizarEvaluacion(evaluacion).subscribe({
                next: (res: ApiResponse) => {
                  this.loading = false
                  this.alert.showAlert(`Evaluación actualizada, ${res.message}`, 'success')
                  this.selectProveedor().evaluacion = evaluacion.evaluacion
                },
                error: (err: ApiError) => {
                  this.loading = false
                  this.alert.showAlert(`Error, ${err.error.message}`, 'error')
                }

              })

              // this.actualizarObservacionProveedor('EVALUACIÓN EN PROCESO')
            }
            this.obtenerEvaluacionSunat()
          },
          error: (err: ApiError) => {
            this.loading = false
            this.alert.showAlert(`Error, ${err.error.message}`)
          }
        })
      })
  }

  verArchivo = (evaluacion: ListEvaluacionSunat, tipo: 'RUC' | 'TRABAJADORES' | 'DEUDA' | 'REPRESENTANTE') => {

    let nombreArchivo: string | null = null

    switch (tipo) {
      case 'RUC':
        nombreArchivo = evaluacion.archivoConsultaRuc
        break

      case 'TRABAJADORES':
        nombreArchivo = evaluacion.archivoTrabajadoresPrestadores
        break

      case 'DEUDA':
        nombreArchivo = evaluacion.archivoDeudaCoactiva
        break

      case 'REPRESENTANTE':
        nombreArchivo = evaluacion.archivoRepresentanteLegal
        break
    }

    if (!nombreArchivo) {
      this.alert.showAlert('No existe archivo para visualizar', 'warning')
      return
    }

    window.open(
      `${environment.EndPoint}/wwwroot/Sunat/${nombreArchivo}`,
      '_blank'
    )
  }

  closeDrawer() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  tempObservacion: string = '';

  guardarObservacion = (sunat: ListEvaluacionSunat) => {
    this.alert.sweetAlert('question', '¿Confirmar?', `¿Está seguro que desea guardar observación?`)
      .then(isConfirm => {
        if (!isConfirm) { this.loading = false; return }

        this.loading = true
        let observacion: ActualizarObservacion = {
          idSunat: sunat.idSunat,
          observacion: sunat.observacion
        }
        console.log(observacion);

        this.repository.actualizarObservacion(observacion).subscribe({
          next: (res: ApiResponse) => {
            this.loading = false
            this.alert.showAlert(`Observacion actualizada, ${res.message}`, 'success')
            this.obtenerEvaluacionSunat()
          },
          error: (err: ApiError) => {
            console.log(err);
            this.loading = false
            this.alert.showAlert(`Error, ${err.error.message}`, 'error')
          }
        })
      })
  }

  itemsMenu: any[] = [];
  @ViewChild('menu') menu!: any;

  abrirMenu(event: Event) {

    this.itemsMenu = [
      {
        label: 'APROBADO',
        icon: 'pi pi-check',
        command: () => this.actualizarObservacionProveedor('APROBADO')
      },
      {
        label: 'RECHAZADO',
        icon: 'pi pi-times',
        command: () => this.actualizarObservacionProveedor('RECHAZADO')
      },
      {
        label: 'EVALUACIÓN EN PROCESO',
        icon: 'pi pi-clock',
        command: () => this.actualizarObservacionProveedor('EVALUACIÓN EN PROCESO')
      }
    ].filter(e => e.label !== this.selectProveedor().evaluacion);

    this.menu.toggle(event);
  }

  getColorEvaluacion(estado: string): string {
    switch (estado) {
      case 'APROBADO':
        return 'info';

      case 'RECHAZADO':
        return 'danger';

      case 'EVALUACIÓN EN PROCESO':
        return 'warn';

      default:
        return 'secondary';
    }
  }

  actualizarObservacionProveedor = (nuevaEvaluacion: string) => {
    this.loading = true
    let evaluacion: ActualizarEvaluacion = {
      evaluacion: nuevaEvaluacion,
      id: this.selectProveedor().id
    }

    this.alert.sweetAlert('question', '¿Confirmar?', `¿Está seguro que desea cambiar el estado?`)
      .then(isConfirm => {
        if (!isConfirm) { this.loading = false; return }

        this.repositoryProveedor.actualizarEvaluacion(evaluacion).subscribe({
          next: (res: ApiResponse) => {
            this.loading = false
            this.alert.showAlert(`Evaluación actualizada, ${res.message}`, 'success')
            this.selectProveedor().evaluacion = evaluacion.evaluacion
          },
          error: (err: ApiError) => {
            this.loading = false
            this.alert.showAlert(`Error, ${err.error.message}`, 'error')
          }

        })
      })
  }

}
