import { OrdenCarpetaSignal } from '@/panel-solicitudes/domain/signals/orden-carpetas.signal';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { OrdenCarpetas } from '@/panel-solicitudes/domain/models/orden-carpeta.model';
import { DialogModule } from "primeng/dialog";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-grafico-tree-carpeta-anexo',
  imports: [NgxEchartsModule, DialogModule, CommonModule],
  templateUrl: './grafico-tree-carpeta-anexo.html',
  styleUrl: './grafico-tree-carpeta-anexo.scss'
})
export class GraficoTreeCarpetaAnexo {

   @Input() visible: boolean = false
  @Output() visibleChange = new EventEmitter<boolean>();
  private signal = inject(OrdenCarpetaSignal)
  listOrdenCarpeta = this.signal.listOrdenCarpetas

private mk = (svg: string) =>
    'image://data:image/svg+xml;base64,' + btoa(svg);

  private readonly FOLDER_BLUE = this.mk(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M2 7a2 2 0 012-2h4.586a1 1 0 01.707.293L10.414 6.5a1 1 0 00.707.293H20a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V7z"
            fill="#2563eb" fill-opacity="0.15" stroke="#2563eb" stroke-width="1.4"/>
      <path d="M2 9.5h20" stroke="#2563eb" stroke-width="1" stroke-opacity="0.5"/>
    </svg>`
  );

  private readonly FOLDER_VIOLET = this.mk(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M2 7a2 2 0 012-2h4.586a1 1 0 01.707.293L10.414 6.5a1 1 0 00.707.293H20a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V7z"
            fill="#4f46e5" fill-opacity="0.15" stroke="#4f46e5" stroke-width="1.4"/>
      <path d="M2 9.5h20" stroke="#4f46e5" stroke-width="1" stroke-opacity="0.5"/>
    </svg>`
  );

  private readonly FOLDER_AMBER = this.mk(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M2 7a2 2 0 012-2h4.586a1 1 0 01.707.293L10.414 6.5a1 1 0 00.707.293H20a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V7z"
            fill="#d97706" fill-opacity="0.15" stroke="#d97706" stroke-width="1.4"/>
      <path d="M2 9.5h20" stroke="#d97706" stroke-width="1" stroke-opacity="0.5"/>
    </svg>`
  );

  private readonly FOLDER_GRAY = this.mk(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M2 7a2 2 0 012-2h4.586a1 1 0 01.707.293L10.414 6.5a1 1 0 00.707.293H20a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V7z"
            fill="#94a3b8" fill-opacity="0.2" stroke="#94a3b8" stroke-width="1.4"/>
      <path d="M2 9.5h20" stroke="#94a3b8" stroke-width="1" stroke-opacity="0.4"/>
    </svg>`
  );

  private readonly FILE_GREEN = this.mk(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M6 3h8.586L20 8.414V21a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z"
            fill="#059669" fill-opacity="0.12" stroke="#059669" stroke-width="1.3"/>
      <path d="M14 3v5.5H20" stroke="#059669" stroke-width="1"/>
      <path d="M8 12h8M8 16h5" stroke="#059669" stroke-width="1.2" stroke-linecap="round"/>
    </svg>`
  );

  private readonly FILE_RED = this.mk(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M6 3h8.586L20 8.414V21a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z"
            fill="#dc2626" fill-opacity="0.08" stroke="#dc2626" stroke-width="1.3"/>
      <path d="M14 3v5.5H20" stroke="#dc2626" stroke-width="1"/>
      <path d="M12 9v5M12 16v.5" stroke="#dc2626" stroke-width="1.4" stroke-linecap="round"/>
    </svg>`
  );

 private makeLabel(text: string, color: string, size = 13): any {
    return {
      show: true,
      formatter: text,
      color: color,
      fontSize: size,
      fontFamily: 'Segoe UI, sans-serif',
      fontWeight: size >= 15 ? '700' : '500',
      backgroundColor: '#ffffff',
      borderColor: color,
      borderWidth: 1.5,
      borderRadius: 6,
      padding: [4, 10],
      shadowBlur: 6,
      shadowColor: 'rgba(0,0,0,0.10)',
    };
  }

