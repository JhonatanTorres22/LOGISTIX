import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { DataCarpetas, InsertarCarpetas, InsertarCarpetasConAnexo, ListarCarpetas } from '@/proceso-compras/domain/models/carpetas.models';
import { CarpetasRepository } from '@/proceso-compras/domain/repository/carpeta.repository';
import { CarpetaSignal } from '@/proceso-compras/domain/signals/carpeta.signal';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { DialogModule } from "primeng/dialog";
import { DataViewModule } from "primeng/dataview";
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { CheckboxModule } from "primeng/checkbox";
import { RadioButtonModule } from "primeng/radiobutton";
import { FormsModule } from '@angular/forms';
import { AnexoPorFaseSignal } from '@/proceso-compras/domain/signals/anexoPorFase.signal';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-list-carpetas',
  imports: [CommonModule, FormsModule, DialogModule, DataViewModule, UiLoadingProgressBarComponent, UiButtonComponent, CheckboxModule, RadioButtonModule],
  templateUrl: './list-carpetas.html',
  styleUrl: './list-carpetas.scss'
})
export class ListCarpetas implements OnInit {
  @Input() idNuevoAnexoPorFase: number = 0
  @Input() modo: 'LISTAR' | 'SELECCIONAR' = 'LISTAR'
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  private repository = inject(CarpetasRepository)
  private signalCarpeta = inject(CarpetaSignal)
  listCarpeta = this.signalCarpeta.listCarpeta
  selectCarpeta = this.signalCarpeta.carpetaSelect
  selectCarpetaDefult = this.signalCarpeta.carpetaSelectDefault
  actionCarpeta = this.signalCarpeta.actionCarpeta
  private alert = inject(AlertService)

  private anexoSignal = inject(AnexoPorFaseSignal)
  listAnexo = this.anexoSignal.listAnexos
  selectAnexo = this.anexoSignal.selectAnexo
  siglaArea = this.anexoSignal.siglaArea
  loading: boolean = false
  newNumeracion: string = ''
  newPrefijo: string = ''

  private agregarCarpetaConAnexo = false;
  private idNuevaCarpeta: number | null = null;


  ngOnInit(): void {
    if (this.listCarpeta().length) {
      this.calcularSiguienteNumeracion();
      return;
    }
    this.cargarCarpetas();
  }

