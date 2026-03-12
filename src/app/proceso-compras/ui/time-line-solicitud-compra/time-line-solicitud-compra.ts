import { Component, effect, EventEmitter, HostListener, inject, Input, OnInit, Output, signal } from '@angular/core';
import { Timeline } from "primeng/timeline";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { AnexoPorFaseSignal } from '@/proceso-compras/domain/signals/anexoPorFase.signal';
import { SharedModule } from '@/core/components/shared.module';
import { environment } from 'src/environments/environment';
import { ArchivoAnexo } from '@/proceso-compras/domain/models/anexoPorFase.model';
import { TagModule } from "primeng/tag";
import { BadgeModule } from "primeng/badge";
import { Popover } from 'primeng/popover';

@Component({
  selector: 'app-time-line-solicitud-compra',
  imports: [Timeline, CardModule, ButtonModule, SharedModule, TagModule, BadgeModule,Popover   ],
  templateUrl: './time-line-solicitud-compra.html',
  styleUrl: './time-line-solicitud-compra.scss'
})
export class TimeLineSolicitudCompra {
    @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  private anexoSignal = inject(AnexoPorFaseSignal)
  listAnexo = this.anexoSignal.listAnexos
  events = signal<any[]>([]);
  isSmallScreen: boolean = false;
  constructor() {
effect(() => {
  const anexos = this.listAnexo();

  if (!anexos.length) {
    this.events.set([]);
    return;
  }

  const solicitud = anexos[0];
  const newEvents: any[] = [];

  let archivosPreliminares: any[] = [];

  solicitud.fases.forEach((fase) => {

    fase.anexos.forEach((anexo) => {

      const archivosValidos = anexo.archivos.filter(a => a.archivo);

      if (!archivosValidos.length) return;

      // 🔵 DOCUMENTACION PRELIMINAR → se acumula
      if (anexo.nombre === 'Documentacion Preliminar') {

        archivosPreliminares.push(...archivosValidos);

      } 
      else {

        archivosValidos.forEach((archivo) => {

          newEvents.push({
            status: anexo.nombre,
            icon: 'pi pi-file',
            color: '#42A5F5',
            archivo: archivo,
            estadoTag: this.getEstadoTag(archivo.estado),
            fechaCreacion: archivo.fechaCreacion,
            usuario: archivo.nombreUsuario,
            agrupado: false
          });

        });

      }

    });

  });


  // 🔵 Crear UN SOLO evento para Documentación preliminar
  if (archivosPreliminares.length) {

    const ordenados = [...archivosPreliminares].sort(
      (a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime()
    );

    const ultimo = ordenados[0];

    newEvents.unshift({
      status: 'Documentación preliminar',
      icon: 'pi pi-file',
      color: '#42A5F5',
      archivo: ultimo,
      archivos: ordenados,
      cantidadArchivos: ordenados.length,
      estadoTag: this.getEstadoTag(ultimo.estado),
      fechaCreacion: ultimo.fechaCreacion,
      usuario: ultimo.nombreUsuario,
      agrupado: true
    });

  }

  this.events.set(newEvents);

});


  }
  getEstadoTag = (estado: number | null) => {
    switch (estado) {
      case 0:
        return { label: 'Sin Archivo', severity: 'secondary' };
      case 1:
        return { label: 'Activo', severity: 'warn' };
      case 2:
        return { label: 'Observado', severity: 'danger' };
      case 3:
        return { label: 'Aprobado', severity: 'success' };
      default:
        return null;
    }
  };

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSmallScreen = window.innerWidth < 800;
  }

  verArchivo = (archivo: ArchivoAnexo) => {
    console.log(archivo);

    window.open(`${environment.EndPoint}/wwwroot/Archivos/${archivo.archivo}`, "_blank")
  }

    closeDrawer() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  selectedArchivos: ArchivoAnexo[] = [];

mostrarArchivos(eventClick: any, event: any, pop: any) {

  if (event.agrupado) {
    this.selectedArchivos = event.archivos;
    pop.toggle(eventClick);
  } else {
    this.abrirArchivo(event.archivo);
  }

}

abrirArchivo(archivo: ArchivoAnexo) {
  window.open(
    `${environment.EndPoint}/wwwroot/Archivos/${archivo.archivo}`,
    "_blank"
  );
}

}
