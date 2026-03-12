import { UiSelect } from '@/core/components/ui-select/ui-select.interface';
import { GipeoRepository } from '@/proceso-compras/domain/repository/gipeo.repository';
import { GipeoSignal } from '@/proceso-compras/domain/signals/gipeo.signal';
import { GipeoValidation } from '@/proceso-compras/domain/validators/gipeo.validator';
import { Component, effect, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UiCardNotItemsComponent } from "@/core/components/ui-card-not-items/ui-card-not-items.component";
import { AlertService } from 'src/assets/demo/services/alert.service';
import { SharedModule } from '@/core/components/shared.module';
import { UiSelectComponent } from "@/core/components/ui-select/ui-select.component";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { UiInputComponent } from '@/core/components/ui-input/ui-input.component';
import { AuthGipeo } from "../auth-gipeo/auth-gipeo";
import { IniciaSesionGipeo } from '@/proceso-compras/domain/models/gipeo.model';
import { ListIndicador } from "../list-indicador/list-indicador";
import { ListSolicitudCompra } from "../list-solicitud-compra/list-solicitud-compra";
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { ProcesoComprasModule } from '@/proceso-compras/proceso-compras-module';

@Component({
  selector: 'app-search-subtarea',
  imports: [ProcesoComprasModule, UiSelectComponent,  AuthGipeo, UiCardNotItemsComponent, ListIndicador, ListSolicitudCompra],
  templateUrl: './search-subtarea.html',
  styleUrl: './search-subtarea.scss'
})
export class SearchSubtarea implements OnInit {
  loading: boolean = false
  signal = inject(GipeoSignal)
  searchSubtarea = this.signal.searchSubtarea
  listIndicador = this.signal.listIndicador
  selectSubTarea = this.signal.selectSubTarea
  actionGipeo = this.signal.actionGipeo
  validators = inject(GipeoValidation)
  repository = inject(GipeoRepository)
  visibleIniciarSesionGipeo : boolean = false

  formSubTarea!: FormGroup
  selectTipoGasto: UiSelect[] = []
  mensajeSearch: string = 'Por favor seleccione el tipo de gasto y digite el código del Indicador de Actividad de POA'
  minLengthSubTarea = this.validators.minLengthSubTarea
  expRegSubTarea = this.validators.expRegSubTarea
  expLockSubTarea = this.validators.expRegLockSubTarea

  constructor(
    private alert: AlertService
  ) {
    this.formSubTarea = new FormGroup({
      tipoGasto: new FormControl('', [Validators.required]),
      codigo: new FormControl('', [Validators.required, Validators.pattern(this.expRegSubTarea), Validators.minLength(this.minLengthSubTarea)])
    })

    effect(() => {
      let action = this.actionGipeo()
      if (action == '') { return }
      if (action !== '') {
        this.searchSubTarea()
      }
      this.actionGipeo.set('');
    })
   }
  ngOnInit(): void {
    this.selectTipoGasto = [
      { disabled: false, text: 'GASTO OPERATIVO', value: 'GASTO OPERATIVO' },
    ]
  }

  searchSubTarea = () => {
    const session = localStorage.getItem('gipeoSession');
    const subTarea = {
      tipo: this.formSubTarea.get('tipoGasto')?.value,
      id: this.formSubTarea.get('codigo')?.value
    };

    this.searchSubtarea.set(subTarea);
    if (session) {
      const dataGipeo = JSON.parse(session);
      this.iniciarSesionConDatos(dataGipeo);
      return;
    }
    this.visibleIniciarSesionGipeo = true
  }

    iniciarSesionConDatos = (dataGipeo: IniciaSesionGipeo) => {
    this.loading = true;
    const iniciarSesion: IniciaSesionGipeo = {
      password: dataGipeo.password,
      rol: dataGipeo.rol,
      userName: dataGipeo.userName,
      idIndicador: this.searchSubtarea().id
    };
    this.repository.authGipeo(iniciarSesion).subscribe({
      next: (data) => {
        console.log(data);        
        data.data.length == 0 ? this.mensajeSearch = `No se encontraron indicadores con el código de la subtarea ${iniciarSesion.idIndicador}` : this.mensajeSearch == ''
        this.listIndicador.set(data.data);
        this.loading = false;
      },
      error: () => {
        this.alert.showAlert('Error al iniciar sesión');
        this.loading = false;
      }
    });
  };
}