 transformarData(data: OrdenCarpetas[]): any[] {
    return data.map(carpeta => ({
      name: '  ' + carpeta.prefijo + '-' + carpeta.numeracion,
      symbol: this.FOLDER_BLUE,
      symbolSize: [34, 28],
      label: {
        ...this.makeLabel(
          '  ' + carpeta.prefijo + '-' + carpeta.numeracion,
          '#1d4ed8',
          15
        ),
        padding: [5, 14],
        borderWidth: 2,
        shadowColor: 'rgba(37,99,235,0.18)',
        shadowBlur: 10,
      },
      itemStyle: { color: 'transparent', borderColor: 'transparent' },
      children: carpeta.carpetaConAnexoPorFase
        .map(cf => {
          const anexo = cf.anexoPorFase?.[0];
          if (!anexo) return null;

          const hasArchivo = !!anexo.archivo;
          const hasCrono   = !!anexo.cronograma?.length;

          const icon  = hasArchivo ? this.FOLDER_VIOLET
                      : hasCrono  ? this.FOLDER_AMBER
                      :             this.FOLDER_GRAY;

          const color = hasArchivo ? '#4338ca'
                      : hasCrono  ? '#b45309'
                      :             '#64748b';

          const kids: any[] = [];

          // Archivo adjunto
          if (hasArchivo) {
            kids.push({
              name: '  ' + anexo.archivo!.substring(0, 8) + '….pdf',
              symbol: this.FILE_GREEN,
              symbolSize: [22, 26],
              label: this.makeLabel(
                '  ' + anexo.archivo!.substring(0, 8) + '….pdf',
                '#047857'
              ),
              itemStyle: { color: 'transparent', borderColor: 'transparent' },
            });
          }

          // Cronograma de pagos
          if (hasCrono) {
            anexo.cronograma.forEach((c: any) => {
              const hasDT = !!c.documentoTributario;
              const hasCP = !!c.comprobantePago;

              kids.push({
                name: `  S/ ${c.monto.toLocaleString()}  ·  ${this.formatearFecha(c.fecha)}`,
                symbol: 'roundRect',
                symbolSize: [13, 13],
                itemStyle: { color: '#d97706', borderColor: '#d97706' },
                label: this.makeLabel(
                  `  S/ ${c.monto.toLocaleString()}  ·  ${this.formatearFecha(c.fecha)}`,
                  '#92400e'
                ),
                children: [
                  {
                    name: '  Doc. Tributario',
                    symbol: hasDT ? this.FILE_GREEN : this.FILE_RED,
                    symbolSize: [20, 24],
                    label: this.makeLabel(
                      '  Doc. Tributario',
                      hasDT ? '#047857' : '#b91c1c'
                    ),
                    itemStyle: { color: 'transparent', borderColor: 'transparent' },
                  },
                  {
                    name: '  Comprobante de Pago',
                    symbol: hasCP ? this.FILE_GREEN : this.FILE_RED,
                    symbolSize: [20, 24],
                    label: this.makeLabel(
                      '  Comprobante de Pago',
                      hasCP ? '#047857' : '#b91c1c'
                    ),
                    itemStyle: { color: 'transparent', borderColor: 'transparent' },
                  },
                ],
              });
            });
          }

          return {
            name: '  ' + anexo.nombreAnexo,
            symbol: icon,
            symbolSize: [28, 23],
            label: this.makeLabel('  ' + anexo.nombreAnexo, color),
            itemStyle: { color: 'transparent', borderColor: 'transparent' },
            children: kids,
          };
        })
        .filter(Boolean),
    }));
  }

formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
onChartClick(event: any): void {
    const name: string = event?.data?.name ?? '';
    if (name.includes('….pdf') || name.includes('Doc.') || name.includes('Comprobante')) {
      // Aquí puedes abrir el archivo
      console.log('Abrir archivo:', name.trim());
      // window.open(`TU_URL/${archivo}`, '_blank');
    }
  }
  option: any;

 ngOnInit(): void {
    const data = this.transformarData(this.listOrdenCarpeta());

    this.option = {
      backgroundColor: '#ffffff',
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        backgroundColor: '#f8fafc',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        textStyle: { color: '#1e293b', fontSize: 12 },
        formatter: (p: any) => p.name.trim(),
      },
      series: [
        {
          type: 'tree',
          data: data,
          orient: 'LR',
          top: '4%',
          left: '6%',
          bottom: '4%',
          right: '22%',
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            color: '#cbd5e1',
            width: 1.5,
            curveness: 0.5,
          },
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left',
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left',
            },
          },
          emphasis: {
            focus: 'descendant',
            lineStyle: { color: '#2563eb', width: 2.5 },
          },
          expandAndCollapse: true,
          initialTreeDepth: 3,
          animationDuration: 400,
          animationDurationUpdate: 600,
          animationEasing: 'cubicInOut',
        },
      ],
    };
  }


closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
