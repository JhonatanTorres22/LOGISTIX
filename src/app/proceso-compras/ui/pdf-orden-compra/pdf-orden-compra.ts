import { SolicitudCompraRepository } from '@/proceso-compras/domain/repository/solicitud-compra.repository';
import { ProveedorProductoSignal } from '@/proveedor-producto/domain/signals/proveedor-producto.signal';
import { HttpClient } from '@angular/common/http';
import { Component, effect, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as pdfMakeImport from 'pdfmake/build/pdfmake';
import * as pdfFontsImport from 'pdfmake/build/vfs_fonts';
import { Content, TableCell, TDocumentDefinitions } from 'pdfmake/interfaces';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { AnexoPorFaseRepository } from '@/proceso-compras/domain/repository/anexoSolicitud.repository';
import { AnexoPorFaseSignal } from '@/proceso-compras/domain/signals/anexoPorFase.signal';
import { InsertarAnexoPorFase, ResponseAnexoPorFase } from '@/proceso-compras/domain/models/anexoPorFase.model';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { ApiError } from '@/core/interceptors/error-message.model';
import { ListCarpetas } from "../list-carpetas/list-carpetas";
import { CarpetaSignal } from '@/proceso-compras/domain/signals/carpeta.signal';
import { DrawerModule } from "primeng/drawer";
import { PermissionService } from '@/auth/infraestructure/services/permisos.service';
import { PERMISOS } from '@/auth/infraestructure/services/permisos.constants';
import { GenerarFirma } from "../generar-firma/generar-firma";
import { CommonModule } from '@angular/common';
import { ProveedorRepository } from '@/proveedor/domain/repositories/proveedor.repository';
import { BancoSignal } from '@/proveedor/domain/signals/banco.signal';
import { BancoRepository } from '@/proveedor/domain/repositories/banco.repository';
import { ListarBanco } from '@/proveedor/domain/models/banco.model';
import { CronogramaRepository } from '@/proceso-compras/domain/repository/cronograma.repository';
import { CronogramaSignal } from '@/proceso-compras/domain/signals/cronograma.signal';
import { UiCardNotItemsComponent } from "@/core/components/ui-card-not-items/ui-card-not-items.component";

const pdfMake: any = pdfMakeImport;
const pdfFonts: any = pdfFontsImport;

pdfMake.vfs = pdfFonts.vfs;
@Component({
  selector: 'app-pdf-orden-compra',
  imports: [CommonModule, UiButtonComponent, UiLoadingProgressBarComponent, ListCarpetas, DrawerModule, GenerarFirma, UiCardNotItemsComponent],
  templateUrl: './pdf-orden-compra.html',
  styleUrl: './pdf-orden-compra.scss'
})
export class PdfOrdenCompra {
  signalProveedorProducto = inject(ProveedorProductoSignal)
  selectProveedorProducto = this.signalProveedorProducto.selectProveedorProducto
  @Input() modo: 'GENERAR' | 'FIRMAR' = 'GENERAR';
  @Input() urlPdfExistente?: string;

  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  repository = inject(SolicitudCompraRepository)
  anexoRepository = inject(AnexoPorFaseRepository)
  anexoSignal = inject(AnexoPorFaseSignal)
  listAnexo = this.anexoSignal.listAnexos
  selectAnexo = this.anexoSignal.selectAnexo
  actionAnexo = this.anexoSignal.actionAnexo
  pdfUrl: SafeResourceUrl | null = null;

  currentPdfBlob!: Blob;
  loading: boolean = false
  visibleCarpeta: boolean = false

  carpetaSignal = inject(CarpetaSignal)
  actionCarpeta = this.carpetaSignal.actionCarpeta
  selectCarpeta = this.carpetaSignal.carpetaSelect

  permissionService = inject(PermissionService)
  solicitudPermiso = PERMISOS.SOLICITUDCOMPRA;
  permisosSolicitud = this.permissionService.resolve(this.solicitudPermiso)

  visibleFirma: boolean = false

  private bancoRepository = inject(BancoRepository)
  private bancoSignal = inject(BancoSignal)
  listBanco = this.bancoSignal.listBanco

  private cronogramaRepository = inject(CronogramaRepository)
  private cronogramaSignal = inject(CronogramaSignal)
  listCronograma = this.cronogramaSignal.listCronograma



  firmaGerenteBase64: string | null = null
  // private authService = inject(AuthService)
  //   userData = this.authService.getUserData()
  // archivoAnexoPorFaseActual: string | null = null

  constructor(private sanitizer: DomSanitizer,
    private http: HttpClient,
    private alert: AlertService) {
    effect(() => {
      console.log(this.actionCarpeta())
      if (this.actionCarpeta() === '') { return }
      if (this.actionCarpeta() == 'INSERTAR CARPETA CON ANEXO EN ORDEN') {
        this.actualizarArchivo()
        this.actionCarpeta.set('')
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible'] && this.visible) {
      // if(this.selectProveedorProducto()[0].idAnexoPorFaseCronograma === 0){
        this.obtenerCronograma()
      // }
    }
  }

  obtenerCronograma = () => {
    this.loading = true
    this.cronogramaRepository.obtenerCronograma(this.selectProveedorProducto()[0].idAnexoPorFaseCronograma).subscribe({
      next: (data) => {
        this.loading = false
        this.listCronograma.set(data.data)
        this.obtenerBancos()

      },
      error: (err: ApiError) => {
        this.alert.showAlert(`${err.userMessage}`, 'error');
        this.loading = false;
      }
    })
  }

  obtenerBancos = () => {
    this.loading = true
    this.bancoRepository.obtenerBanco(this.selectProveedorProducto()[0].idProveedor).subscribe({
      next: (data) => {
        this.loading = false
        this.listBanco.set(data.data)
        this.generarPdfBlob();
      },
      error: (err: ApiError) => {
        this.loading = false
        this.alert.showAlert(`Error, ${err.error.message}`, 'error')
      }
    })
  }






  private getImageBase64(url: string): Promise<string> {
    // console.log(this.selectProveedorProducto());

    return this.http.get(url, { responseType: 'blob' }).toPromise()
      .then(blob => new Promise<string>((resolve, reject) => {
        if (!blob) return reject('Blob vacío');

        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }));
  }


  onFirmaRecibida(base64: string) {
    this.firmaGerenteBase64 = base64;
    this.generarPdfBlob();
  }

  private normalizarProductos(data: any[]): any[] {
    return data.map(item => ({
      idSolicitudCompraDetalle: item.idSolicitudCompraDetalle ?? item.idOrdenCompra,
      proveedor: item.proveedor ?? item.nombreProveedor,
      ruc: item.ruc,
      direccion: item.direccion,
      cantidad: item.cantidad,
      unidad: item.unidad ?? item.unidadMedida,
      descripcion: item.descripcion ?? item.descripcionDelBien,
      precio: item.precio ?? item.precioUnitario,
      precioTotal: item.precioTotal,
      ordenCompra: item.ordenCompra
    }));
  }

  private buildObservacionesCondicionesPlanoA4(): Content {
    const fs = 7;

    // ===== Helpers =====
    const L = (t: string): TableCell => ({ text: t, bold: true, fontSize: fs } as TableCell);
    const C = (text: any, align: 'left' | 'center' | 'right' = 'left'): TableCell =>
      ({ text: text ?? '—', fontSize: fs, alignment: align, noWrap: false } as TableCell);

    const formatFecha = (iso: string): string => {
      if (!iso) return '—';
      const d = new Date(iso);
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yyyy = d.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    };

    // ===== Data sources =====
    const cronograma = this.listCronograma?.() ?? []; // <-- TU LISTA
    const nroCuotas = cronograma.length;
    const tipoComprobante = (cronograma?.[0]?.tipoDocumentoTributario ?? '—') as string;

    const rawProductos = this.selectProveedorProducto?.() ?? [];
    const nombreProveedor =
      rawProductos?.[0]?.proveedor ??
      rawProductos?.[0]?.nombreProveedor ??
      '—';

    const bancosApi = this.listBanco?.() ?? [];

    // ===== Bancos (como lo dejaste: BANCO ocupa 2 columnas) =====
    const filasBancos: TableCell[][] = [];

    filasBancos.push([
      { text: 'DATOS BANCARIOS', colSpan: 4, bold: true, alignment: 'center', fillColor: '#d3d3d3', fontSize: fs } as any,
      {}, {}, {}
    ]);

    filasBancos.push([
      ({ text: 'BANCO', bold: true, fontSize: fs, alignment: 'center', fillColor: '#d3d3d3', colSpan: 2 } as any),
      {},
      ({ text: 'N° CUENTA', bold: true, fontSize: fs, alignment: 'center', fillColor: '#d3d3d3' } as TableCell),
      ({ text: 'CCI', bold: true, fontSize: fs, alignment: 'center', fillColor: '#d3d3d3' } as TableCell),
    ]);

    if (bancosApi.length > 0) {
      bancosApi.forEach((b: any) => {
        filasBancos.push([
          ({ text: b.nombreBanco ?? '—', fontSize: fs, alignment: 'left', noWrap: false, colSpan: 2 } as any),
          {},
          C(b.numeroCuenta, 'center'),
          C(b.cci, 'center'),
        ]);
      });
    } else {
      filasBancos.push([
        {
          text: `Este proveedor no tiene bancos asignados, favor de registrarlos.`,
          colSpan: 4,
          bold: true,
          fontSize: fs,
          color: 'red',
          alignment: 'center',
          margin: [0, 4, 0, 4]
        } as any,
        {}, {}, {}
      ]);
    }

    if (bancosApi.length > 0) {
      const bancoNacion = bancosApi.find((b: any) => {
        const n = (b?.nombreBanco ?? '').toString().trim().toUpperCase();
        return n === 'BANCO DE LA NACIÓN' || n === 'BANCO DE LA NACION';
      });
      const ctaDetraccionNacion = (bancoNacion?.cuentaDetraccion ?? '—') as string;

      filasBancos.push([
        ({ text: 'CTA DETRACCIÓN BANCO DE LA NACIÓN', bold: true, fontSize: fs, colSpan: 2 } as any),
        {},
        ({ text: ctaDetraccionNacion || '—', fontSize: fs, alignment: 'center', colSpan: 2 } as any),
        {}
      ]);
    }

    // ===== Montos por cuota (solo fecha y monto) =====
    const filasCuotas: TableCell[][] = [];

    filasCuotas.push([
      { text: 'MONTO POR CUOTA', colSpan: 4, bold: true, alignment: 'center', fillColor: '#d3d3d3', fontSize: fs } as any,
      {}, {}, {}
    ]);

    // Header: FECHA | MONTO (2 + 2 columnas)
    filasCuotas.push([
      ({ text: 'FECHA', bold: true, fontSize: fs, alignment: 'center', fillColor: '#d3d3d3', colSpan: 2 } as any),
      {},
      ({ text: 'MONTO', bold: true, fontSize: fs, alignment: 'center', fillColor: '#d3d3d3', colSpan: 2 } as any),
      {}
    ]);

    if (cronograma.length > 0) {
      cronograma.forEach((c: any) => {
        filasCuotas.push([
          ({ text: formatFecha(c.fecha), fontSize: fs, alignment: 'center', colSpan: 2 } as any),
          {},
          ({ text: (c.monto ?? 0).toFixed(2), fontSize: fs, alignment: 'right', colSpan: 2 } as any),
          {}
        ]);
      });
    } else {
      filasCuotas.push([
        ({ text: '—', fontSize: fs, alignment: 'center', colSpan: 4 } as any),
        {}, {}, {}
      ]);
    }

    // ===== Main table =====
    return {
      table: {
        widths: [160, '*', '*', '*'],
        body: [
          [
            { text: 'OBSERVACIONES / CONDICIONES', colSpan: 4, bold: true, fillColor: '#d3d3d3', alignment: 'center', fontSize: fs + 1 } as any,
            {}, {}, {}
          ],

          // ✅ FILA 1: Tipo comprobante (de cronograma) + N° cuotas (length)
          [
            L('TIPO DE COMPROBANTE'),
            C(tipoComprobante, 'center'),
            L('N° CUOTAS'),
            C(String(nroCuotas), 'center')
          ],

          // ✅ FILA 2+: Montos por cuota (fecha + monto)
          ...filasCuotas,

          // ✅ Debajo: método de pago + proveedor
          [
            L('MÉTODO DE PAGO'),
            C('TRANSFERENCIA'),
            L('A NOMBRE DE'),
            C(nombreProveedor)
          ],

          // ✅ Debajo: bancos
          ...filasBancos
        ]
      },
      layout: {
        hLineWidth: () => 1,
        vLineWidth: () => 1,
        hLineColor: () => '#000',
        vLineColor: () => '#000',
        paddingLeft: () => 4,
        paddingRight: () => 4,
        paddingTop: () => 3,
        paddingBottom: () => 3
      },
      margin: [0, 0, 0, 12]
    };
  }
  private generarPdfBlob(): Promise<Blob> {

    return new Promise(async (resolve) => {
      const imageBase64 = await this.getImageBase64('assets/images/logo_negro_v2.png');

      const rawProductos = this.selectProveedorProducto();
      const productos = this.normalizarProductos(rawProductos);


      const productosBody: Content[][] = [
        [
          { text: 'ITEM', bold: true, fillColor: '#d3d3d3', alignment: 'center' },
          { text: 'CANTIDAD', bold: true, fillColor: '#d3d3d3', alignment: 'center' },
          { text: 'UNIDAD', bold: true, fillColor: '#d3d3d3', alignment: 'center' },
          { text: 'DESCRIPCIÓN', bold: true, fillColor: '#d3d3d3', alignment: 'center' },
          { text: 'PRECIO UNITARIO', bold: true, fillColor: '#d3d3d3', alignment: 'right' },
          { text: 'PRECIO TOTAL', bold: true, fillColor: '#d3d3d3', alignment: 'right' }
        ],
        ...productos.map(p => [
          { text: p.idSolicitudCompraDetalle.toString(), alignment: 'center' } as Content,
          { text: p.cantidad.toString(), alignment: 'center' } as Content,
          { text: p.unidad, alignment: 'center' } as Content,
          { text: p.descripcion, alignment: 'left' } as Content,
          { text: p.precio.toFixed(2), alignment: 'right' } as Content,
          { text: p.precioTotal.toFixed(2), alignment: 'right' } as Content
        ])

      ];

      const proveedoresUnicos = Array.from(
        new Map(productos.map(p => [p.proveedor, p])).values()
      )
      const proveedoresBody: TableCell[][] = [];

      proveedoresUnicos.forEach((prov) => {
        proveedoresBody.push(
          [
            { text: 'Señor(es)', bold: true },
            { text: prov.proveedor },
            { text: 'RUC:', bold: true },
            { text: prov.ruc.trim() }
          ],
          [
            { text: 'Dirección', bold: true },
            { text: prov.direccion || '—' },
            { text: '' },
            { text: '' }
          ]
        );
      });

      const filasTabla: TableCell[][] = [
        ...proveedoresBody,
        [
          { text: 'Facturar a nombre de', bold: true },
          { text: 'UNIVERSIDAD AUTÓNOMA DE ICA S.A.C.' },
          { text: 'RUC:', bold: true },
          { text: '20452777399' }
        ],
        [
          { text: 'Dirección', bold: true },
          { text: 'Av. Abelardo Alva Maurtua N° 489 - Chincha Alta - Chincha - Ica' },
          { text: '' },
          { text: '' }
        ],
        [
          { text: 'Referencia', bold: true },
          { text: 'PLAN FINANCIAMIENTO' },
          { text: '' },
          { text: '' }
        ],
        [
          { text: 'Código de la Actividad', bold: true },
          { text: 'PY_SI03 - CONSTRUCCIÓN DEL PABELLÓN A-B OFICINAS - PROGRAMA ACADÉMICO DE MEDICINA HUMANA' },
          { text: '' },
          { text: '' }
        ],
        [
          { text: 'Asignación Presupuestaria', bold: true },
          { text: 'RECURSOS MATERIALES' },
          { text: '' },
          { text: '' }
        ]
      ];



      const total = productos.reduce((sum, p) => sum + p.precioTotal, 0);
      productosBody.push([
        { text: 'TOTAL', colSpan: 5, bold: true, alignment: 'right' } as any,
        {}, {}, {}, {},
        { text: total.toFixed(2), bold: true, alignment: 'right' }
      ]);

      const hoy = new Date();

      const dia = hoy.getDate().toString().padStart(2, '0');
      const mes = (hoy.getMonth() + 1).toString().padStart(2, '0')
      const anio = hoy.getFullYear().toString();

      const firmaGerenteCell: TableCell = this.firmaGerenteBase64
        ? {
          image: this.firmaGerenteBase64,
          width: 120,
          alignment: 'center',
          margin: [0, 5, 0, 5]
        }
        : {
          text: '',
          margin: [0, 20, 0, 20]
        };

      const docDefinition: TDocumentDefinitions = {
        pageSize: 'A4',
        pageMargins: [40, 20, 40, 20],
        content: [
          {
            columns: [
              { image: imageBase64, width: 120 },

              { text: '', width: '*' },

              {
                table: {
                  widths: ['auto', 'auto', 'auto'],
                  body: [
                    [
                      { text: 'DIA', bold: true, alignment: 'center' },
                      { text: 'MES', bold: true, alignment: 'center' },
                      { text: 'AÑO', bold: true, alignment: 'center' }
                    ],
                    [
                      { text: dia, alignment: 'center' },
                      { text: mes, alignment: 'center' },
                      { text: anio, alignment: 'center' }
                    ]
                  ]
                },
                layout: {
                  hLineWidth: () => 1,
                  vLineWidth: () => 1
                },
                width: 'auto'
              }
            ],
            margin: [0, 0, 0, 25]
          },

          {
            table: {
              widths: ['*'],
              body: [
                [
                  {
                    text: 'ORDEN DE COMPRA - JI001_PROYECTOS',
                    bold: true,
                    fontSize: 14,
                    alignment: 'center',
                    fillColor: '#f0f0f0'
                  }
                ]
              ]
            },
            layout: {
              hLineWidth: () => 1,
              vLineWidth: () => 1,
              hLineColor: () => '#000',
              vLineColor: () => '#000'
            },
            margin: [0, 0, 0, 20]
          },
          {
            table: {
              widths: ['auto', '*', 'auto', 'auto'],
              body: filasTabla
            },
            layout: 'noBorders',
            margin: [0, 0, 0, 20]
          },


          {
            table: {
              headerRows: 1,
              widths: ['auto', 'auto', 'auto', '*', 'auto', 'auto'],
              body: productosBody
            },
            layout: {
              hLineWidth: () => 1,
              vLineWidth: () => 1,
              hLineColor: () => '#000',
              vLineColor: () => '#000',
              paddingLeft: () => 5,
              paddingRight: () => 5,
              paddingTop: () => 4,
              paddingBottom: () => 4
            },
            margin: [0, 0, 0, 30]
          },
          {
            table: {
              widths: ['*'],
              body: [
                [
                  {
                    text: [
                      { text: 'NOTA: ', bold: true, fontSize: 7 },
                      {
                        text: 'Esta orden es nula sin la firma del Gerente General y la Jefatura de Logística, cada orden de compra se debe facturar por separado en original y remitirla a la Jefatura de Administración Financiera y Talento Humano. Nos reservamos el derecho a observar la compra que no esté de acuerdo a nuestras especificaciones.',
                        fontSize: 7
                      }

                    ],
                    alignment: 'justify'
                  }
                ]
              ]
            },
            layout: {
              hLineWidth: () => 1,
              vLineWidth: () => 1,
              hLineColor: () => '#000',
              vLineColor: () => '#000',
              paddingLeft: () => 2,
              paddingRight: () => 2,
              paddingTop: () => 2,
              paddingBottom: () => 2
            },
            margin: [0, 0, 0, 25]
          },
          this.buildObservacionesCondicionesPlanoA4(),

          {
            table: {
              widths: ['*', '*', '*'],
              body: [
                [
                  firmaGerenteCell,
                  { text: '', margin: [0, 20, 0, 20] },
                  { text: '', margin: [0, 20, 0, 20] }
                ],
                [
                  {
                    text: 'DR. HERNANDO MARTÍN CAMPOS MARÍNEZ\nV°B° GERENCIA GENERAL',
                    alignment: 'center'
                  },
                  {
                    text: 'BR. JHONATAN AGUILAR HERNÁNDEZ\nV°B° JEFATURA DE LOGÍSTICA',
                    alignment: 'center'
                  },
                  {
                    text: 'MG. MEDALITH DEL ROCIO CAMPOS SOBRINO\nV°B° SUB GERENCIA GENERAL',
                    alignment: 'center'
                  }
                ]
              ]
            },
            layout: {
              hLineWidth: () => 1,
              vLineWidth: () => 1,
              hLineColor: () => '#000',
              vLineColor: () => '#000'
            }
          }

        ],
        defaultStyle: { fontSize: 10 }
      };

      pdfMake.createPdf(docDefinition).getBlob((blob: Blob) => {
        this.currentPdfBlob = blob;

        if (this.pdfUrl) URL.revokeObjectURL(this.pdfUrl as string);

        const url = URL.createObjectURL(blob);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.visible = true;
      });

    })
  }

  generar = () => {
    switch (this.selectAnexo().nombre) {
      case 'Orden Firmada': {
        this.insertarAnexoOrdenes()
      }; break;
    }
  }

  idNuevoAnexoPorFase: number = 0
  insertarAnexoOrdenes = () => {

    const insertar: InsertarAnexoPorFase = {
      idAnexo: this.listAnexo()[0].fases[1].anexos[2].idAnexo,
      idSolicitudCompra: this.listAnexo()[0].idSolicitudCompra
    }

    // this.actionAnexo.set('REFRESH');
    if (this.selectAnexo().nombre == 'Orden Firmada') {
      this.visibleCarpeta = true;
    }

    console.log(insertar, 'insertar anexo por fase en orden de compra');


    this.anexoRepository.insertarAnexoPorFase(insertar).subscribe({
      next: (res: ResponseAnexoPorFase) => {
        this.idNuevoAnexoPorFase = res.data
        console.log(this.idNuevoAnexoPorFase);

        this.loading = false;
        this.alert.showAlert('Orden y anexo generados correctamente', 'success');

        // this.actionAnexo.set('REFRESH');
        if (this.selectAnexo().nombre == 'Orden Firmada') {
          this.visibleCarpeta = true;
        }
      },
      error: (err) => {
        this.loading = false;
        this.alert.showAlert(
          `Error al generar el anexo, ${err.userMessage}`, 'error'
        );
      }
    });
  };



  actionOrdenFirmada = this.anexoSignal.actionOrdenFirmada
  actualizarArchivo = () => {
    console.log('actualizar archivo');

    this.loading = true
    if (!this.currentPdfBlob) {
      this.alert.showAlert('No hay PDF generado para subir', 'error');
      return;
    }

    const file = new File(
      [this.currentPdfBlob],
      'OC_JI001.pdf',
      { type: 'application/pdf' }
    );

    const formData = new FormData();



    formData.append(
      'anexosPorFase_ActualizarArchivo',
      JSON.stringify({
        CodigoAnexosPorFase: this.idNuevoAnexoPorFase,
      })
    );

    formData.append('archivo', file);

    formData.forEach((v, k) => console.log(k, v));

    this.anexoRepository.actualizarArchivo(formData).subscribe({
      next: (data) => {
        this.alert.showAlert('Archivo actualizado correctamente', 'success');
        this.actionAnexo.set('ARCHIVO')
        console.log(data);

        this.loading = false
        this.selectAnexo.set(this.listAnexo()[0].fases[1].anexos[2])
        // this.selectAnexo().nombre == 'Orden Firmada' ? '' : ''
        this.closeDrawer()
        if (this.selectAnexo().nombre == 'Orden Firmada') {
          this.actionOrdenFirmada.set('ENVIAR CORREO')
          console.log(this.actionOrdenFirmada());
        }
        console.log(this.selectAnexo());

      },
      error: (err: ApiError) => {
        console.error(err);
        this.alert.showAlert(`Error al actualizar archivo, ${err.userMessage}`, 'error')
        this.loading = false
      }
    })
  }


  // enviarConstanciaFirma = () => {

  //   const rawProductos = this.selectProveedorProducto()
  //   const productos = this.normalizarProductos(rawProductos)

  //   const montoTotal = productos.reduce((total, p) => {
  //     return total + p.precioTotal
  //   }, 0)

  //   const anexo = this.anexoSignal.selectAnexo();
  //   const ultimoArchivo = anexo.archivos.at(-1);

  //   if (!ultimoArchivo) {
  //     this.alert.showAlert('El anexo no tiene archivos', 'warning');
  //     return;
  //   }

  //   let enviarConstancia: EnviarConstanciaFirma = {
  //     areaSolicitante: this.listAnexo()[0].areaResponsable,
  //     // enlace: 'archivoAnexoPorFaseActual ${environment.EndPoint}/wwwroot/Archivos/${archivo.archivo}',
  //     enlace : ` ${environment.EndPoint}/wwwroot/Archivos/${this.archivoAnexoPorFaseActual}`,
  //     monto: `S/. ${montoTotal}`,
  //     nombreFirmante: this.userData?.apellidosyNombres || '',
  //     nombreSolicitante: 'JHONATAN TORRES MENESES',
  //     ordenCompra: `${this.selectCarpeta().prefijo}-${this.selectCarpeta().numeracion}`,
  //     tipoGasto: this.listAnexo()[0].tipoGasto
  //   }
  //   console.log(enviarConstancia,'envianbdo constancia');

  //   this.anexoRepository.enviarConstanciaFirma(enviarConstancia).subscribe({
  //     next : () => {
  //       this.alert.showAlert(`Enviando correo`, 'success')
  //     },
  //     error : (err) => {
  //       console.log(err);

  //       this.alert.showAlert(`Error`, 'error')
  //     }
  //   })

  //   // this.repository.
  // }


  closeDrawer() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

}
