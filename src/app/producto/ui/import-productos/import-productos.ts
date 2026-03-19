import { SharedModule } from '@/core/components/shared.module';
import { Component, inject, OnInit } from '@angular/core';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { ProductoRepository } from '@/producto/domain/repository/producto.repository';
import { ProductoSignal } from '@/producto/domain/signals/producto.signal';
import { CrearProducto, ResponseProducto } from '@/producto/domain/models/producto.model';
import * as XLSX from 'xlsx';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { CategoriaSignal } from '@/categoria/domain/signals/categoria.signal';
import { MarcaRepository } from '@/marca/domain/repositories/marca.repository';
import { ApiError } from '@/core/interceptors/error-message.model';

@Component({
  selector: 'app-import-productos',
  imports: [SharedModule, UiLoadingProgressBarComponent, UiButtonComponent],
  templateUrl: './import-productos.html',
  styleUrl: './import-productos.scss'
})
export class ImportProductos implements OnInit {
  loading: boolean = false
  repository = inject(ProductoRepository)
  repositoryMarca = inject(MarcaRepository);
  signal = inject(ProductoSignal)
  selectProducto = this.signal.productoSelect
  productoAccion = this.signal.productoAccion
  alert = inject(AlertService)
  excelProducto: CrearProducto[] = []
  marcasExistentes: { idMarca: number; nombreMarca: string }[] = [];
  productosExistentes: string[] = []; // Lista de productos ya en DB

  ngOnInit(): void {
    this.cargarMarcasExistentes()
    // this.cargarProductosExistentes()
  }
  cargarMarcasExistentes() {
    this.repositoryMarca.obtenerMarcas().subscribe({
      next: res => {
        // todo en mayúsculas
        this.marcasExistentes = res.data.map((m: any) => ({
          idMarca: m.idMarca,
          nombreMarca: (m.nombreMarca || '').trim().toUpperCase()
        }));
      },
      error: err => console.error('Error cargando marcas', err)
    });
  }

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

      this.excelProducto = [];

      const nombresEnExcel = new Set<string>();

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        // Todo en mayúsculas
        const nombreProducto = ((row['nombre'] || row['NOMBRE'] || '') as string).trim().toUpperCase();
        const marcaNombre = ((row['marca'] || row['MARCA'] || '') as string).trim().toUpperCase();

        // Validación marca
        const marcaEncontrada = this.marcasExistentes.find(m => m.nombreMarca === marcaNombre);
        if (!marcaEncontrada) {
          this.alert.showAlert(
            `Error en fila ${i + 2}: la marca "${marcaNombre}" no existe. Comuníquese con el administrador.`,
            'error'
          );
          return;
        }

        // Validación duplicados dentro del Excel
        if (nombresEnExcel.has(nombreProducto)) {
          this.alert.showAlert(
            `Error en fila ${i + 2}: el producto "${nombreProducto}" está duplicado en el Excel.`,
            'error'
          );
          return;
        }
        nombresEnExcel.add(nombreProducto);

        // Validación duplicados contra productos existentes
        const existeEnDB = this.signal.productoList().some(
          p => (p.nombre || '').trim().toUpperCase() === nombreProducto
        );
        if (existeEnDB) {
          this.alert.showAlert(
            `Error en fila ${i + 2}: el producto "${nombreProducto}" ya existe en la base de datos.`,
            'error'
          );
          return;
        }

        // Agregar producto
        this.excelProducto.push({
          idCategoria: this.selectProducto().idCategoria,
          nombreProducto,
          modeloProducto: ((row['modelo'] || row['MODELO'] || '') as string).trim().toUpperCase(),
          descripcionProducto: ((row['descripcion'] || row['DESCRIPCION'] || '') as string).trim().toUpperCase(),
          unidad: ((row['unidad'] || row['UNIDAD'] || '') as string).trim().toUpperCase(),
          // precioReferencial: Number(row['precio'] || row['PRECIO'] || 0),
          urlImagen: ((row['urlImagen'] || row['URLIMAGEN'] || '') as string).trim(),
          tipo : ((row['modelo'] || row['MODELO'] || '') as string).trim().toUpperCase(),
          idMarca: marcaEncontrada.idMarca
        });
      }

      if (this.excelProducto.length) {
        this.alert.showAlert(`${this.excelProducto.length} productos listos para importar`, 'success');
      }
    };

    reader.readAsArrayBuffer(file);
  }

  limpiar() {
    this.excelProducto = [];
  }

  guardar() {
    if (!this.excelProducto.length) return;
    console.log(this.excelProducto, 'producto');
    
    this.alert.sweetAlert('question', '¿Confirmar?', '¿Está seguro que desea importar los productos?')
      .then(result => {
        if (!result) return;

        this.loading = true;

        this.repository.crearMasivo(this.excelProducto).subscribe({
          next: res => {
            this.alert.showAlert(`Productos importados correctamente, ${res.message}`, 'success');
            this.productoAccion.set('CREADO');
            this.limpiar();
            this.loading = false;
          },
          error: (err: ApiError) => {
            console.log(err);
            this.alert.showAlert(`Error al importar los productos, ${err.error.message}`, 'error');
            this.loading = false;
          }
        });
      });
  }

  descargarPlantilla() {
    const link = document.createElement('a');
    link.href = 'assets/plantillas/Plantilla_Productos.xlsx';
    link.download = 'Plantilla_Productos.xlsx';
    link.click();
  }
}
