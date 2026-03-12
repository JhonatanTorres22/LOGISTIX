import { Component, ElementRef, forwardRef, ViewChild } from '@angular/core';
import { FileUploadModule } from "primeng/fileupload";
import { UiButtonComponent } from "../ui-button/ui-button.component";
import { ControlValueAccessor, NG_VALUE_ACCESSOR  } from '@angular/forms';
import { AlertService } from 'src/assets/demo/services/alert.service';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

@Component({
  selector: 'ui-upload-file',
  imports: [FileUploadModule, UiButtonComponent],
  templateUrl: './upload-file-component.html',
  styleUrl: './upload-file-component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadFileComponent),
      multi: true
    }
  ]
})
export class UploadFileComponent implements ControlValueAccessor {

    constructor(private alerta: AlertService) {}

  // ===== Canvas preview =====
  @ViewChild('pdfCanvas') pdfCanvasRef!: ElementRef<HTMLCanvasElement>;

  // ===== State =====
  file: File | null = null;
  disabled = false;

  // ===== ControlValueAccessor =====
  onChange: (value: File | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: File | null): void {
    if (!value) {
      this.removeFile(false);
      return;
    }

    this.setFile(value, false);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // ===== PrimeNG Upload Handler =====
  onPrimeUpload(event: any): void {
    if (this.disabled) return;

    const file: File = event.files?.[0];

    if (!file) return;

    if (file.type !== 'application/pdf') {
      this.alerta.showAlert('Solo se permiten archivos PDF', 'warning');
      return;
    }

    this.setFile(file);
    this.onChange(file);
    this.onTouched();
  }

  // ===== File handling =====
  setFile(file: File, notify = true): void {
    this.file = file;

    setTimeout(() => {
      this.renderPDF(file);
    });

    if (notify) {
      this.onChange(file);
    }
  }

  async renderPDF(file: File): Promise<void> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 0.3 });
    const canvas = this.pdfCanvasRef.nativeElement;
    const context = canvas.getContext('2d')!;

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context, viewport }).promise;
  }

  // ===== Remove file =====
  removeFile(notify = true): void {
    this.file = null;

    const canvas = this.pdfCanvasRef?.nativeElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    if (notify) {
      this.onChange(null);
      this.onTouched();
    }
  }
}
