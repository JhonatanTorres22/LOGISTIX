import { SharedModule } from '@/core/components/shared.module';
import { CrearProveedor, Proveedor, ResponseProveedor } from '@/proveedor/domain/models/proveedor.model';
import { Component, inject } from '@angular/core';
import * as XLSX from 'xlsx';
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { ProveedorRepository } from '@/proveedor/domain/repositories/proveedor.repository';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { ProveedorSignal } from '@/proveedor/domain/signals/proveedor.signal';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";

@Component({
  selector: 'app-import-proveedores',
  imports: [SharedModule, UiButtonComponent, UiLoadingProgressBarComponent],
  templateUrl: './import-proveedores.html',
  styleUrl: './import-proveedores.scss'
})
export class ImportProveedores {

  loading: boolean = false
  repository = inject(ProveedorRepository)
  alert = inject(AlertService)
  signal = inject(ProveedorSignal)
  proveedorAccion = this.signal.proveedorAccion
  excelData: CrearProveedor[] = [];

  onFileSelect(event: any): void {
    const file: File = event.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const rows: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

      this.excelData = rows.map(row => ({
        tipo: row['tipo'] || row['TIPO_PERSONA'],
        nombre: row['nombre'] || row['NOMBRE'],
        ruc: String(row['ruc'] ?? row['RUC'] ?? ''),
        direccion: row['direccion'] || row['DIRECCION']
      }));
    };

    reader.readAsArrayBuffer(file);
  }

  limpiar(): void {
    this.excelData = [];
  }

  guardar(): void {
    this.loading = true
    let agregarMasivo: CrearProveedor[] = this.excelData;
    console.log(agregarMasivo);

    this.alert.sweetAlert('question', '¿Confirmar?', '¿Desea importar los proveedores?').
      then(result => {
        if (!result) { this.loading = false; return }

        this.repository.crearMasivo(agregarMasivo).subscribe({
          next: (res: ResponseProveedor) => {
            this.alert.showAlert(`Proveedores importados correctamente, ${res.message}`, 'success');
            this.limpiar();
            this.proveedorAccion.set('Agregar')
            this.loading = false
          },
          error: (res: ResponseProveedor) => {
            this.alert.showAlert(`Error al importar los proveedores, ${res.message}`, 'error');
            this.loading = false
          }
        });
      })
  }

  descargarPlantilla(): void {
    const link = document.createElement('a');
    link.href = 'assets/plantillas/plantilla_proveedores.xlsx';
    link.download = 'plantilla_proveedores.xlsx';
    link.click();
  }

}
