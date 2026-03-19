import { SolicitudCompraRepository } from '@/proceso-compras/domain/repository/solicitud-compra.repository';
import { GipeoSignal } from '@/proceso-compras/domain/signals/gipeo.signal';
import { SolicitudCompraSignal } from '@/proceso-compras/domain/signals/solicitud-compra.signal';
import { SolicitudCompraValidation } from '@/proceso-compras/domain/validators/solicitud-compra.validation';
import { ProveedorProductoSignal } from '@/proveedor-producto/domain/signals/proveedor-producto.signal';
import { Component, effect, inject, Input, OnInit, untracked } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { SelectProveedorProducto } from "../select-proveedor-producto/select-proveedor-producto";
import { AgregarSolicitud, EditarSolicitudCompraDetalle, EliminarSolicitudCompraDetalle } from '@/proceso-compras/domain/models/solicitud-compra.model';
import { DetailsSubtarea } from "../details-subtarea/details-subtarea";
import { PdfOrdenCompra } from "../pdf-orden-compra/pdf-orden-compra";
import { AnexoPorFaseSignal } from '@/proceso-compras/domain/signals/anexoPorFase.signal';
import { AnexoPorFase, Anexos, ArchivoAnexo, FasesAnexos } from '@/proceso-compras/domain/models/anexoPorFase.model';
import { AnexoPorFaseRepository } from '@/proceso-compras/domain/repository/anexoSolicitud.repository';
import { UploadArchivo } from "../upload-archivo/upload-archivo";
import { SplitButtonModule } from "primeng/splitbutton";
import { OneDriveCarpetas } from "../one-drive-carpetas/one-drive-carpetas";
import { TimeLineSolicitudCompra } from "../time-line-solicitud-compra/time-line-solicitud-compra";
import { SpeedDialModule } from 'primeng/speeddial';
import { PopoverModule } from 'primeng/popover';
import { UiSelectComponent } from "@/core/components/ui-select/ui-select.component";
import { UiSelect } from '@/core/components/ui-select/ui-select.interface';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { ListCronogramas } from "../list-cronogramas/list-cronogramas";
import { ProcesoComprasModule } from '@/proceso-compras/proceso-compras-module';;
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputNumberModule } from 'primeng/inputnumber';
import { DividerModule } from 'primeng/divider';
import { PermissionService } from '@/auth/infraestructure/services/permisos.service';
import { PERMISOS } from '@/auth/infraestructure/services/permisos.constants';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { OrdenCarpetaSignal } from '@/panel-solicitudes/domain/signals/orden-carpetas.signal';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Panel } from "primeng/panel";
import { TabsModule } from "primeng/tabs";
import { ListOrdenCompraDetalle } from "../list-orden-compra-detalle/list-orden-compra-detalle";
import { SharedModule } from "@/core/components/shared.module";
import { UiIconButton } from "@/core/components/ui-icon-button/ui-icon-button";
@Component({
  selector: 'app-list-solicitud-compra',
  imports: [ProcesoComprasModule, DragDropModule, InputTextModule, RippleModule, SpeedDialModule, PopoverModule, SelectProveedorProducto, DetailsSubtarea, PdfOrdenCompra, UploadArchivo, SplitButtonModule, OneDriveCarpetas, TimeLineSolicitudCompra, UiSelectComponent, ListCronogramas, InputNumberModule, DividerModule, IconFieldModule, InputIconModule, Panel, TabsModule, ListOrdenCompraDetalle, SharedModule, UiIconButton],
  templateUrl: './list-solicitud-compra.html',
  styleUrl: './list-solicitud-compra.scss'
})
export class ListSolicitudCompra implements OnInit {
  @Input() modo: string = ''
  repository = inject(SolicitudCompraRepository)
  signal = inject(SolicitudCompraSignal)
  listSolicitud = this.signal.listSolicitud

