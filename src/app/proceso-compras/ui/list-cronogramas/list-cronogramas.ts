import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { ActualizarPagoRealizado, AprobarCronogramaPago, DataCronograma, EliminarCronograma, InsertarCronogramaPago, ListarCronograma, ObservarCronogramaPago } from '@/proceso-compras/domain/models/cronograma.model';
import { CronogramaRepository } from '@/proceso-compras/domain/repository/cronograma.repository';
import { CommonModule } from '@angular/common';
import { Component, effect, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { DialogModule } from "primeng/dialog";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { AnexoPorFaseSignal } from '@/proceso-compras/domain/signals/anexoPorFase.signal';
import { CronogramaSignal } from '@/proceso-compras/domain/signals/cronograma.signal';
import { ArchivoAnexo, InsertarAnexoPorFase } from '@/proceso-compras/domain/models/anexoPorFase.model';
import { AnexoPorFaseRepository } from '@/proceso-compras/domain/repository/anexoSolicitud.repository';
import { FieldsetModule } from "primeng/fieldset";
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UiSelect } from '@/core/components/ui-select/ui-select.interface';
import { UiSelectComponent } from '@/core/components/ui-select/ui-select.component';
import { UiInputComponent } from '@/core/components/ui-input/ui-input.component';
import { UiDatePicker } from '@/core/components/ui-date-picker/ui-date-picker';
import { DataViewModule } from "primeng/dataview";
import { CheckboxModule } from "primeng/checkbox";
import { environment } from 'src/environments/environment';
import { ButtonModule } from "primeng/button";
import { UploadFileComponent } from '@/core/components/upload-file-component/upload-file-component';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { ListCarpetas } from "../list-carpetas/list-carpetas";
import { CarpetaSignal } from '@/proceso-compras/domain/signals/carpeta.signal';
import { Observable } from 'rxjs';
import { SolicitudCompraRepository } from '@/proceso-compras/domain/repository/solicitud-compra.repository';
import { OrdenCompraDetalleSignal } from '@/proceso-compras/domain/signals/ordenCompraDetalle.signal';
import { OrdenCarpetaSignal } from '@/panel-solicitudes/domain/signals/orden-carpetas.signal';
import { UiIconButton } from "@/core/components/ui-icon-button/ui-icon-button";
import { TagModule } from "primeng/tag";
import { AuthService } from '@/auth/infraestructure/services/auth.service';
import { ActualizarEstadoProximo } from '@/proceso-compras/domain/models/solicitud-compra.model';
import { InsertarCarpetasConAnexo } from '@/proceso-compras/domain/models/carpetas.models';
import { CarpetasRepository } from '@/proceso-compras/domain/repository/carpeta.repository';

@Component({
  selector: 'app-list-cronogramas',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, UiInputComponent, UploadFileComponent, UiDatePicker, DialogModule, UiSelectComponent, UiButtonComponent, FieldsetModule, DataViewModule, CheckboxModule, ButtonModule, UiLoadingProgressBarComponent, ListCarpetas, UiIconButton, TagModule],
  templateUrl: './list-cronogramas.html',
  styleUrl: './list-cronogramas.scss'
})
export class ListCronogramas implements OnInit {
  @Input() visible: boolean = false
  @Output() visibleChange = new EventEmitter<boolean>();
  private repository = inject(CronogramaRepository)

  private anexoRepository = inject(AnexoPorFaseRepository)
  private signalAnexo = inject(AnexoPorFaseSignal)
  actionAnexo = this.signalAnexo.actionAnexo
  private alert = inject(AlertService)
  loading: boolean = false

  private anexoSignal = inject(AnexoPorFaseSignal)
  listAnexo = this.anexoSignal.listAnexos
  selectAnexo = this.anexoSignal.selectAnexo
  selectArchivoAnexo = this.anexoSignal.selectArchivoAnexo

