import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EXAMENES_CONFIG } from './config.preguntas';
import { FileUploadModule } from "primeng/fileupload";
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { FieldsetModule } from 'primeng/fieldset';
import { UiInputComponent } from "@/core/components/ui-input/ui-input.component";
import { ListConsultaRuc } from "../list-consulta-ruc/list-consulta-ruc";
interface ArchivoTemporal {
  file: File | { name: string };
  preview: SafeResourceUrl | null;
}

@Component({
  selector: 'app-upload-ficha-evaluacion',
  imports: [FileUploadModule, FieldsetModule, CommonModule, SelectModule,
    CheckboxModule, ReactiveFormsModule, FormsModule, UiInputComponent],
  templateUrl: './upload-ficha-evaluacion.html',
  styleUrl: './upload-ficha-evaluacion.scss'
})

export class UploadFichaEvaluacion {
  preview: SafeResourceUrl | null = null;
  @Input() examenTipo!: string;
  @Input() criterioId!: number;

  form!: FormGroup;
  config = EXAMENES_CONFIG;

  archivo: ArchivoTemporal | null = null;

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.config = EXAMENES_CONFIG[this.examenTipo];

    // Caso general: TRABAJADORES necesita FormArray de periodos
    if (this.examenTipo === 'TRABAJADORES') {
      this.form = this.fb.group({
        cantidad: [''],
        periodos: this.fb.array([])
      });
    } else {
      // Para los demás tipos
      const group: any = {};
      this.config.campos.forEach((campo: any) => {
        group[campo.key] = [''];
      });
      this.form = this.fb.group(group);
    }
  }

  // Getter para acceder al FormArray de periodos
  get periodos(): FormArray {
    return this.form.get('periodos') as FormArray;
  }

  // Cuando cambia la cantidad de periodos
  onCantidadChange(cantidad: number) {
    this.periodos.clear();
    for (let i = 0; i < cantidad; i++) {
      this.periodos.push(this.fb.group({
        nombrePeriodo: [''],
        numeroTrabajadores: [0],
        numeroPensionistas: [0],
        numeroPrestadoresServicios: [0]
      }));
    }
  }

  onUpload(event: any) {
    const file: File = event.files?.[0];
    if (!file) return;

    if (file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);

      this.archivo = {
        file,
        preview: this.sanitizer.bypassSecurityTrustResourceUrl(url)
      };
    }
  }

  openFileDialog(fileUpload: any) {
    fileUpload.advancedFileInput.nativeElement.click();
  }
}