  anexoSignal = inject(AnexoPorFaseSignal)
  listAnexos = this.anexoSignal.listAnexos
  actionAnexo = this.anexoSignal.actionAnexo
  selectAnexo = this.anexoSignal.selectAnexo
  tieneOrdenCompraConArchivo = this.anexoSignal.tieneOrdenCompraConArchivo
  siglaArea = this.anexoSignal.siglaArea
  totalPresupuestoProgramado = this.anexoSignal.totalPresupuestoProgramado

  anexoRepository = inject(AnexoPorFaseRepository)

  signalGipeo = inject(GipeoSignal)
  selectSubTareaDefault = this.signalGipeo.selectSubTareaDefault
  selectSubTarea = this.signalGipeo.selectSubTarea

  signalProveedorProducto = inject(ProveedorProductoSignal)
  selectProveedorProducto = this.signalProveedorProducto.selectProveedorProducto
  selectProveedorProductoEditar = this.signalProveedorProducto.selectProveedorProductoEditar
  loading: boolean = false
  presupuestoProgramado: number = 0
  visiblepdfOrdenCompra: boolean = false
  visibleSubirArchivo: boolean = false
  visibleCarpeta: boolean = false

  permissionService = inject(PermissionService)
  solicitudPermiso = PERMISOS.SOLICITUDCOMPRA;
  permisosSolicitud = this.permissionService.resolve(this.solicitudPermiso)


  formSolicitudCompra: FormGroup
  solicitudCompraValidation = inject(SolicitudCompraValidation)
  expRegArea = this.solicitudCompraValidation.expRegArea
  expRegCantidad = this.solicitudCompraValidation.expRegCantidad
  expRegCodigo = this.solicitudCompraValidation.expRegCodigo
  maxLengthArea = this.solicitudCompraValidation.maxLengthArea
  maxLengthCantidad = this.solicitudCompraValidation.maxLengthCantidad
  maxLengthCodigo = this.solicitudCompraValidation.maxLengthArea
  minLengthArea = this.solicitudCompraValidation.minLengthArea
  minLengthCantidad = this.solicitudCompraValidation.minLengthCantidad
  minLengthCodigo = this.solicitudCompraValidation.minLengthCodigo
  expLockArea = this.solicitudCompraValidation.expLockArea
  expLockCantidad = this.solicitudCompraValidation.expRegLockCantidad
  expLockCodigo = this.solicitudCompraValidation.expLockCodigo

  visibleSelectProductos: boolean = false
  tablaProductos: any[] = [];
  totalGeneral: number = 0
  tempSelectedProveedorProductos: any[] = [];

  listAreas: UiSelect[] = []
  listLocal: UiSelect[] = []

  anexos: Anexos[] = []
  // private insertarAnexoPendiente = false;

  items!: MenuItem[];
  actionOrdenFirmada = this.anexoSignal.actionOrdenFirmada

  // private ordenCarpetaSignal = inject(OrdenCarpetaSignal)
  // listOrdenCarpeta = this.ordenCarpetaSignal.listOrdenCarpetas

  // private cargadoDesdeSeleccion = false;
  value: number = 0;
  constructor(
    private alert: AlertService,
  ) {
    this.formSolicitudCompra = new FormGroup({
      area: new FormControl('', [Validators.required, Validators.pattern(this.expRegArea), Validators.maxLength(this.maxLengthArea), Validators.minLength(this.minLengthArea)]),
      alcance: new FormControl('', [Validators.required]),
      codigoPlan: new FormControl('', [Validators.required, Validators.maxLength(this.maxLengthCodigo), Validators.minLength(this.minLengthCodigo)]),
    })


    effect(() => {

      const productos = this.selectProveedorProducto();
      if (productos && productos.length > 0) { this.cargarDesdeSeleccion(); }
    });

    effect(() => {
      const accion = this.actionAnexo();
      if (!accion) return;

      untracked(() => {
        if (accion === 'REFRESH') {
          this.obtenerSolicitud();
        }
        else {
          this.listarAnexos()
        }

        this.actionAnexo.set('');
      });
    });
  }

