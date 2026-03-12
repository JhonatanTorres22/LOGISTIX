import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { ProveedorRepository } from '@/proveedor/domain/repositories/proveedor.repository';
import { ProveedorSignal } from '@/proveedor/domain/signals/proveedor.signal';
import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { CardModule } from "primeng/card";
import { DividerModule } from "primeng/divider";
import { TagModule } from "primeng/tag";
import { ProcesoComprasModule } from "@/proceso-compras/proceso-compras-module";
import { AddEditConsultaRuc } from "../add-edit-consulta-ruc/add-edit-consulta-ruc";
import { UploadFichaEvaluacion } from "../upload-ficha-evaluacion/upload-ficha-evaluacion";
import { ConsultaRuc, EliminarConsultaRuc } from '@/proveedor/domain/models/consultaRuc.model';
import { EvaluacionSunatSignal } from '@/proveedor/domain/signals/evaluacionSunat.signal';
import { ViewPdfEvaluacion } from "../view-pdf-evaluacion/view-pdf-evaluacion";

@Component({
  selector: 'app-list-consulta-ruc',
  imports: [CommonModule, CardModule, DividerModule, TagModule, ProcesoComprasModule, AddEditConsultaRuc, UploadFichaEvaluacion, ViewPdfEvaluacion],
  templateUrl: './list-consulta-ruc.html',
  styleUrl: './list-consulta-ruc.scss'
})
export class ListConsultaRuc implements OnInit {
  private repository = inject(ProveedorRepository)
  private proveedorSignal = inject(ProveedorSignal)
  listConsultaRuc = this.proveedorSignal.listConsultaRuc
  selectProveedor = this.proveedorSignal.proveedorSelect
  selectConsultaRuc = this.proveedorSignal.selectConsultaRuc
  selectConsultaRucDefault = this.proveedorSignal.selectConsultaRucDefault
  actionConsultaRuc = this.proveedorSignal.actionConsultaRuc

  private evaluacionSunatSignal = inject(EvaluacionSunatSignal)
  listEvaluacionSunat = this.evaluacionSunatSignal.listEvaluacionSunat

  modoFormularioRuc: 'AGREGAR' | 'EDITAR' | 'CLONAR' = 'AGREGAR';
  mostrarFichaRuc: boolean = false
  mostrarDecisionClonar = true
  mostrarFormularioRuc: boolean = false
  loading: boolean = false

  private signal = inject(EvaluacionSunatSignal)
  selectEvaluacionSunat = this.signal.selectEvaluacionSunat
  actionCerrarDrawer = this.signal.actionCerrarDrawer

  estadoVista = signal<'VER' | 'FORMULARIO' | 'CLONAR'>('VER');


  private alert = inject(AlertService)
  constructor() {
    effect(() => {
      const accion = this.actionConsultaRuc();
      if (!accion) return;

      this.obtenerConsultaRuc();
      this.mostrarFormularioRuc = false;
      this.mostrarDecisionClonar = false;
      this.mostrarFichaRuc = true;
      this.selectConsultaRuc.set(this.selectConsultaRucDefault);

      this.actionConsultaRuc.set('');
    });


  }


  ngOnInit(): void {
    this.obtenerConsultaRuc()
  }

  obtenerConsultaRuc = () => {
    this.loading = true
    this.repository.obtenerConsultaRuc(this.selectEvaluacionSunat().idSunat).subscribe({
      next: (data) => {
        this.listConsultaRuc.set(data.data)
        this.alert.showAlert(`${data.message}`, 'success')
        this.loading = false
      },
      error: (err: ApiError) => {
        this.alert.showAlert(`${err.error.message}`, 'error')
        this.loading = false
      }
    })
  }

  private obtenerIdSunatAnterior(): number | null {

  const lista = this.listEvaluacionSunat();
  const actualId = this.selectEvaluacionSunat().idSunat;

  const indexActual = lista.findIndex(x => x.idSunat === actualId);

  if (indexActual > 0) {
    return lista[indexActual - 1].idSunat;
  }

  return null;
}

clonarDesdeAnterior() {

  const idSunatAnterior = this.obtenerIdSunatAnterior();

  if (!idSunatAnterior) {
    this.alert.showAlert('No existe evaluación anterior', 'warning');
    return;
  }

  this.loading = true;

  this.repository.obtenerConsultaRuc(idSunatAnterior).subscribe({
    next: (data) => {

      const consultaAnterior = data.data?.[0];

      if (!consultaAnterior) {
        this.alert.showAlert('No existe Consulta RUC anterior', 'warning');
        this.loading = false;
        return;
      }

      this.selectConsultaRuc.set({
        ...consultaAnterior,
        idConsultaRuc: 0
      });

      this.modoFormularioRuc = 'CLONAR';
      this.estadoVista.set('FORMULARIO');

      this.loading = false;
    },
    error: (err: ApiError) => {
      this.alert.showAlert(`${err.error.message}`, 'error');
      this.loading = false;
    }
  });
}



  prepararFormulario(modo: 'AGREGAR' | 'EDITAR' | 'CLONAR') {

  this.modoFormularioRuc = modo;

  const consultaActual = this.listConsultaRuc()?.[0];
    console.log(consultaActual,'consulta actual');
    
  if (modo === 'AGREGAR') {
    this.selectConsultaRuc.set(this.selectConsultaRucDefault);
  }

  if (modo === 'EDITAR' && consultaActual) {
    this.selectConsultaRuc.set(consultaActual);
  }

  if (modo === 'CLONAR' && consultaActual) {
    this.selectConsultaRuc.set({
      ...consultaActual,
      idConsultaRuc: 0 
    });
  }

  this.estadoVista.set('FORMULARIO');
}
vistaActual = computed(() => {

  const consulta = this.listConsultaRuc();
  const evaluaciones = this.listEvaluacionSunat();
  const estado = this.estadoVista();

  if (estado === 'FORMULARIO') return 'FORMULARIO';

  const tieneConsulta = consulta?.length > 0;

  if (!tieneConsulta && evaluaciones?.length === 1) {
    return 'FORMULARIO';
  }

  if (!tieneConsulta && evaluaciones?.length > 1) {
    return 'CLONAR';
  }

  if (tieneConsulta) {
    return 'MOSTRAR';
  }

  return 'VACIO';
});



  eliminarConsulta = (consultaRuc: ConsultaRuc) => {
    // this.loading = true
    this.alert.sweetAlert('question', '¿Confirmar?', '¿Está seguro que desea eliminar?')
      .then(result => {
        if (!result) { this.loading = false; return }
        let eliminar: EliminarConsultaRuc = {
          idConsultaRuc: consultaRuc.idConsultaRuc
        }

        console.log(eliminar);
        this.repository.eliminarConsultaRuc(eliminar).subscribe({
          next: (res: ApiResponse) => {
            this.loading = false
            this.alert.showAlert(`Consulta RUC eliminado, ${res.message}`)
            this.obtenerConsultaRuc();

          },
          error: (err: ApiError) => {
            this.loading = false
            this.alert.showAlert(`Error, ${err.error.message}`, 'error')
          }
        })

      })
  }

  volverAMostrar() {
  this.estadoVista.set('VER');
}
}