  private cronogramaSignal = inject(CronogramaSignal)
  listCronograma = this.cronogramaSignal.listCronograma
  selectCronogramas = this.cronogramaSignal.selectCronogramas
  selectCronograma = this.cronogramaSignal.selectCronograma
  selectCronogramaDefault = this.cronogramaSignal.selectCronogramaDefault

  private repositoryCarpetas = inject(CarpetasRepository)


  private repositorySolicitudCompra = inject(SolicitudCompraRepository)
  private signal = inject(OrdenCompraDetalleSignal)
  listOrdenCompra = this.signal.listOrdenCompraDetalle

  private userService = inject(AuthService)
  userData = this.userService.getUserData()

  collapsedId = signal<number | null>(null);
  cronogramaForm: FormGroup

  listCuotas: UiSelect[] = []
  listTipoDocumento: UiSelect[] = []
  archivoForm: FormGroup

  archivoObservandoId: number | null = null
  observarForm: FormGroup
  pagoRealizadoForm: FormGroup
  private carpetaSignal = inject(CarpetaSignal)
  actionCarpeta = this.carpetaSignal.actionCarpeta
  selectCarpeta = this.carpetaSignal.carpetaSelect

  private signalOrdenCarpeta = inject(OrdenCarpetaSignal)
  actionOrdenCompraCarpeta = this.signalOrdenCarpeta.actionOrdenCompraCarpeta
  actionOrdenCompra = this.signal.actionOrdenCompra
  visibleCarpeta: boolean = false
  idAnexoPorFaseCronograma: number = 0

  listTipoObservacion: UiSelect[] = [
    { text: 'ADJUNTAR GUÍA', value: 'ADJUNTAR GUÍA' },
    { text: 'FIRMAR DOCUMENTOS', value: 'FIRMAR DOCUMENTOS' },
    { text: 'ADJUNTAR SUSPENSIÓN DE 4TA', value: 'ADJUNTAR SUSPENSIÓN DE 4TA' },
    { text: 'ADJUNTAR SUSPENSIÓN DE 4TA', value: 'ADJUNTAR SUSPENSIÓN DE 4TA' },
    { text: 'OTROS', value: 'OTROS' },
  ]

  listTipoPago: UiSelect[] = [
    { text: 'TRANSFERENCIA', value: 'TRANSFERENCIA' },
    { text: 'CHEQUE', value: 'CHEQUE' }

  ]
  constructor() {
    this.cronogramaForm = new FormGroup({
      cuotas: new FormControl(null),
      tipoDocumento: new FormControl(null),
      cronogramas: new FormArray([])
    });


    this.archivoForm = new FormGroup({
      archivo: new FormControl<File | null>(null, Validators.required)
    })

    this.observarForm = new FormGroup({
      observacion: new FormControl('', [Validators.required, Validators.minLength(7)]),
      tipoObservacion: new FormControl('', [Validators.required])
    })

    this.pagoRealizadoForm = new FormGroup({
      fechaPagoRealizado: new FormControl('', [Validators.required]),
      tipoPago: new FormControl('', [Validators.required])
    })

    // effect(() => {

    //   if (!this.actionCarpeta()) return;
    //   if (this.actionCarpeta() === 'ACTUALIZAR ARCHIVO CRONOGRAMA') {

    //     this.actualizarArchivoCronograma();
    //     this.actionCarpeta.set('');
    //   }
    // })

  }
  ngOnInit(): void {
    this.obtenerOrdenCompraDetalle()
    this.listCuotas = [
      { text: '1 cuota', value: '1' },
      { text: '2 cuotas', value: '2' },
      { text: '3 cuotas', value: '3' },
      { text: '4 cuotas', value: '4' },
      { text: '5 cuotas', value: '5' },
      { text: '6 cuotas', value: '6' },
      { text: '7 cuotas', value: '7' },
      { text: '8 cuotas', value: '8' },
      { text: '9 cuotas', value: '9' },
      { text: '10 cuotas', value: '10' },
      { text: '11 cuotas', value: '11' },
      { text: '12 cuotas', value: '12' }
    ]
    this.listTipoDocumento = [
      { text: 'FACTURA', value: 'FACTURA' },
      { text: 'BOLETA', value: 'BOLETA' },
      { text: 'RECIBOS POR HONORARIOS', value: 'RECIBOS POR HONORARIOS' }
    ]

    this.cronogramaForm.get('cuotas')?.valueChanges.subscribe(
      (value: string) => {
        const cantidad = Number(value);
        this.seleccionarCuotas(cantidad);
      }
    )

    this.cronogramaForm.get('tipoDocumento')?.valueChanges.subscribe(value => {
      this.cronogramasForm.controls.forEach(c => {
        c.get('tipoDocumento')?.setValue(value, { emitEvent: false });
      });
    });
  }