  ngOnInit(): void {
    this.obtenerSolicitud()


    this.listAreas = [
      { text: 'JEFATURA DE MANTENIMIENTO', value: 'JEFATURA DE MANTENIMIENTO' },
      { text: 'JEFATURA DE INFRAESTRUCTURA', value: 'JEFATURA DE INFRAESTRUCTURA' },
      { text: 'JEFATURA DE TI', value: 'JEFATURA DE TI' },
      { text: 'JEFATURA DE CALIDAD', value: 'JEFATURA DE CALIDAD' },
      { text: 'JEFATURA DE INVESTIGACIÓN', value: 'JEFATURA DE INVESTIGACIÓN' },
      { text: 'DIRECCIÓN DE ESCUELA PROFESIONAL DE ENFERMERÍA', value: 'DIRECCIÓN DE ESCUELA PROFESIONAL DE ENFERMERÍA' },
      { text: 'DIRECCIÓN DE ESCUELA PROFESIONAL DE SISTEMAS', value: 'DIRECCIÓN DE ESCUELA PROFESIONAL DE SISTEMAS' },
      { text: 'DIRECCIÓN DE BIENESTAR UNIVERSITARIO', value: 'DIRECCIÓN DE BIENESTAR UIVERSITARIO' }
    ]

    this.listLocal = [
      { text: 'SL01 - CHINCHA', value: 'SL01' },
      { text: 'SL02 - CHINCHA', value: 'SL02' },
      { text: 'SL03 - SUNAMPE', value: 'SL03' },
      { text: 'F01L01 - FILIAL ICA', value: 'F01L01' },
      { text: 'F01L02 - FILIAL PORUMA', value: 'F01L02' },
      { text: 'F02L01 - FILIAL HUAURA', value: 'F02L01' },
      { text: 'INSTITUCIONAL', value: 'INST' },
    ]



  }

  obtenerSolicitud = () => {
    this.loading = true
    this.repository.obtener(this.selectSubTarea().codigoSubTarea).subscribe({
      next: (data) => {
        this.listSolicitud.set(data.data)

        if (this.listSolicitud().length == 0) {
          this.presupuestoProgramado = this.selectSubTarea().rh + this.selectSubTarea().rmf + this.selectSubTarea().inv + this.selectSubTarea().impr
        }
        else {
          this.presupuestoProgramado = this.listSolicitud()[0].presupuestoProgramado
        }

        this.totalPresupuestoProgramado.set(this.presupuestoProgramado)

        if (this.listSolicitud().length === 0) {
          this.cargarDesdeSeleccion()
        }
        this.cargarDesdeSolicitud()
        this.loading = false
        this.alert.showAlert(`Listando solicitud de compra, ${data.message}`, 'success')
        this.loading = false
        console.log(this.actionAnexo());
        
        if (this.actionAnexo() !== 'REFRESH') {
          this.listarAnexos()
        }
      },
      error: () => {
        this.alert.showAlert('Error al listar la solicitud', 'error')
        this.loading = false
      }
    })
  }

  listarAnexos = () => {

    this.loading = true
    this.anexoRepository.obtenerAnexo(this.selectSubTarea().codigoSubTarea).subscribe({
      next: (data) => {

        this.listAnexos.set(data.data)
        this.alert.showAlert(`Listando los anexos`, 'success')
        this.loading = false
        this.setItemsDesdeSolicitud(this.listAnexos()[0])
        // this.evaluarArchivosOferta();
        let sigla = this.obtenerSiglaArea(this.listAnexos()[0].areaResponsable)
        const fases = this.listAnexos()[0]?.fases ?? [];

        this.anexoOrdenCompra =
          fases.flatMap(f => f.anexos)
            .find(a => a.nombre === 'Orden de Compra') ?? null;
        this.siglaArea.set(sigla);

        // const ultimoAnexo = fases
        //   .flatMap(f => f.anexos)
        //   .at(-1); 

        // if (ultimoAnexo) {
        //   this.selectAnexo.set(ultimoAnexo);
        // }

        const anexoActual = this.selectAnexo();
        const solicitudes = this.listAnexos();

        if (!anexoActual || anexoActual.idAnexo === 0 || !solicitudes?.length) { return; }
        const solicitud = solicitudes[0]; for (const fase of solicitud.fases) {
          const anexoNuevo = fase.anexos.find(a => a.idAnexo === anexoActual.idAnexo);

          if (anexoNuevo && anexoNuevo !== anexoActual) {
            this.selectAnexo.set(anexoNuevo); console.log(this.selectAnexo(), 'desde el solicitud compra')
            console.log(this.actionOrdenFirmada());
            
            if (this.actionOrdenFirmada() == 'ENVIAR CORREO') {
              this.actionOrdenFirmada.set('ENVIAR CORREO ORDEN FIRMADA')
              console.log(this.actionOrdenFirmada());
              
            }
            this.actionAnexo.set(''); return;
          }
        }
      },
      error: (err: ApiError) => {
        this.alert.showAlert(`Error al listar los anexos, ${err.error.message}`, 'error')
        this.loading = false
      }
    })
  }

