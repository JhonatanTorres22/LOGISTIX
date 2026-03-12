import { Component, effect, EventEmitter, inject, Input, Output } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { TabsModule } from "primeng/tabs";
import { DrawerModule } from "primeng/drawer";
import { UploadFichaEvaluacion } from "./upload-ficha-evaluacion/upload-ficha-evaluacion";
import { ListConsultaRuc } from "./list-consulta-ruc/list-consulta-ruc";
import { ProveedorSignal } from '@/proveedor/domain/signals/proveedor.signal';
import { ListTrabajadoresPrestadores } from "./list-trabajadores-prestadores/list-trabajadores-prestadores";
import { EvaluacionSunatSignal } from '@/proveedor/domain/signals/evaluacionSunat.signal';
import { ListDeudaCoactiva } from "./list-deuda-coactiva/list-deuda-coactiva";
import { ListRepresentanteLegal } from "./list-representante-legal/list-representante-legal";

@Component({
  selector: 'app-ficha-evaluacion',
  imports: [ButtonModule, TabsModule, DrawerModule, UploadFichaEvaluacion, ListConsultaRuc, ListTrabajadoresPrestadores, ListDeudaCoactiva, ListRepresentanteLegal],
  templateUrl: './ficha-evaluacion.html',
  styleUrl: './ficha-evaluacion.scss'
})
export class FichaEvaluacion {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>()
  private proveedorSignal = inject(ProveedorSignal)
  selectProveedor = this.proveedorSignal.proveedorSelect
  private signal = inject(EvaluacionSunatSignal)
  actionCerrarDrawer = this.signal.actionCerrarDrawer
  
  value: number = 0;

  constructor(){
    effect(() => {
      if(this.actionCerrarDrawer() == ''){return}
      if(this.actionCerrarDrawer() == 'CERRAR DRAWER'){
        this.closeDrawer()
        this.actionCerrarDrawer.set('')
      }
    })
  }

    closeDrawer() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
