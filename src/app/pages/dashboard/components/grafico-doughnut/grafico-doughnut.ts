import { CronogramaSignal } from '@/proceso-compras/domain/signals/cronograma.signal';
import { SolicitudCompraSignal } from '@/proceso-compras/domain/signals/solicitud-compra.signal';
import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { Card } from "@/core/components/card/card";
@Component({
  selector: 'app-grafico-doughnut',
  imports: [CommonModule, NgxEchartsModule, Card],
  templateUrl: './grafico-doughnut.html',
  styleUrl: './grafico-doughnut.scss'
})
export class GraficoDoughnut {
 private signalSolicitudCompra = inject(SolicitudCompraSignal)
  listOrdenPorFirmar = this.signalSolicitudCompra.listOrdenPorFirmar

  private signalCronograma = inject(CronogramaSignal)
  listDocTributarioPorAprobar = this.signalCronograma.listDocTributarioPorAprobar
  listComprobantePorCargar = this.signalCronograma.listComprobantePorCargar


  option: any = {};
  constructor() {
    effect(() => {
      this.buildChart(); 
    });
  }
  buildChart() {
    const ordenes = this.listOrdenPorFirmar().length;
    const comprobantes = this.listComprobantePorCargar().length;
    const documentos = this.listDocTributarioPorAprobar().length;
    console.log(ordenes);
    

    const total = ordenes + comprobantes + documentos;

    this.option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        bottom: 0
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['50%', '70%'],
          padAngle:3,
          itemStyle: {
            borderRadius: 8,
            borderColor: '#fff',
            borderWidth: 1
          },
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 12,
              fontWeight: 'bold'
            }
          },
          data: [
            { value: ordenes, name: 'Órdenes por firmar' },
            { value: comprobantes, name: 'Comprobantes por cargar' },
            { value: documentos, name: 'Docs por aprobar' }
          ]
        }
      ],
      graphic: {
        type: 'text',
        left: 'center',
        top: 'middle',
        style: {
          text: total.toString(),
          textAlign: 'center',
          fontSize: 28,
          fontWeight: 'bold'
        }
      }
    };
  }
}