  // esFilaSeleccionable = (row: any) => {
  //   return !row.ordenCompra;
  // };


  volver = () => {
    this.selectSubTarea.set(this.selectSubTareaDefault)
  }

  modoSeleccion: boolean = false
  cargarDesdeSeleccion() {
    this.modoSeleccion = true
    if (this.listSolicitud().length > 0) { return }

    this.tablaProductos = this.selectProveedorProducto().map(row => ({
      idProveedorProducto: row.idProveedorProducto,
      productoNombre: row.productoNombre,
      modelo: row.modelo,
      proveedor: row.proveedor,
      ruc: row.ruc,
      precio: Number(row.precio),                // asegurar que sea número
      cantidad: Number(row.cantidad ?? 1),
      precioTotal: row.precio * (row.cantidad ?? 1),
      unidad: row.unidad,
      descripcion: row.descripcion,
      direccion: row.direccion

    }));
    this.tablaProductos.sort((a, b) =>
      a.proveedor.localeCompare(b.proveedor)
    );
    this.calcularTotalGeneral();
  }

  cargarDesdeSolicitud() {
    const solicitudes = this.listSolicitud()

    this.tablaProductos = solicitudes.flatMap(solicitud =>
      solicitud.detalle.map(d => ({

        idSolicitudCompraDetalle: d.idSolicitudCompraDetalle,
        idProveedorProducto: d.idProveedorProducto,
        productoNombre: d.descripcionDelBien,
        modelo: '',
        proveedor: d.nombreProveedor,
        ruc: d.ruc,
        precio: d.precioUnitario,
        cantidad: d.cantidad,
        precioTotal: d.precioTotal,
        unidad: d.unidadMedida,
        descripcion: d.descripcionDelBien,
        ordenCompra: d.ordenCompra,
        direccion: d.direccion
      }))
    )

    this.totalGeneral = solicitudes.reduce(
      (sum, s) => sum + s.total,
      0
    );
  }

  quitarProducto(row: any) {
    this.tablaProductos = this.tablaProductos.filter(
      item => item.idProveedorProducto !== row.idProveedorProducto
    );

    this.calcularTotalGeneral();
  }

  calcularTotalGeneral() {
    setTimeout(() => {
      this.totalGeneral = this.tablaProductos.reduce(
        (sum, item) => sum + (item.precio * item.cantidad),
        0
      );
    }, 300);
  }


