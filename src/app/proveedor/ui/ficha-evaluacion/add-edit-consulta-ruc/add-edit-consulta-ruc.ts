import { ProveedorRepository } from '@/proveedor/domain/repositories/proveedor.repository';
import { ProveedorSignal } from '@/proveedor/domain/signals/proveedor.signal';
import { ProveedorModule } from '@/proveedor/proveedor-module';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UiInputComponent } from "@/core/components/ui-input/ui-input.component";
import { UiSelectComponent } from "@/core/components/ui-select/ui-select.component";
import { UiSelect } from '@/core/components/ui-select/ui-select.interface';
import { UiDatePicker } from "@/core/components/ui-date-picker/ui-date-picker";
import { ProcesoComprasModule } from "@/proceso-compras/proceso-compras-module";
import { AlertService } from 'src/assets/demo/services/alert.service';
import { EditarConsultaRUC, InsertarConsultaRuc } from '@/proveedor/domain/models/consultaRuc.model';
import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { EvaluacionSunatSignal } from '@/proveedor/domain/signals/evaluacionSunat.signal';
import { EvaluacionSunatRepository } from '@/proveedor/domain/repositories/evaluacionSunat.repository';
import { ActualizarFechaConsulta } from '@/proveedor/domain/models/evaluacionSunat.model';
import { CardModule } from "primeng/card";

@Component({
  selector: 'app-add-edit-consulta-ruc',
  imports: [ProveedorModule, UiInputComponent, UiSelectComponent, UiDatePicker, ProcesoComprasModule, CardModule],
  templateUrl: './add-edit-consulta-ruc.html',
  styleUrl: './add-edit-consulta-ruc.scss'
})
export class AddEditConsultaRuc {
  @Input() modoFormularioRuc!: 'AGREGAR' | 'EDITAR' | 'CLONAR';
  @Output() cerrarFormulario = new EventEmitter<void>();

  private repository = inject(ProveedorRepository)
  private proveedorSignal = inject(ProveedorSignal)
  selectProveedor = this.proveedorSignal.proveedorSelect
  selectConsultaRuc = this.proveedorSignal.selectConsultaRuc
  selectConsultaRucDefault = this.proveedorSignal.selectConsultaRucDefault
  actionConsultaRuc = this.proveedorSignal.actionConsultaRuc
  private alert = inject(AlertService)
  formConsultaRuc: FormGroup
  estadoContribuyente: UiSelect[] = []
  condicionContribuyente: UiSelect[] = []
  tipoContribuyente: UiSelect[] = []
  sistemaContabilidad: UiSelect[] = []
  sistemaEmision: UiSelect[] = []
  sistemaEmisionElectronica: UiSelect[] = []

  private signal = inject(EvaluacionSunatSignal)
  listEvaluacionSunat = this.signal.listEvaluacionSunat
  selectEvaluacionSunat = this.signal.selectEvaluacionSunat

  hoy = new Date(new Date().setHours(0,0,0,0));