  private cargarCarpetas(): void {
    this.loading = true;

    this.repository.obtenerCarpeta(this.siglaArea())
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => {
          this.listCarpeta.set(res.data ?? []);
          this.calcularSiguienteNumeracion();

          if (this.agregarCarpetaConAnexo) {
            const ultimaCarpeta = this.listCarpeta().at(-1);
            if (ultimaCarpeta) {
              this.idNuevaCarpeta = ultimaCarpeta.idCarpeta;
              this.insertarCarpetaConAnexoOrdenCompra();
            }
            this.agregarCarpetaConAnexo = false;
          }
        },
        error: err => {
          this.alert.showAlert(`Error al listar carpetas, ${err.userMessage}`, 'error');
        }
      });
  }

  private calcularSiguienteNumeracion(): void {
    const carpetas = this.listCarpeta();

    if (!carpetas.length) {
      this.newPrefijo = this.siglaArea();
      this.newNumeracion = '00001';
      return;
    }

    let max = 0;
    let length = carpetas[0].numeracion.length;
    let prefijo = carpetas[0].prefijo;

    for (const c of carpetas) {
      const n = Number(c.numeracion);
      if (n > max) {
        max = n;
        length = c.numeracion.length;
        prefijo = c.prefijo;
      }
    }

    this.newPrefijo = prefijo;
    this.newNumeracion = (max + 1).toString().padStart(length, '0');
  }


  accionCarpeta(): void {
    if (this.modo === 'LISTAR') {
      // Solo activamos la bandera si realmente queremos que después se agregue con anexo
      this.insertarCarpeta();

    } else {
      this.insertarCarpetaConAnexo();
    }
  }

  insertarCarpeta(): void {
    const payload: InsertarCarpetas = {
      numeracion: this.newNumeracion,
      prefijo: this.newPrefijo
    };

    this.alert.sweetAlert('question', '¿Confirmar?', '¿Desea crear la carpeta?')
      .then(ok => {
        if (!ok) return;

        this.loading = true;
        this.repository.insertarCarpeta(payload)
          .pipe(finalize(() => this.loading = false))
          .subscribe({
            next: res => {
              this.alert.showAlert(`Carpeta creada, ${res.message}`, 'success');
              // if(this.selectAnexo().nombre == 'Orden de Compra'){
              //   this.actionCarpeta.set('INSERTAR CARPETA CON ANEXO')
              // }
              // else{
              //   this.actionCarpeta.set('INSERTAR CARPETA CON ANEXO EN ORDEN');
              // }
              this.cargarCarpetas();
              if (this.selectAnexo().nombre === 'Orden de Compra') {
                this.agregarCarpetaConAnexo = true;
              }
              this.closeDialog();
            },
            error: err => {
              this.alert.showAlert(`Error al crear, ${err.userMessage}`, 'error');
            }
          });
      });
  }

  insertarCarpetaConAnexoOrdenCompra = () => {
    console.log('insertar carpeta con anexo en orden');

    if (!this.idNuevaCarpeta) {
      this.alert.showAlert('No hay carpeta seleccionada', 'warning');
      return;
    }

    const payload: InsertarCarpetasConAnexo = {
      idAnexosPorFase: this.idNuevoAnexoPorFase,
      idCarpeta: this.idNuevaCarpeta
    }

    console.log(payload, 'insertando carpetas con anexo en componente de carpetas');

    this.alert.sweetAlert('question', '¿Confirmar?', '¿Guardar archivo en la carpeta?')
      .then(ok => {
        if (!ok) return;

        this.repository.insertarCarpetaConAnexo(payload)
          .subscribe({
            next: res => {
              this.alert.showAlert(`Guardado, ${res.message}`, 'success');
              const action = this.selectAnexo().nombre == 'Orden Firmada' ? 'INSERTAR CARPETA CON ANEXO EN ORDEN' : 'INSERTAR CARPETA CON ANEXO'
              this.actionCarpeta.set(action);
              this.closeDialog();
            },
            error: err => {
              this.alert.showAlert(`Error, ${err.error?.Message}`, 'error');
            }
          });
      });
  }
  insertarCarpetaConAnexo(): void {
    this.loading = true
    const payload: InsertarCarpetasConAnexo = {
      idAnexosPorFase: this.idNuevoAnexoPorFase,
      idCarpeta: this.selectCarpeta().idCarpeta
    }
    console.log(payload, 'insertando carpetas con anexo en componente de carpetas');

    this.alert.sweetAlert('question', '¿Confirmar?', '¿Guardar archivo en la carpeta?')
      .then(ok => {
        if (!ok) return;

        this.repository.insertarCarpetaConAnexo(payload)
          .subscribe({
            next: res => {
              this.loading = false
              this.alert.showAlert(`Guardado, ${res.message}`, 'success');
              const action = this.selectAnexo().nombre == 'Orden Firmada' ? 'INSERTAR CARPETA CON ANEXO EN ORDEN' : 'INSERTAR CARPETA CON ANEXO'
              this.actionCarpeta.set(action);
              this.closeDialog();
            },
            error: err => {
              this.loading = false
              this.alert.showAlert(`Error, ${err.error?.Message}`, 'error');
            }
          });
      });
  }

  seleccionarCarpeta(carpeta: ListarCarpetas): void {
    this.selectCarpeta.set(carpeta);
  }

  closeDialog(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  ngOnDestroy(): void {
    this.actionCarpeta.set('');
  }

}
