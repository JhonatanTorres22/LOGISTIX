import { SharedModule } from '@/core/components/shared.module';
import { EvaluacionRepository } from '@/proveedor/domain/repositories/evaluacion.repository';
import { ProveedorRepository } from '@/proveedor/domain/repositories/proveedor.repository';
import { EvaluacionSignal } from '@/proveedor/domain/signals/evaluacion.signal';
import { ProveedorSignal } from '@/proveedor/domain/signals/proveedor.signal';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { Criterio } from '@/proveedor/domain/models/evaluacion.model';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import { UiInputComponent } from "@/core/components/ui-input/ui-input.component";
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
interface ArchivoTemporal {
  file: File;
  preview: string; // base64 o icono
}
@Component({
  selector: 'app-list-criterios',
  imports: [SharedModule, UiLoadingProgressBarComponent, UiButtonComponent, UiInputComponent],
  templateUrl: './list-criterios.html',
  styleUrl: './list-criterios.scss'
})
export class ListCriterios implements OnInit {
   @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  loading: boolean = false;
  repository = inject(EvaluacionRepository);
  signal = inject(EvaluacionSignal);
  listCriterio = this.signal.listEvaluacion;

  archivosTemporales: { [key: number]: ArchivoTemporal } = {};
  formEvaluacion: FormGroup;

  constructor(private alert: AlertService) {
    this.formEvaluacion = new FormGroup({
      criterios: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.obtener();
  }

  get criteriosFormArray(): FormArray {
    return this.formEvaluacion.get('criterios') as FormArray;
  }

  obtener = () => {
    this.loading = true;
    this.repository.obtenerCriterio().subscribe({
      next: (data) => {
        this.listCriterio.set(data);
        this.alert.showAlert('Listando los criterios', 'success');

        // LIMPIAR
        // this.criteriosFormArray.clear();

        // // CREAR CONTROL POR CADA CRITERIO con validaciones condicionales
        // data.forEach((criterio) => {
        //   this.criteriosFormArray.push(
        //     new FormGroup({
        //       observacion: new FormControl('', criterio.obligatorio ? Validators.required : []),
        //       documento: new FormControl('', criterio.obligatorio ? Validators.required : []),
        //       cumple: new FormControl(false)
        //     })
        //   );
        // });

        this.loading = false;
      },
      error: () => {
        this.alert.showAlert('Hubo un error al listar los criterios', 'error');
        this.loading = false;
      }
    });
  }

  onUpload(event: any, criterioId: number) {
    if (event.files && event.files.length > 0) {
      const file = event.files[0];

      if (file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = async () => {
          const typedArray = new Uint8Array(reader.result as ArrayBuffer);
          const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 0.3 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d')!;
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          await page.render({ canvasContext: context, viewport }).promise;
          const preview = canvas.toDataURL();
          this.archivosTemporales[criterioId] = { file, preview };
        };
        reader.readAsArrayBuffer(file);
      } else if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.archivosTemporales[criterioId] = { file, preview: reader.result as string };
        };
        reader.readAsDataURL(file);
      } else {
        // Excel u otros archivos: se puede usar un icono genérico
        this.archivosTemporales[criterioId] = { file, preview: 'assets/file-icon.png' };
      }
    }
  }

  openFileDialog(fileUpload: any) {
    (fileUpload as any).browse();
  }

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  guardar() {
    // Validar que los obligatorios tengan observación y archivo
    let invalid = false;

    this.criteriosFormArray.controls.forEach((ctrl, i) => {
      const obligatorio = this.listCriterio()[i].obligatorio;
      if (obligatorio) {
        if (!ctrl.get('observacion')?.value || !this.archivosTemporales[i]?.file) {
          invalid = true;
        }
      }
    });

    if (invalid) {
      this.alert.showAlert('Complete todos los campos obligatorios', 'warning');
      this.criteriosFormArray.markAllAsTouched();
      return;
    }

    // Preparar datos para envío
    const resultados = this.criteriosFormArray.controls.map((ctrl, i) => ({
      criterioId: this.listCriterio()[i].id,
      observacion: ctrl.get('observacion')?.value,
      archivo: this.archivosTemporales[i]?.file || null,
      cumple: ctrl.get('cumple')?.value
    }));

    console.log('Datos a enviar:', resultados);
    this.alert.showAlert('Datos guardados correctamente', 'success');

    // Aquí podrías hacer tu llamada al backend
  }

}