  fechaConsultaForm: FormGroup
  constructor() {
    this.formConsultaRuc = new FormGroup({
      nombreComercial: new FormControl('', [Validators.required]),
      estadoContribuyente: new FormControl('', [Validators.required]),
      condicionDelContribuyente: new FormControl('', [Validators.required]),
      tipoContribuyente: new FormControl('', [Validators.required]),
      actividadPrincipal: new FormControl('', [Validators.required]),
      actividadSecundaria: new FormControl('', [Validators.required]),
      actividadComercioExterior: new FormControl('', [Validators.required]),
      sistemaContabilidad: new FormControl('', [Validators.required]),
      sistemaEmisionDeComprobante: new FormControl('', [Validators.required]),
      sistemaDeEmisionElectronica: new FormControl('', [Validators.required]),
      comprobantesDePago: new FormControl('', [Validators.required]),
      fechaInscripcion: new FormControl('', [Validators.required]),
      fechaInicioDeActividades: new FormControl('', [Validators.required]),
      facturaDesde: new FormControl('', [Validators.required]),
      boletaDesde: new FormControl('', [Validators.required]),
      afiliadoAlPleDesde: new FormControl(''),
      padrones: new FormControl('', [Validators.required]),
      emisorElectronico: new FormControl('', [Validators.required])
    })

    this.fechaConsultaForm = new FormGroup({
      fechaConsulta: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
    const consulta = this.selectConsultaRuc();

    if (this.modoFormularioRuc === 'EDITAR' && consulta) {
      this.patchValue();
    }

    if (this.modoFormularioRuc === 'CLONAR' && consulta) {
      this.patchValue();
    }

    if (this.modoFormularioRuc === 'AGREGAR') {
      this.formConsultaRuc.reset();
    }

    this.estadoContribuyente = [
      { text: 'ACTIVO', value: 'ACTIVO' },
      { text: 'SUSPENDIDO', value: 'SUSPENDIDO' },
      { text: 'BAJA DE OFICIO', value: 'BAJA DE OFICIO' },
      { text: 'BAJA DEFINITIVA', value: 'BAJA DEFINITIVA' }
    ]

    this.condicionContribuyente = [
      { text: 'HABIDO', value: 'HABIDO' },
      { text: 'NO HABIDO', value: 'NO HABIDO' },
      { text: 'NO HALLADO', value: 'NO HALLADO' }
    ];

    this.tipoContribuyente = [
      { text: 'PERSONA NATURAL', value: 'PERSONA NATURAL' },
      { text: 'SOCIEDAD ANÓNIMA CERRADA', value: 'SOCIEDAD ANONIMA CERRADA' },
      { text: 'SOCIEDAD ANÓNIMA', value: 'SOCIEDAD ANONIMA' },
      { text: 'E.I.R.L.', value: 'E.I.R.L.' },
      { text: 'S.A.A.', value: 'S.A.A.' }
    ];

    this.sistemaContabilidad = [
      { text: 'MANUAL', value: 'MANUAL' },
      { text: 'COMPUTARIZADO', value: 'COMPUTARIZADO' }
    ];

    this.sistemaEmision = [
      { text: 'MANUAL', value: 'MANUAL' },
      { text: 'ELECTRÓNICO', value: 'ELECTRÓNICO' }
    ];
  }

  toIso(date: any): string | null {
    if (!date) return null;

    const d = new Date(date);

    if (isNaN(d.getTime())) return null;

    return d.toISOString();
  }

  onSubmit = () => {

  if (this.formConsultaRuc.invalid || this.fechaConsultaForm.invalid) {
    this.formConsultaRuc.markAllAsTouched();
    this.fechaConsultaForm.markAllAsTouched();
    return;
  }

    const esEditar = this.modoFormularioRuc === 'EDITAR';
    const esClonar = this.modoFormularioRuc === 'CLONAR';
    const esNuevo = this.modoFormularioRuc === 'AGREGAR';

    const accion =
      esEditar ? 'Editar'
        : esClonar ? 'Clonar'
          : 'Crear';

    this.alert.sweetAlert(
      'question',
      '¿Confirmar?',
      `¿Está seguro que desea ${accion}?`
    )
      .then(isConfirm => {

        if (!isConfirm) return;

        const consultaSeleccionada = this.selectConsultaRuc();

        const consultaBase = {

          idSunat: this.selectEvaluacionSunat().idSunat,
          ruc: this.selectProveedor().ruc.trim(),

          tipoContribuyente: this.formConsultaRuc.value.tipoContribuyente,
          nombreComercial: this.formConsultaRuc.value.nombreComercial,

          fechaInscripcion: this.toIso(this.formConsultaRuc.value.fechaInscripcion),
          fechaInicioDeActividades: this.toIso(this.formConsultaRuc.value.fechaInicioDeActividades),

          estadoContribuyente: this.formConsultaRuc.value.estadoContribuyente,
          condicionDelContribuyente: this.formConsultaRuc.value.condicionDelContribuyente,

          direccion: this.selectProveedor().direccion,

          sistemaEmisionDeComprobante: this.formConsultaRuc.value.sistemaEmisionDeComprobante,
          actividadComercioExterior: this.formConsultaRuc.value.actividadComercioExterior,
          sistemaContabilidad: this.formConsultaRuc.value.sistemaContabilidad,
          actividadPrincipal: this.formConsultaRuc.value.actividadPrincipal,
          actividadSecundaria: this.formConsultaRuc.value.actividadSecundaria,
          comprobantesDePago: this.formConsultaRuc.value.comprobantesDePago,
          sistemaDeEmisionElectronica: this.formConsultaRuc.value.sistemaDeEmisionElectronica,

          emisorElectronicoDesde: this.toIso(this.formConsultaRuc.value.emisorElectronico),
          facturaDesde: this.toIso(this.formConsultaRuc.value.facturaDesde),
          boletaDesde: this.toIso(this.formConsultaRuc.value.boletaDesde),
          afiliadoAlPleDesde: this.toIso(this.formConsultaRuc.value.afiliadoAlPleDesde),

          padrones: this.formConsultaRuc.value.padrones,

        };

        if (esEditar) {

          const consultaEditar: EditarConsultaRUC = {
            ...consultaBase,
            idConsultaRuc: consultaSeleccionada!.idConsultaRuc
          };

          this.editar(consultaEditar);
          return;
        }

        const consultaCrear: InsertarConsultaRuc = consultaBase;

        this.guardar(consultaCrear);

      });

  }



  editar = (editConsulta: EditarConsultaRUC) => {
    console.log(editConsulta, 'editar consulta');

    this.repository.editarConsultaRUC(editConsulta).subscribe({
      next: (res: ApiResponse) => {
        // this.cerrarFormulario.emit();
        this.alert.showAlert(`Editando, ${res.message}`, 'success')
        if(res.isSuccess){
          this.actualizarFechaConsulta()
        }
        // this.actionConsultaRuc.set('EDITAR')
      },
      error: (err: ApiError) => {
        console.log(err);
        
        this.alert.showAlert(`Error, ${err.error.message}`, 'error')
      }
    })
  }

  guardar = (newConsulta: InsertarConsultaRuc) => {
    this.repository.agregarConsultaRuc(newConsulta).subscribe({
      next: (res: ApiResponse) => {
        
        this.alert.showAlert(`guardando, ${res.message}`, 'success')
        if(res.isSuccess){
          this.actualizarFechaConsulta()
        }
        // this.actionConsultaRuc.set('GUARDAR')
      },
      error: (err: ApiError) => {
        console.log(err);
        this.alert.showAlert(`Error, ${err.error.message}`, 'error')
      }
    })
  }

   private evaluacionRepository = inject(EvaluacionSunatRepository)
   actionFechaConsulta = this.signal.actionFechaConsulta
     actionCerrarDrawer = this.signal.actionCerrarDrawer
      actualizarFechaConsulta = () => {
        let actualizarFecha: ActualizarFechaConsulta = {
          fechaConsultaSunat: new Date(this.fechaConsultaForm.value.fechaConsulta).toISOString(),
          idSunat: this.selectEvaluacionSunat().idSunat,
          tipoArchivoSunat: 'CR'
        }
    
        this.evaluacionRepository.actualizarFechaConsulta(actualizarFecha).subscribe({
          next: (res: ApiResponse) => {
            this.alert.showAlert(`Fecha Actualizada, ${res.message}`)
            this.actionConsultaRuc.set('GUARDAR')
            this.actionFechaConsulta.set('ACTUALIZAR FECHA')
            this.actionCerrarDrawer.set('CERRAR DRAWER')
            this.cerrarFormulario.emit();
          },
          error: (err: ApiError) => {
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
    const data = this.selectConsultaRuc();

    this.formConsultaRuc.patchValue({
      nombreComercial: data.nombreComercial,
      estadoContribuyente: data.estadoContribuyente,
      condicionDelContribuyente: data.condicionDelContribuyente,
      tipoContribuyente: data.tipoContribuyente,
      actividadPrincipal: data.actividadPrincipal,
      actividadSecundaria: data.actividadSecundaria,
      actividadComercioExterior: data.actividadComercioExterior,
      sistemaContabilidad: data.sistemaContabilidad,
      sistemaEmisionDeComprobante: data.sistemaEmisionDeComprobante,
      sistemaDeEmisionElectronica: data.sistemaDeEmisionElectronica,
      comprobantesDePago: data.comprobantesDePago,

      fechaInscripcion: this.toDate(data.fechaInscripcion),
      fechaInicioDeActividades: this.toDate(data.fechaInicioDeActividades),
      facturaDesde: this.toDate(data.facturaDesde),
      boletaDesde: this.toDate(data.boletaDesde),
      afiliadoAlPleDesde: this.toDate(data.afiliadoAlPleDesde),

      padrones: data.padrones,
      emisorElectronico: this.toDate(data.emisorElectronicoDesde),
    });

   if (this.modoFormularioRuc !== 'CLONAR') {
  this.fechaConsultaForm.patchValue({
    fechaConsulta: this.toDate(this.selectEvaluacionSunat().fechaConsultaRuc)
  });
}
  }

  
cancelar() {
  this.cerrarFormulario.emit();
}


}
