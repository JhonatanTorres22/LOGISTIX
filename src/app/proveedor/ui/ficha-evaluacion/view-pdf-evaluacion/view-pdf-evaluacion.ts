import { EvaluacionSunatSignal } from '@/proveedor/domain/signals/evaluacionSunat.signal';
import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CardModule } from "primeng/card";

@Component({
  selector: 'app-view-pdf-evaluacion',
  imports: [CommonModule, CardModule],
  templateUrl: './view-pdf-evaluacion.html',
  styleUrl: './view-pdf-evaluacion.scss'
})
export class ViewPdfEvaluacion implements OnInit {
  
   @Input() tipoArchivo!: string;
  private signal = inject(EvaluacionSunatSignal)
  selectEvaluacionSunat = this.signal.selectEvaluacionSunat

  pdfUrl!: SafeResourceUrl | null;

constructor(private sanitizer: DomSanitizer) {}

ngOnInit() {
  this.cargarPdf()
}

 cargarPdf() {
    const evaluacion = this.selectEvaluacionSunat();

    if (!evaluacion || !this.tipoArchivo) {
      this.pdfUrl = null;
      return;
    }

    const nombreArchivo = evaluacion[this.tipoArchivo as keyof typeof evaluacion];

    if (!nombreArchivo) {
      this.pdfUrl = null;
      return;
    }

    const baseUrl = 'https://logistix.somee.com/logistix/wwwroot/Sunat/';
    const fullUrl = baseUrl + nombreArchivo;

    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
  }
}