  guardar = () => {
    if (this.presupuestoProgramado < this.totalGeneral) {
      this.alert.showAlert(`El presupuesto se ha excedido`, 'error')
      return
    }
    this.loading = true
    console.log(this.selectProveedorProducto());

    const totalGeneral = Math.round(
      this.tablaProductos.reduce(
        (acc, row) => acc + row.precio * row.cantidad,
        0
      ) * 100
    ) / 100;

    const solicitudes: AgregarSolicitud[] = this.tablaProductos.map(row => {
      const precioTotal = Math.round((row.precio * row.cantidad) * 100) / 100;

      console.log(row);
      
      return {
        areaResponsable: this.formSolicitudCompra.value.area,
        codigoPlanDeTrabajo: this.formSolicitudCompra.value.codigoPlan,
        tipoGasto: 'GASTO OPERATIVO',
        idSubTarea: this.selectSubTarea().codigoSubTarea,
        datosDeActividad: this.selectSubTarea().nombreSubTarea,
        alcance: this.formSolicitudCompra.value.alcance,
        idProveedorProducto: row.idProveedorProducto,
        cantidad: row.cantidad,
        unidadMedida: row.unidad,
        descripcionDelBien: row.productoNombre,

        precioUnitario: row.precio,
        precioTotal: precioTotal,

        presupuestoProgramado: this.presupuestoProgramado,
        total: totalGeneral
      };
    });

    console.log(solicitudes);
    
    this.alert.sweetAlert('question', '¿Confirmar?', '¿Está seguro que desea guardar los productos seleccionados?')
      .then(result => {
        if (!result) { this.loading = false; return }

        this.repository.agregar(solicitudes).subscribe({
          next: (data) => {
            this.alert.showAlert(`La solicitud fue registrada correctamente`, 'success')
            this.loading = false
            this.obtenerSolicitud()
            this.listarAnexos()
          },
          error: (err: ApiError) => {
            console.log(err);

            this.alert.showAlert(`Hubo un error al registrar la solicitud`, 'error')
            this.loading = false
          }
        })
      })
  }


  obtenerSiglaArea(area: string): string {
    if (!area) return '';

    const palabras = area.split(' ');
    const letraJ = palabras[0]?.[0] ?? '';
    const letraArea = palabras[2]?.[0] ?? '';
    return `${letraJ}${letraArea}`;
  }

  itemsPorAnexo = new Map<number, MenuItem[]>();

  setItemsDesdeSolicitud(solicitud: AnexoPorFase) {
    if (this.listAnexos().length == 0) { return }
    this.itemsPorAnexo.clear();
    solicitud.fases.forEach((fase: FasesAnexos) => {
      fase.anexos.forEach((anexo: Anexos) => {
        const items: MenuItem[] = [];
        anexo.archivos.forEach((archivo: ArchivoAnexo) => {
          items.push({
            label: archivo.archivo,
            command: () => {
              window.open(`${environment.EndPoint}/wwwroot/Archivos/${archivo.archivo}`, "_blank")
            }
          })
        })
        this.itemsPorAnexo.set(anexo.idAnexo, items);
      })
    })
  }

  // insertarAnexoPorFase = (idAnexo: number) => {
  //   let insertar: InsertarAnexoPorFase = {
  //     idAnexo: idAnexo,
  //     idSolicitudCompra: this.listSolicitud()[0].idSolicitudCompra
  //   }
  //   console.log(insertar);

  //   this.anexoRepository.insertarAnexo(insertar).subscribe({
  //     next: () => {
  //       this.alert.showAlert(`anexo insertado correctamente`, 'success')
  //     },
  //     error: () => {
  //       this.alert.showAlert(`Error al insertar el anexo`, 'error')
  //     }
  //   })
  // }

  anexoOrdenCompra: Anexos | null = null;
  // seleccionarProductos(seleccion: any[]) {
  //   this.tempSelectedProveedorProductos =
  //     seleccion.filter(row => !row.ordenCompra);
  // }


  // generarOrdenDeCompra = (anexo: Anexos) => {
  //   this.selectProveedorProducto.set(this.tempSelectedProveedorProductos)
  //   this.visiblepdfOrdenCompra = true
  //   this.selectAnexo.set(anexo)
  // }

  // seleccionarCambioProveedor = (row: any) => {
  //   this.selectProveedorProductoEditar.set(row);
  // }

  visibleCronograma = false;

  mostrarModalArchivo(anexo: Anexos) {
    this.selectAnexo.set(anexo);

    if (anexo.nombre === 'Cronograma') {
      this.visibleCronograma = true;
    } else {
      this.visibleSubirArchivo = true;
    }
  }


