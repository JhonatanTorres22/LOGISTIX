import { AprobarAnexoPorFase, ArchivoAnexo, EnviarConstanciaFirma, InsertarAnexoPorFase, ObservarAnexoPorFase, ResponseAnexoPorFase } from '@/proceso-compras/domain/models/anexoPorFase.model';
import { AnexoPorFaseRepository } from '@/proceso-compras/domain/repository/anexoSolicitud.repository';
import { Component, effect, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Dialog } from "primeng/dialog";
import { AlertService } from 'src/assets/demo/services/alert.service';
import { UploadFileComponent } from "@/core/components/upload-file-component/upload-file-component";
import { ListSolicitudCompra } from '../list-solicitud-compra/list-solicitud-compra';
import { AnexoPorFaseSignal } from '@/proceso-compras/domain/signals/anexoPorFase.signal'
import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { UiSelect } from '@/core/components/ui-select/ui-select.interface';
import { DataViewModule } from 'primeng/dataview';
import { FieldsetModule } from 'primeng/fieldset';
import { CheckboxModule } from 'primeng/checkbox';
import { ProcesoComprasModule } from '@/proceso-compras/proceso-compras-module';
import { environment } from 'src/environments/environment';
import { ListCarpetas } from "../list-carpetas/list-carpetas";
import { CarpetaSignal } from '@/proceso-compras/domain/signals/carpeta.signal';
import { PERMISOS } from '@/auth/infraestructure/services/permisos.constants';
import { PermissionService } from '@/auth/infraestructure/services/permisos.service';
import { CardModule } from "primeng/card";
import { PdfOrdenCompra } from "../pdf-orden-compra/pdf-orden-compra";
import { ProveedorProductoSignal } from '@/proveedor-producto/domain/signals/proveedor-producto.signal';
import { AuthService } from '@/auth/infraestructure/services/auth.service';
import { SolicitudCompraRepository } from '@/proceso-compras/domain/repository/solicitud-compra.repository';
import { OrdenCompraDetalleSignal } from '@/proceso-compras/domain/signals/ordenCompraDetalle.signal';
import { OrdenCarpetaSignal } from '@/panel-solicitudes/domain/signals/orden-carpetas.signal';

@Component({
  selector: 'app-upload-archivo',
  standalone : true,
  imports: [ProcesoComprasModule, Dialog, ProcesoComprasModule, FieldsetModule, UploadFileComponent, CheckboxModule, DataViewModule, ListCarpetas, CardModule, PdfOrdenCompra],
  templateUrl: './upload-archivo.html',
  styleUrl: './upload-archivo.scss'
})
export class UploadArchivo implements OnInit {

  loading: boolean = false
  @Input() visible: boolean = false
  @Output() visibleChange = new EventEmitter<boolean>();
  private anexoSignal = inject(AnexoPorFaseSignal)
  listAnexo = this.anexoSignal.listAnexos
  selectAnexo = this.anexoSignal.selectAnexo
  actionAnexo = this.anexoSignal.actionAnexo
  actionOrdenFirmada = this.anexoSignal.actionOrdenFirmada

  selectArchivoAnexo = this.anexoSignal.selectArchivoAnexo
  siglaArea = this.anexoSignal.siglaArea

  solicitudSignal = inject(ListSolicitudCompra)
  listSolicitud = this.solicitudSignal.listSolicitud

  anexoRepository = inject(AnexoPorFaseRepository)
  archivoForm: FormGroup

  observarForm: FormGroup
  cronogramaForm: FormGroup
  listCuotas: UiSelect[] = []
  collapsedId = signal<number | null>(null);
  visibleCarpeta: boolean = false

  private carpetaSignal = inject(CarpetaSignal)
  actionCarpeta = this.carpetaSignal.actionCarpeta

  archivoObservandoId: number | null = null;
  mostrarSubirArchivo: boolean = false
  archivoEditandoId: number | null = null;
  // codigoAnexoPorFaseActual: number | null = null
  archivoAnexoPorFaseActual: string | null = null
  modoArchivo: 'CREAR' | 'EDITAR' | null = null;

