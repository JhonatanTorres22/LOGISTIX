import { SharedModule } from '@/core/components/shared.module';
import { GipeoSignal } from '@/proceso-compras/domain/signals/gipeo.signal';
import { Component, effect, inject, signal } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { SubTarea } from '@/proceso-compras/domain/models/gipeo.model';
import { ProveedorProductoSignal } from '@/proveedor-producto/domain/signals/proveedor-producto.signal';
import { AnexoPorFaseRepository } from '@/proceso-compras/domain/repository/anexoSolicitud.repository';
import { ProcesoComprasModule } from '@/proceso-compras/proceso-compras-module';
import { Card } from "@/core/components/card/card";
import { Tree } from "primeng/tree";

@Component({
  selector: 'app-list-indicador',
  imports: [ProcesoComprasModule, Card, Tree],
  templateUrl: './list-indicador.html',
  styleUrl: './list-indicador.scss'
})
export class ListIndicador {
  signal = inject(GipeoSignal);
  selectSubTarea = this.signal.selectSubTarea
  listIndicador = this.signal.listIndicador;

  repository = inject(AnexoPorFaseRepository)
  signalProveedorProducto = inject(ProveedorProductoSignal)
  signalProveProdDefault = this.signalProveedorProducto.selectProveedorProducto

  treeData = signal<TreeNode[]>([]);
  presupuestoTotal : number = 0
  constructor(
    private alert: AlertService
  ) {

    effect(() => {
      const indicadores = this.listIndicador();

      if (!indicadores || indicadores.length === 0) {
        this.treeData.set([]);
        return;
      }

      this.treeData.set(this.mapTareas(indicadores));
      this.presupuestoTotal = this.selectSubTarea().rh + this.selectSubTarea().impr + this.selectSubTarea().inv + this.selectSubTarea().rmf
    });



  }
  ngOnInit(): void {
    const data = this.listIndicador();
    this.treeData.set(this.mapTareas(data));
    
  }

  private mapTareas(data: any[]): TreeNode[] {
    return data.flatMap(iapoa =>
      iapoa.tfp.map((tarea: any) => ({
        label: tarea.nombreTarea,
        data: tarea,
        expanded: true,
        children: tarea.stfp.map((sub: any) => ({
          label: sub.nombreSubTarea,
          data: {
            ...sub,
            totalPresupuesto:
              (sub.rh ?? 0) +
              (sub.rmf ?? 0) +
              (sub.inv ?? 0) +
              (sub.impr ?? 0)
          }
        }))
      }))
    );
  }

  seleccionarSubTarea = (subtarea: SubTarea) => {
    if (subtarea.rmf + subtarea.rh + subtarea.inv + subtarea.impr == 0) {
      this.alert.showAlert('El presupuesto es 0, no podrá realizar la solicitud de compra', 'error')
      return
    }
    this.selectSubTarea.set(subtarea)
    this.signalProveProdDefault.set([])
  }
}