  // tieneArchivosOrden = false
  // evaluarArchivosOferta() {
  //   const anexos = this.listAnexos()

  //   const archivos =
  //     anexos?.[0]?.fases?.[1]?.anexos?.[1]?.archivos

  //   this.tieneArchivosOrden = !!archivos?.some(a => a?.archivo != null)
  // }

  // get tieneArchivosPrincipales(): boolean {
  //   const fasesPermitidas = ['SOLICITUD DE COMPRA', 'OFERTA DE COMPRA'];
  //   const anexos = this.listAnexos();

  //   return anexos.some(solicitud =>
  //     solicitud.fases
  //       .filter(fase => fasesPermitidas.includes(fase.nombre))
  //       .some(fase =>
  //         fase.anexos.some(anexo =>
  //           anexo.archivos.some(archivo => archivo.archivo)
  //         )
  //       )
  //   );
  // }

  actualizarSolicitudCompraDetalle(row: any): void {
    console.log(row);

    const editar: EditarSolicitudCompraDetalle = {
      idSolicitudCompraDetalle: row.idSolicitudCompraDetalle,
      idProveedorProducto: row.idProveedorProducto,
      cantidad: row.cantidad,
      precioUnitario: row.precio,
      precioTotal: row.precioTotal,
      unidadMedida: row.unidad,
      descripcionDelBien: row.descripcion
    };

    this.alert
      .sweetAlert('question', 'Confirmar', '¿Está seguro que desea actualizar la solicitud?')
      .then(result => {
        if (!result) return;

        this.loading = true;

        this.repository.editarSolicitudCompraDetalle(editar).subscribe({
          next: (res: ApiResponse) => {
            this.alert.showAlert(`Solicitud editada, ${res.message}`, 'success');
            this.obtenerSolicitud();
            this.loading = false;
          },
          error: (err: ApiError) => {
            console.log(err);

            this.alert.showAlert('Error al editar', 'error');
            this.loading = false;
          }
        });
      });
  }

  recalcularFila(row: any): void {
    row.precioTotal = (row.precio || 0) * (row.cantidad || 0);

    this.totalGeneral = this.tablaProductos.reduce(
      (sum, item) => sum + (item.precio * item.cantidad),
      0
    );
  }


  eliminarSolicitudCompra = (row: any) => {
    this.loading = true
    let eliminar: EliminarSolicitudCompraDetalle = {
      idSolicitudCompraDetalle: row.idSolicitudCompraDetalle
    }
    console.log(eliminar);

    this.alert.sweetAlert('question', '¿Confirmar?', '¿Está seguro que desea eliminar?')
      .then(result => {
        if (!result) { this.loading = false; return }
        this.repository.eliminarSolicitudCompraDetalle(eliminar).subscribe({
          next: (res: ApiResponse) => {
            this.loading = false
            this.alert.showAlert(`Solicitud de compra eliminada, ${res.message}`, 'success')
            this.obtenerSolicitud()
          },
          error: (err: ApiError) => {
            this.loading = false
            this.alert.showAlert(`Error al eliminar, ${err.userMessage}`, 'error')
          }
        })
      })
  }

  // editingRowIndex: number | null = null;

  // activarEdicion(index: number) {
  //   this.editingRowIndex = index;
  // }

  // desactivarEdicion() {
  //   this.editingRowIndex = null;
  // }

  // Dentro de tu componente
  // isProveedorBloqueado(proveedor: string): boolean {
  //   return this.tablaProductos
  //     .filter(p => p.proveedor === proveedor)
  //     .some(p => p.ordenCompra);
  // }

  visibleTimeLine: boolean = false

  get existePrecioTotalCero(): boolean {
    return this.tablaProductos?.some(p =>
      !p.precio || !p.cantidad || (p.precio * p.cantidad) <= 0
    );
  }

  get botonGuardarSolicitudDeshabilitado(): boolean {
    return this.formSolicitudCompra.invalid ||
      this.totalGeneral > this.presupuestoProgramado ||
      this.existePrecioTotalCero ||
      this.totalGeneral === 0;
  }
}