  modoArchivo: 'CREAR' | 'EDITAR' | null = null;
  // guardarArchivo = () => {
  //  console.log(this.selectCronograma());

  //   if (!this.modoArchivo) return;
  //   this.idAnexoPorFaseCronograma = this.selectArchivoAnexo().idAnexosPorFase
  //   console.log(this.idAnexoPorFaseCronograma);

  //   this.modoArchivo == 'CREAR'
  //     ? this.visibleCarpeta = true
  //   : this.actualizarArchivoCronograma()
  // }
  guardarArchivo = () => {
    const lista = this.listCronograma();
    console.log(lista);

    if (!this.modoArchivo) return;

    this.idAnexoPorFaseCronograma = this.selectArchivoAnexo().idAnexosPorFase;
    console.log(this.idAnexoPorFaseCronograma);

    const hayAlgunArchivo = lista.some(item =>
      item.comprobante ||
      item.documentoTributario ||
      item.informeProveedor ||
      item.informeResponsable
    );

    if (hayAlgunArchivo) {
      this.actualizarArchivoCronograma();
    } else {
      // this.visibleCarpeta = true;
      this.insertarCarpetaConAnexo()
    }
  };

    insertarCarpetaConAnexo(): void {
      this.loading = true
      const payload: InsertarCarpetasConAnexo = {
        idAnexosPorFase: this.idAnexoPorFaseCronograma,
        idCarpeta: this.selectCarpeta().idCarpeta
      }
      console.log(payload, 'insertando carpetas con anexo en componente de carpetas');
  
      this.alert.sweetAlert('question', '¿Confirmar?', '¿Guardar archivo en la carpeta?')
        .then(ok => {
          if (!ok) return;
  
          this.repositoryCarpetas.insertarCarpetaConAnexo(payload)
            .subscribe({
              next: res => {
                this.loading = false
                this.alert.showAlert(`Guardado, ${res.message}`, 'success');
                this.actualizarArchivoCronograma()
              },
              error: err => {
                this.loading = false
                this.alert.showAlert(`Error, ${err.error?.Message}`, 'error');
              }
            });
        });
    }

  activarAnexoCronograma = () => {
    this.loading = true
    if (this.selectAnexo().nombre !== 'Cronograma') { return }
    let insertar: InsertarAnexoPorFase = {
      idAnexo: this.selectAnexo().idAnexo,
      idSolicitudCompra: this.listAnexo()[0].idSolicitudCompra
    }
    this.anexoRepository.insertarAnexo(insertar).subscribe({
      next: () => {
        this.loading = false
        this.alert.showAlert('Anexo generado correctamente', 'success')

        this.actionAnexo.set('Generar el cronograma');
      },
      error: () => {
        this.loading = false
        this.alert.showAlert('Error al generar el anexo', 'error')
      }
    })
  }

  obtenerCronograma = () => {
    this.loading = true;

    this.repository
      .obtenerCronograma(this.selectArchivoAnexo().idAnexosPorFase)
      .subscribe({
        next: (data: DataCronograma) => {
          this.listCronograma.set(
            data.data.map(c => ({
              ...c,
              edit: false,
              uploadTipo: null
            }))
          );

          this.alert.showAlert(`${data.message}`, 'success');
          this.loading = false;
        },
        error: (err: ApiError) => {
          this.alert.showAlert(`${err.userMessage}`, 'error');
          this.loading = false;
        }
      });
  }