  permissionService = inject(PermissionService)
  solicitudPermiso = PERMISOS.SOLICITUDCOMPRA;
  permisosSolicitud = this.permissionService.resolve(this.solicitudPermiso)


  private repository = inject(SolicitudCompraRepository)
  signalProveedorProducto = inject(ProveedorProductoSignal)
  selectProveedorProducto = this.signalProveedorProducto.selectProveedorProducto

  private signal = inject(OrdenCompraDetalleSignal)
  listOrdenCompra = this.signal.listOrdenCompraDetalle

  idNuevoAnexoPorFase: number = 0

    private signalOrdenCarpeta = inject(OrdenCarpetaSignal)
  actionOrdenCompraCarpeta = this.signalOrdenCarpeta.actionOrdenCompraCarpeta
  constructor(
    private alert: AlertService
  ) {
    this.cronogramaForm = new FormGroup({
      cuotas: new FormControl(null),
      cronogramas: new FormArray([])
    })
    this.archivoForm = new FormGroup({
      archivo: new FormControl<File | null>(null, Validators.required)
    })

    this.observarForm = new FormGroup({
      observacion: new FormControl('', [Validators.required, Validators.minLength(7)])
    })

    effect(() => {

      if (!this.actionCarpeta()) return;
      if (this.actionCarpeta() === 'INSERTAR CARPETA CON ANEXO') {
        console.log(this.actionCarpeta(), 'accion de la carpeta');

        if (this.selectAnexo().nombre == 'Orden de Compra') {
          this.uploadArchivoOrdenCompra()
        }
        else {
          this.uploadArchivo()
        }
        this.actionCarpeta.set('');
      }
    })

    effect(() => {
      console.log(this.actionOrdenFirmada());
      
      if (this.actionOrdenFirmada() == '') return;
      if (this.actionOrdenFirmada() === 'ENVIAR CORREO ORDEN FIRMADA') {
        console.log(this.actionOrdenFirmada(), 'desde upload');
        
        const archivos = this.selectAnexo().archivos;
        const ultimoAnexo = archivos[archivos.length - 1];
        this.archivoAnexoPorFaseActual = ultimoAnexo.archivo;
        this.enviarConstanciaFirma();
        this.actionOrdenFirmada.set('');
      }
    })
  }


  proveedores: any[] = [];

  ngOnInit(): void {
    if (this.selectAnexo().nombre == 'Orden de Compra' || this.selectAnexo().nombre == 'Orden Firmada') {
      this.obtenerOrdenCompraDetalle()
    }
  }


  obtenerOrdenCompraDetalle = () => {
    this.loading = true;

    this.repository.obtenerOrdenCompraDetalle(this.listSolicitud()[0].idSolicitudCompra)
      .subscribe({
        next: (data) => {
          console.log(data.data);
          this.listOrdenCompra.set(data.data);
          this.loading = false;

          this.proveedores = [];

          this.listOrdenCompra()[0].anexosPorFases.forEach(anexo => {

            if (anexo.ordenCompra && anexo.ordenCompra.length > 0) {

              const proveedoresUnicos = Array.from(
                new Set(anexo.ordenCompra.map(o => o.nombreProveedor))
              );

              proveedoresUnicos.forEach(prov => {

                this.proveedores.push({
                  proveedor: prov,
                  idAnexosPorFase: anexo.idAnexosPorFase,
                  tieneArchivo: !!anexo.archivo   // aquí detectas si tiene archivo
                });

              });

            } else {

              this.proveedores.push({
                proveedor: 'Sin proveedor',
                idAnexosPorFase: anexo.idAnexosPorFase,
                tieneArchivo: !!anexo.archivo
              });

            }

          });
        },
        error: (err: ApiError) => {
          this.alert.showAlert(`Error, ${err.error.message}`, 'error');
          this.loading = false;
        }
      });
  }


  proveedoresAgrupados: any[] = [];

