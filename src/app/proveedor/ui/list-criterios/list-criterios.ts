import { SharedModule } from '@/core/components/shared.module';
import { EvaluacionRepository } from '@/proveedor/domain/repositories/evaluacion.repository';
import { EvaluacionSignal } from '@/proveedor/domain/signals/evaluacion.signal';
import { ProveedorSignal } from '@/proveedor/domain/signals/proveedor.signal';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { CrearEvaluacion, Criterio, EditarEvaluacion, ResponseEvaluacion } from '@/proveedor/domain/models/evaluacion.model';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TabsModule } from "primeng/tabs";
pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface ArchivoTemporal {
  file: File | { name: string };
  preview: SafeResourceUrl | null;
}

@Component({
  selector: 'app-list-criterios',
  imports: [SharedModule, UiLoadingProgressBarComponent, UiButtonComponent, TabsModule],
  templateUrl: './list-criterios.html',
  styleUrl: './list-criterios.scss'
})
export class ListCriterios implements OnInit {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  loading = false
  editing = false
  archivosTemporales: { [key: number]: ArchivoTemporal } = {};

  signalProveedor = inject(ProveedorSignal);
  proveedorSelect = this.signalProveedor.proveedorSelect;
  repository = inject(EvaluacionRepository);
  signal = inject(EvaluacionSignal);

  listCriterio = this.signal.listCriterio;
  listEvaluacion = this.signal.listarEvaluacion;

  formEvaluacion: FormGroup;

  hasEvaluaciones: boolean = false;
  constructor(private alert: AlertService,
    private sanitizer: DomSanitizer
  ) {
    this.formEvaluacion = new FormGroup({
      criterios: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.cargarCriteriosYEvaluaciones();
  }

  get criteriosFormArray(): FormArray {
    return this.formEvaluacion.get('criterios') as FormArray;
  }

  createCriterioFormGroup(observacion = '', cumple = false): FormGroup {
    return new FormGroup({
      observacion: new FormControl(observacion),
      cumple: new FormControl(cumple)
    });
  }

  getCriterioFormGroup(i: number): FormGroup {
    return this.criteriosFormArray.at(i) as FormGroup;
  }

  async generatePreview(file: File): Promise<string> {
    if (file.type.startsWith('image/')) {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    }
    return '';
  }

onUpload(event: any, criterioId: number) {
  if (event.files?.length > 0) {
    const file: File = event.files[0];

    let preview: SafeResourceUrl | null = null;

    if (file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      preview = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    this.archivosTemporales[criterioId] = { file, preview };
  }
}
  cargarCriteriosYEvaluaciones() {
    this.loading = true;

    this.repository.obtenerCriterio().subscribe({
      next: (criteriosData) => {
        const criterios = criteriosData.data;
        this.listCriterio.set(criterios);

        this.repository.obtenerEvaluacion(this.proveedorSelect().id).subscribe({
          next: (evaluacionData) => {
            this.listEvaluacion.set(evaluacionData.data);
            const evaluaciones = evaluacionData.data[0]?.evaluaciones || [];
            this.hasEvaluaciones = evaluaciones.length > 0;

            this.criteriosFormArray.clear();
            this.archivosTemporales = {};

            criterios.forEach((criterio) => {
              const evalExistente = evaluaciones.find(e => e.idCriterio === criterio.id);
              this.criteriosFormArray.push(
                this.createCriterioFormGroup(evalExistente?.observacion, evalExistente?.cumple)
              );

              if (evalExistente?.documento && evalExistente.documento !== 'none') {
                this.archivosTemporales[criterio.id] = {
                  file: { name: evalExistente.documento },
                  preview: this.getPreview(evalExistente.documento)
                };
              }
            });

            this.alert.showAlert('Criterios y evaluaciones cargados correctamente', 'success');
            this.loading = false;
          },
          error: () => {
            this.alert.showAlert('Error al obtener evaluaciones', 'error');
            this.loading = false;
          }
        });
      },
      error: () => {
        this.alert.showAlert('Hubo un error al listar los criterios', 'error');
        this.loading = false;
      }
    });
  }

getPreview(documento: string): SafeResourceUrl | null {
  // NO hay URL real → no preview
  return null;
}

  openFileDialog(fileUpload: any) {
    (fileUpload as any).browse();
  }

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  guardarOEditar() {
    this.loading = true
    let invalid = false;
    const evaluaciones: (CrearEvaluacion | EditarEvaluacion)[] = [];

    this.listCriterio().forEach((criterio, index) => {
      const formGroup = this.getCriterioFormGroup(index);
      const archivoTemp = this.archivosTemporales[criterio.id];

      const observacion = formGroup.get('observacion')?.value?.trim();
      const cumple = formGroup.get('cumple')?.value === true;
      const tieneArchivo = !!archivoTemp;

      if (criterio.obligatorio && (!observacion || !tieneArchivo)) {
        invalid = true;
        this.loading = false
        return;
      }

      if (!observacion && !cumple && !tieneArchivo) {this.loading = false;return};

      const evalExistente = this.getEvaluacion(criterio.id)
      const evaluacion = this.editing && evalExistente
        ? {
          idEvaluacion: evalExistente.idEvaluacion,
          idProveedor: this.proveedorSelect().id,
          cumple,
          observacion: observacion ?? '',
          documento: tieneArchivo ? archivoTemp.file.name : 'none'
        }
        : {
          idProveedor: this.proveedorSelect().id,
          idCriterio: criterio.id,
          cumple,
          observacion: observacion ?? '',
          documento: tieneArchivo ? archivoTemp.file.name : 'none'
        };

      evaluaciones.push(evaluacion);
    });

    if (invalid) {
      this.alert.showAlert('Complete los campos obligatorios', 'warning');
      this.loading = false
      return;
    }

    if (!evaluaciones.length) {
      this.alert.showAlert('No hay datos para guardar', 'info');
      this.loading = false
      return;
    }

    this.alert.sweetAlert('question', '¿Confirmar?', '¿Está seguro que desea realizar la acción?')
    .then(result => {
      if(!result){this.loading = false; return}
    const obs = this.editing
      ? this.repository.editar(evaluaciones as EditarEvaluacion[])
      : this.repository.crear(evaluaciones as CrearEvaluacion[]);

    obs.subscribe({
      next: (res: ResponseEvaluacion) => {
        const msg = this.editing ? 'actualizadas' : 'guardadas';
        this.alert.showAlert(`Evaluaciones ${msg} correctamente, ${res.message}`, 'success');
        this.closeDialog();
        this.loading = false
      },
      error: (err: ResponseEvaluacion) => {
        this.alert.showAlert(`Error al ${this.editing ? 'editar' : 'guardar'}, ${err.message}`, 'error');
        this.loading = false
      }
    });
    })
  }

  getEvaluacion(codigoCriterio: number) {
    const proveedor = this.listEvaluacion().find(p => p.idProveedor === this.proveedorSelect().id);
    if (!proveedor || !Array.isArray(proveedor.evaluaciones)) return null;
    return proveedor.evaluaciones.find(e => e.idCriterio === codigoCriterio) || null;
  }

  tieneEvaluacion(criterioId: number): boolean {
    const formIndex = this.listCriterio().findIndex(c => c.id === criterioId);
    const formGroup = this.criteriosFormArray.at(formIndex);
    return !!formGroup?.get('observacion')?.value
      || !!formGroup?.get('cumple')?.value
      || !!this.archivosTemporales[criterioId];
  }
}