  proveedorPorAnexo: Record<number, string> = {};
  cronogramasEsperados: {
    proveedor: string;
    idAnexosPorFase: number;
    index: number;
  }[] = [];
  obtenerOrdenCompraDetalle = () => {
    this.loading = true;

    this.repositorySolicitudCompra.obtenerOrdenCompraDetalle(this.listAnexo()[0].idSolicitudCompra)
      .subscribe({
        next: (data) => {
          console.log(data.data);
          this.listOrdenCompra.set(data.data);
          this.loading = false;
          this.cronogramasEsperados = [];

          this.listOrdenCompra()[0].anexosPorFases.forEach((anexo, index) => {

            if (anexo.ordenCompra && anexo.ordenCompra.length > 0) {

              const proveedor = anexo.ordenCompra[0].nombreProveedor;

              this.cronogramasEsperados.push({
                proveedor,
                idAnexosPorFase: anexo.idAnexosPorFase,
                index
              });

            }

          });

          const anexos = this.listOrdenCompra()[0]?.anexosPorFases ?? [];

          for (const anexo of anexos) {

            for (const orden of anexo.ordenCompra ?? []) {

              if (orden.idAnexoPorFaseCronograma) {
                this.proveedorPorAnexo[orden.idAnexoPorFaseCronograma] =
                  orden.nombreProveedor;
              }

            }

          }

        },
        error: (err: ApiError) => {
          this.alert.showAlert(`Error, ${err.error.message}`, 'error');
          this.loading = false;
        }
      });
  }


  get cronogramasForm(): FormArray {
    return this.cronogramaForm.get('cronogramas') as FormArray;
  }

  seleccionarCuotas(cantidad: number) {
    if (!cantidad) return;

    const actual = this.cronogramasForm.length;
    const tipoDocumento = this.cronogramaForm.get('tipoDocumento')?.value;

    if (cantidad > actual) {
      for (let i = actual; i < cantidad; i++) {
        this.cronogramasForm.push(
          new FormGroup({
            monto: new FormControl(null, Validators.required),
            fecha: new FormControl(null, Validators.required),
            concepto: new FormControl(null, Validators.required),
            tipoDocumento: new FormControl(tipoDocumento, Validators.required)
          })
        )
      }
    }

    if (cantidad < actual) {
      for (let i = actual; i > cantidad; i--) {
        this.cronogramasForm.removeAt(i - 1);
      }
    }
  }