  // Variable para guardar el anexo seleccionado
  anexoSeleccionado: any = null;

seleccionarProveedor(item: any) {

  const nombreProveedor = item.proveedor;
  const idAnexo = item.idAnexosPorFase;

  const list = this.listOrdenCompra();
  if (!list?.length) return;

  const anexos = list[0].anexosPorFases;

  const anexo = anexos.find(a => a.idAnexosPorFase === idAnexo);
  if (!anexo) return;

  const productosProveedor = anexo.ordenCompra.filter(
    o => o.nombreProveedor === nombreProveedor
  );

  this.proveedoresAgrupados = productosProveedor;
  this.visiblePdfOrden = true;
  this.selectProveedorProducto.set(productosProveedor);

}

  guardarArchivo() {
    if (!this.modoArchivo) return;
    if (this.archivoForm.invalid) return;

    if (this.selectAnexo().nombre !== 'Orden de Compra' && this.selectAnexo().nombre !== 'Documentacion Preliminar') {
      this.modoArchivo === 'CREAR'
        ? this.insertarAnexoFase()
        : this.uploadArchivo();
    }
    else if(this.selectAnexo().nombre == 'Orden de Compra') {
      if (!this.tieneArchivoActual) {
        this.visibleCarpeta = true
        return
      }
      else {
        this.uploadArchivoOrdenCompra()
      }

    }
    else if(this.selectAnexo().nombre == 'Documentacion Preliminar'){
      this.modoArchivo === 'CREAR'
        ? this.insertarAnexoFase()
        : this.uploadArchivo();
    }
  }

  insertarAnexoFase = () => {
    this.loading = true
    let insertar: InsertarAnexoPorFase = {
      idAnexo: this.selectAnexo().idAnexo,
      idSolicitudCompra: this.listSolicitud()[0].idSolicitudCompra
    }
    console.log(insertar);
    this.anexoRepository.insertarAnexoPorFase(insertar).subscribe({
      next: (res: ResponseAnexoPorFase) => {
        this.loading = false
        this.idNuevoAnexoPorFase = res.data
        this.alert.showAlert('Anexo generado correctamente', 'success')
        if(this.selectAnexo().nombre == 'Documentacion Preliminar'){
          this.uploadArchivo()
          return
        }
        if (this.selectAnexo().nombre == 'Cronograma') { return }
        this.visibleCarpeta = true

      },
      error: () => {
        this.loading = false
        this.alert.showAlert('Error al generar el anexo', 'error')
      }
    })
  }

  mostrarFormularioNuevo() {
    this.modoArchivo = 'CREAR';
    this.mostrarSubirArchivo = true;
    this.archivoEditandoId = null;
    this.archivoForm.reset();

    const archivos = this.selectAnexo()?.archivos;

    if (archivos && archivos.length > 0) {
      const ultimoAnexo = archivos[archivos.length - 1];
      this.idNuevoAnexoPorFase = ultimoAnexo.idAnexosPorFase;
    }
  }

  mostrarFormularioEditar(archivo: ArchivoAnexo) {
    this.modoArchivo = 'EDITAR'
    this.idNuevoAnexoPorFase = archivo.idAnexosPorFase;
    this.archivoEditandoId = archivo.idAnexosPorFase;
    this.mostrarSubirArchivo = false;
    this.archivoForm.reset();
  }


  cancelarSubida() {
    this.mostrarSubirArchivo = false;
    this.archivoEditandoId = null;
    this.archivoForm.reset();
  }

  visiblePdfOrden: boolean = false
  urlPdf: string = ''
  irAFirmarPdf = (archivo: ArchivoAnexo) => {
    this.urlPdf = `https://logistix.somee.com/logistix/wwwroot/Archivos/${archivo.archivo}`
    this.visiblePdfOrden = true
  }
  carpetaAbierta: boolean = false;
  uploadArchivo = () => {
    if (this.selectAnexo().nombre === 'Orden de Compra' && !this.carpetaAbierta) {
      this.visibleCarpeta = true;
      this.carpetaAbierta = true;
      return;
    }
    this.loading = true
    if (this.archivoForm.invalid) return;

    const file = this.archivoForm.value.archivo as File;
    const formData = new FormData();

    formData.append('archivo', file);

    formData.append(
      'anexosPorFase_ActualizarArchivo',
      JSON.stringify({
        CodigoAnexosPorFase: this.idNuevoAnexoPorFase,
      })
    );

    this.anexoRepository.actualizarArchivo(formData).subscribe({
      next: () => {
        this.loading = false
        this.alert.showAlert('Archivo actualizado correctamente', 'success');
        this.closeDialog();
        if(this.selectAnexo().nombre == 'Documentacion Preliminar'){
          this.actionAnexo.set('1');
          return
        }
        this.actionOrdenCompraCarpeta.set('archivoAsignado')
        console.log(this.actionOrdenCompraCarpeta(), 'desde upload archivo');
        
        // this.obtenerOrdenCompraDetalle()
      },
      error: (err: ApiError) => {
        this.alert.showAlert(`Error al subir el archivo, ${err.userMessage}`, 'error')
        this.loading = false
      }
    })
  }