  private toBackendISOExact(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');

    return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}` +
      `T${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}.` +
      `${date.getUTCMilliseconds().toString().padStart(3, '0')}Z`;
  }

  insertarCronograma = () => {
    this.loading = true;
    const idAnexoOrden = this.anexoOrdenSeleccionado?.idAnexosPorFase;
    const cronograma: InsertarCronogramaPago[] =
      this.cronogramasForm.value.map((c: any) => ({
        fecha: this.toBackendISOExact(new Date(c.fecha)),
        idAnexoPorFase: this.selectArchivoAnexo().idAnexosPorFase,
        monto: Number(c.monto),
        conceptoTributario: c.concepto,
        tipoDocumentoTributario: c.tipoDocumento,
        idAnexoPorFaseOrdenCompra: idAnexoOrden,
      }));

    console.log(cronograma);


    this.repository.insertarCronograma(cronograma).subscribe({
      next: (data: any) => {
        this.alert.showAlert(`${data.message}`, 'success');
        this.loading = false;
        this.cronogramasForm.clear();
        this.cronogramaForm.get('cuotas')?.reset();
        this.cronogramaForm.get('tipoDocumento')?.reset();
        this.obtenerCronograma();

        this.actionOrdenCompra.set(true)
        console.log('listar orden compra detalle');

      },
      error: (err: ApiError) => {
        this.alert.showAlert(`${err.userMessage}`, 'error');
        this.loading = false;
      }
    });
  }

  seleccionarCronograma = (cronograma: ListarCronograma, event: any) => {
    this.selectCronogramas.update(actual => {
      if (event.checked) {
        const existe = actual.some(
          c => c.idCronogramaPagoProveedor === cronograma.idCronogramaPagoProveedor
        );
        if (!existe) return [...actual, cronograma];
      } else {

        return actual.filter(
          c => c.idCronogramaPagoProveedor !== cronograma.idCronogramaPagoProveedor
        );
      }
      return actual;
    });
  }

  eliminarCronogramas = () => {
    this.loading = true

    const ids: number[] = this.selectCronogramas().map(
      c => c.idCronogramaPagoProveedor
    );

    const eliminar: EliminarCronograma[] = ids.map(id => ({
      idCronogramaPagoProveedor: id
    }));

    this.alert.sweetAlert('question', '¿Confirmar?', '¿Está seguro que desea eliminar?')
      .then(result => {
        if (!result) { this.loading = false; return }
        this.repository.eliminarCronograma(eliminar).subscribe({
          next: (data: ApiResponse) => {
            this.alert.showAlert(`${data.message}`, 'success')
            this.selectCronogramas.set([]);
            this.loading = false
            this.obtenerCronograma()
          },
          error: (err: ApiError) => {
            this.alert.showAlert(`${err.userMessage}`, 'error')
            this.loading = false
          }
        });
      })
  }

  onClickCronograma(event: MouseEvent, cronograma: ListarCronograma) {
    if (event.detail !== 2) return;

    cronograma.edit = true;

    const existe = this.cronogramasForm.controls.some(
      ctrl => ctrl.value.idCronogramaPagoProveedor === cronograma.idCronogramaPagoProveedor
    );

    if (!existe) {
      this.cronogramasForm.push(
        new FormGroup({
          idCronogramaPagoProveedor: new FormControl(cronograma.idCronogramaPagoProveedor),
          monto: new FormControl(cronograma.monto, Validators.required),
          fecha: new FormControl(new Date(cronograma.fecha), Validators.required),
          concepto: new FormControl(cronograma.conceptoTributario, Validators.required),
          tipoDocumento: new FormControl(cronograma.tipoDocumentoTributario, Validators.required)

        })
      );
    }
  }

  actualizarCronogramas(event: Event) {
    event.preventDefault();

    if (this.cronogramasForm.invalid) return;

    const actualizar = this.cronogramasForm.controls.map(ctrl => ({
      idCronogramaPagoProveedor: ctrl.value.idCronogramaPagoProveedor,
      monto: Number(ctrl.value.monto),
      fecha: this.toBackendISOExact(new Date(ctrl.value.fecha)),
      conceptoTributario: ctrl.value.concepto,
      tipoDocumentoTributario: ctrl.value.tipoDocumento
    }));

    if (!actualizar.length) return;
    this.repository.editarCronograma(actualizar).subscribe({
      next: (res: ApiResponse) => {
        this.alert.showAlert(res.message, 'success');

        this.listCronograma().forEach(c => c.edit = false);
        this.cronogramasForm.clear();
        this.obtenerCronograma();
      },
      error: (err: ApiError) => {
        this.alert.showAlert(err.userMessage, 'error');
        this.loading = false;
      }
    });
  }
  private archivoConfig: Record<string, {
    formKey: string;
    request: (formData: FormData) => Observable<any>;
    label: string;
  }> = {
      docTributario: {
        formKey: 'cronogramaPagoProveedor_ActualizarDocumentoTributario',
        request: (fd) => this.repository.actualizarDocTributaria(fd),
        label: 'Documento Tributario'
      },
      infProveedor: {
        formKey: 'cronogramaPagoProveedor_ActualizarInformeProveedor',
        request: (fd) => this.repository.actualizarInformeProveedor(fd),
        label: 'Informe del Proveedor'
      },
      infResponsable: {
        formKey: 'cronogramaPagoProveedor_ActualizarInformeResponsable',
        request: (fd) => this.repository.actualizarInformeResponsable(fd),
        label: 'Informe del Responsable'
      },
      comprobante: {
        formKey: 'cronogramaPagoProveedor_ActualizarComprobante',
        request: (fd) => this.repository.actualizarComprobanteCronograma(fd),
        label: 'Comprobante'
      }
    };



  actualizarArchivoCronograma = () => {
    console.log('actualizar archivo');

    if (this.archivoForm.invalid) return;
    this.loading = true

    const file = this.archivoForm.value.archivo as File;
    const cronograma = this.selectCronograma();
    const tipo = cronograma.uploadTipo;

    if (!tipo || !this.archivoConfig[tipo]) { this.loading = false; return };

    const config = this.archivoConfig[tipo];
    const formData = new FormData();

    formData.append(tipo, file);
    formData.append(
      config.formKey,
      JSON.stringify({
        CodigoCronogramaPagoProveedor: cronograma.idCronogramaPagoProveedor
      })
    );
    console.log(tipo);
    

    config.request(formData).subscribe({
      next: () => {
        this.alert.showAlert(
          `${config.label} actualizado correctamente`,
          'success'
        );
        this.loading = false
        cronograma.uploadTipo = null;
        this.archivoForm.reset();
        // this.actionAnexo.set('1');
        this.obtenerCronograma();
        this.actionOrdenCompraCarpeta.set('archivoAsignado')
        console.log(this.actionOrdenCompraCarpeta());

        this.selectCronograma.set(this.selectCronogramaDefault);
        if (tipo === 'comprobante') {
          this.actualizarEstadoProximo('Guia de Remision');
        }

      },
      error: (err: ApiError) => {
        console.log(err);

        this.alert.showAlert(`Error, ${err.error.message}`, 'error')
        this.loading = false
      }
    });
  };



  cancelarUpload = (cronograma: ListarCronograma) => {
    this.selectCronograma.set(this.selectCronogramaDefault)
    cronograma.uploadTipo = null;
  }

  anexoOrdenSeleccionado: any = null;
  collapsarCronograma = (collapsed: boolean, item: ArchivoAnexo, index: number) => {

    if (!collapsed) {

      this.collapsedId.set(item.idAnexosPorFase);
      this.selectArchivoAnexo.set(item);

      const orden = this.listOrdenCompra()?.[0];
      this.anexoOrdenSeleccionado = orden?.anexosPorFases?.[index];

      console.log(this.anexoOrdenSeleccionado, 'anexoordenseleccionado');

      this.obtenerCronograma();

    } else {
      this.collapsedId.set(null);
    }

  }

  selectedCronograma = (cronograma: ListarCronograma, tipo: 'comprobante' | 'docTributario' | 'infProveedor' | 'infResponsable') => {
    this.listCronograma().forEach(c => c.uploadTipo = null);
    cronograma.uploadTipo = tipo;
    this.selectCronograma.set(cronograma);
    this.archivoForm.reset();
  };


  observarArchivo = (archivo: ListarCronograma) => {
    this.archivoObservandoId = archivo.idCronogramaPagoProveedor;
    this.observarForm.reset();
  }
  cancelarObservacion() {
    this.archivoObservandoId = null;
    this.observarForm.reset();
  }

  aprobarCronogramaPago = (cronograma: ListarCronograma) => {
    this.loading = true
    let aprobarCronograma: AprobarCronogramaPago = {
      idCronogramaPagoProveedor: cronograma.idCronogramaPagoProveedor
    }
    console.log(aprobarCronograma, 'aprobar')
    this.repository.aprobarCronogramaPago(aprobarCronograma).subscribe({
      next: (data: ApiResponse) => {
        this.alert.showAlert(`Cronograma aprobado, ${data.message}`, 'success')
        this.loading = false
        cronograma.estado === 3
        this.actualizarEstadoProximo('Cargar Cronograma')
        // this.obtenerCronograma()
      },
      error: (err: ApiError) => {
        this.alert.showAlert(`Error al aprobar, ${err.userMessage}`)
        this.loading = false
      }
    })
  }

  actualizarEstadoProximo(estadoProximo : string) {
    const actualizarEstado: ActualizarEstadoProximo = {
      estadoProximo: estadoProximo,
      idSolicitudCompra: this.listAnexo()[0].idSolicitudCompra
    };

    this.repositorySolicitudCompra.actualizarEstadoProximo(actualizarEstado).subscribe({
      next: (res: ApiResponse) => {
        this.actionOrdenCompraCarpeta.set('estadoActualizado')
        this.alert.showAlert(`Estado actualizado. ${res.message}`, 'success');
      },
      error: (err: ApiError) => {
        this.alert.showAlert(`Error al actualizar estado, ${err.error.message}`, 'error');
      }
    });
  }

  observarCronogramaPago = (cronograma: ListarCronograma) => {
    this.loading = true
    let observarCronograma: ObservarCronogramaPago = {
      idCronogramaPagoProveedor: cronograma.idCronogramaPagoProveedor,
      observacion: this.observarForm.value.observacion,
      tipoObservacion: this.observarForm.value.tipoObservacion
    }
    console.log(observarCronograma, 'observar')
    this.repository.observarCronogramaPago(observarCronograma).subscribe({
      next: (data: ApiResponse) => {
        this.alert.showAlert(`Cronograma observado, ${data.message}`, 'success')
        cronograma.observacion = this.observarForm.value.observacion
        cronograma.tipoObservacion = this.observarForm.value.tipoObservacion
        this.loading = false
        this.cancelarObservacion()
        cronograma.estado === 2
        // this.obtenerCronograma()

      },
      error: (err: ApiError) => {
        this.alert.showAlert(`Error al observar, ${err.userMessage}`, 'error')
        this.loading = false
      }
    })
  }

  esFechaVacia(fecha: string): boolean {
    if (!fecha) return true;
    const d = new Date(fecha);
    return d.getFullYear() <= 1;
  }

  toggleEditPago = (cronograma: ListarCronograma) => {
    cronograma.editarPago = true;
  }

  cancelarEditPago = (cronograma: ListarCronograma) => {
    cronograma.editarPago = false;
  }

  guardarTipoPago = (cronograma: ListarCronograma) => {
    this.loading = true
    let pagoRealizado: ActualizarPagoRealizado = {
      fechaRealizado: this.pagoRealizadoForm.value.fechaPagoRealizado,
      idCronogramaPagoProveedor: cronograma.idCronogramaPagoProveedor,
      tipoPago: this.pagoRealizadoForm.value.tipoPago
    }
    console.log(pagoRealizado, 'pago realizado');

    this.repository.actualizarPagoRealizado(pagoRealizado).subscribe({
      next: (res: ApiResponse) => {
        this.loading = false
        this.alert.showAlert(`Guardado, ${res.message}`, 'success')
        cronograma.fechaPagoRealizado = this.pagoRealizadoForm.value.fechaPagoRealizado
        cronograma.tipoPago = this.pagoRealizadoForm.value.tipoPago
        this.cancelarEditPago(cronograma)
      },
      error: (err: ApiError) => {
        this.loading = false
        this.alert.showAlert(`Error al guardar, ${err.error.message}`, 'error')
      }
    })
  }


  verArchivoCronograma = (
    cronograma: ListarCronograma,
    campo: 'comprobante' | 'documentoTributario' | 'informeProveedor' | 'informeResponsable'
  ) => {
    const archivo = cronograma[campo];
    if (!archivo) return;

    const carpetas = {
      comprobante: 'comprobantes',
      documentoTributario: 'documentosTributarios',
      informeProveedor: 'informesProveedores',
      informeResponsable: 'informesResponsables',
    };

    window.open(
      `${environment.EndPoint}/wwwroot/${carpetas[campo]}/${archivo}`,
      '_blank'
    );
  };

  closeDialog = () => {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