  closeDialog = () => {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  verArchivo = (archivo: ArchivoAnexo) => {
    if (archivo.archivo == null) { return }
    window.open(`${environment.EndPoint}/wwwroot/Archivos/${archivo.archivo}`, "_blank")
  }


  observarArchivo = (archivo: ArchivoAnexo) => {
    this.archivoObservandoId = archivo.idAnexosPorFase;
    this.observarForm.reset();
  };

  aprobarArchivo = (anexoPorFase: ArchivoAnexo) => {
    this.loading = true
    let aprobar: AprobarAnexoPorFase = {

      idAnexosPorFase: anexoPorFase.idAnexosPorFase,
    }
    console.log(aprobar);

    this.alert.sweetAlert('question', '¿Confirmar?', '¿Está seguro que desea aprobar el documento?')
      .then(result => {
        if (!result) { this.loading = false; return }
        this.anexoRepository.aprobarAnexo(aprobar).subscribe({
          next: (data: ApiResponse) => {
            this.loading = false
            this.alert.showAlert(`Archivo Aprobado, ${data.message}`, 'success')
            anexoPorFase.estado = 2;
            this.loading = false
            this.actionAnexo.set('Aprobar');
          },
          error: (err: ApiError) => {
            console.log(err);

            this.alert.showAlert(`Error al aprobar el archivo, ${err.userMessage}`, 'error')
            this.loading = false
          }
        })
      })
  }
  cancelarObservacion() {
    this.archivoObservandoId = null;
    this.observarForm.reset();
  }

  guardarObservacion = (archivo: ArchivoAnexo) => {

    if (this.observarForm.invalid) return;

    this.loading = true
    const observar: ObservarAnexoPorFase = {
      idAnexosPorFase: archivo.idAnexosPorFase,
      observacion: this.observarForm.value.observacion
    };

    console.log(observar);

    this.alert.sweetAlert('question', '¿Confirmar?', '¿Está seguro que desea guardar la Observación?')
      .then(result => {
        if (!result) { this.loading = false; return }
        this.anexoRepository.observarAnexo(observar).subscribe({
          next: () => {
            archivo.estado = 2;
            archivo.observacion = observar.observacion;

            this.archivoObservandoId = null;
            this.observarForm.reset();
            this.loading = false
            this.actionAnexo.set('Observar');

          },
          error: (err: ApiError) => {
            this.alert.showAlert(`Error al observar el archivo, ${err.userMessage}`, 'error')
            this.loading = false
          }
        });
      })
  };
  private authService = inject(AuthService)
  userData = this.authService.getUserData()

  selectCarpeta = this.carpetaSignal.carpetaSelect
  enviarConstanciaFirma = () => {

    const rawProductos = this.selectProveedorProducto()
    // const productos = this.normalizarProductos(rawProductos)

    const montoTotal = rawProductos.reduce((total, p) => {
      return total + p.precioTotal
    }, 0)

    const archivos = this.selectAnexo()?.archivos;

    if (archivos && archivos.length > 0) {
      const ultimoAnexo = archivos[archivos.length - 1];
      this.archivoAnexoPorFaseActual = ultimoAnexo.archivo;
    } else {
      this.archivoAnexoPorFaseActual = null; // aún no existe
    }
    console.log(this.archivoAnexoPorFaseActual, 'ltimo archivo');



    let enviarConstancia: EnviarConstanciaFirma = {
      areaSolicitante: this.listAnexo()[0].areaResponsable,
      // enlace: 'archivoAnexoPorFaseActual ${environment.EndPoint}/wwwroot/Archivos/${archivo.archivo}',
      enlace: ` ${environment.EndPoint}/wwwroot/Archivos/${this.archivoAnexoPorFaseActual}`,
      monto: `S/. ${montoTotal.toFixed(2)}`,
      nombreFirmante: this.userData?.apellidosyNombres || '',
      nombreSolicitante: 'JHONATAN TORRES MENESES',
      ordenCompra: `${this.selectCarpeta().prefijo}-${this.selectCarpeta().numeracion}`,
      tipoGasto: this.listAnexo()[0].tipoGasto
    }
    console.log(enviarConstancia, 'envianbdo constancia');

    this.anexoRepository.enviarConstanciaFirma(enviarConstancia).subscribe({
      next: () => {
        this.alert.showAlert(`Enviando correo`, 'success')
        if(this.selectAnexo().nombre == 'Orden Firmada'){
          this.actionOrdenCompraCarpeta.set('archivoAsignado')
        }
      },
      error: (err) => {
        console.log(err);

        this.alert.showAlert(`Error`, 'error')
      }
    })

    // this.repository.
  }

  tieneArchivoActual: boolean = false;

  mostrarFormularioOrdenCompra(info: { id: number, tieneArchivo: boolean }) {
    this.modoArchivo = 'EDITAR';
    this.idNuevoAnexoPorFase = info.id;
    this.archivoEditandoId = info.id;

    // Guardamos si tiene archivo en la variable
    this.tieneArchivoActual = info.tieneArchivo;

    this.mostrarSubirArchivo = false;
    this.archivoForm.reset();
  }
  uploadArchivoOrdenCompra = () => {
    // Si ya tiene archivo, visibleCarpeta = false
    this.loading = true
    if (this.archivoForm.invalid) return;

    const file = this.archivoForm.value.archivo as File;
    const formData = new FormData();

    formData.append('archivo', file);

    formData.append(
      'anexosPorFase_ActualizarArchivo',
      JSON.stringify({
        CodigoAnexosPorFase: this.idNuevoAnexoPorFase,
      })
    );

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    this.anexoRepository.actualizarArchivo(formData).subscribe({
      next: () => {
        this.loading = false
        this.alert.showAlert('Archivo actualizado correctamente', 'success');
        // this.actionAnexo.set('1');
        this.obtenerOrdenCompraDetalle()
        this.actionOrdenCompraCarpeta.set('archivoAsignado')
        console.log(this.actionOrdenCompraCarpeta(), 'orden compra desde upload');
        
        this.closeDialog();
      },
      error: (err: ApiError) => {
        this.alert.showAlert(`Error al subir el archivo, ${err.userMessage}`, 'error')
        this.loading = false
      }
    })
  }

  obtenerProveedor(idAnexo: number, archivo: string | null): string {

    const orden = this.listOrdenCompra()
      ?.flatMap(x => x.anexosPorFases)
      ?.find(a => a.idAnexosPorFase === idAnexo);

    const proveedor = orden?.ordenCompra?.[0]?.nombreProveedor || 'Proveedor';

    if (!archivo) {
      return `${proveedor} - Sin archivo`;
    }

    return proveedor;
  }

  obtenerDatosOrden(idAnexo: number) {
    return this.listOrdenCompra()?.[0]?.anexosPorFases
      ?.find(a => a.idAnexosPorFase === idAnexo);
  }

}
