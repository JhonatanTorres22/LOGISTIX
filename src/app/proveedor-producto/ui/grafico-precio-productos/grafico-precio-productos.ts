import { Component, computed, effect, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { Dialog } from "primeng/dialog";
import { ProcesoComprasModule } from "@/proceso-compras/proceso-compras-module";
import { NgxEchartsDirective } from 'ngx-echarts';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProductoSignal } from '@/producto/domain/signals/producto.signal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FloatLabel } from "primeng/floatlabel";
import { ProductoHistoricoRepository } from '@/proveedor-producto/domain/repositories/producto-historico.repository';
import { ProductoHistoricoSignal } from '@/proveedor-producto/domain/signals/producto-historico.signal';


@Component({
  selector: 'app-grafico-precio-productos',
  imports: [Dialog, ProcesoComprasModule, NgxEchartsDirective, AutoCompleteModule, ReactiveFormsModule, FormsModule, CommonModule, FloatLabel],
  templateUrl: './grafico-precio-productos.html',
  styleUrl: './grafico-precio-productos.scss'
})
export class GraficoPrecioProductos {

  loading: boolean = false
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>()
  private productoSignal = inject(ProductoSignal)
  listProducto = this.productoSignal.productoList
  productosFiltrados = signal<any[]>([]);
  productoSeleccionado = signal<any | null>(null);


  private repository = inject(ProductoHistoricoRepository)
  private signal = inject(ProductoHistoricoSignal)
  listProductoHistorico = this.signal.listProductoHistorico


  option: any | null = null;

  constructor() {
    effect(() => {
      const data = this.listProductoHistorico();

      if (!data || data.length === 0) return;

      this.dibujarGraficoPrecios()
      this.loading = false;
    });

  }

  obtenerHistoricoProducto = (id: number) => {
    this.loading = true
    this.repository.buscarPrecioHistorico(id).subscribe({
      next: (data) => {
        console.log(data.data);
        this.loading = false
        this.listProductoHistorico.set(data.data)
      },
      error: (err) => {
        console.log(err);
        this.loading = false

      }
    })
  }

  onProductoSeleccionado(event: any) {
    const producto = event.value;

    if (!producto?.idProducto) return;

    this.loading = true;

    this.obtenerHistoricoProducto(producto.idProducto);
  }

  productosAgrupados = computed(() => {
    return this.listProducto().map(cat => ({
      label: cat.nombre,
      items: cat.productos.map((prod: any) => ({
        idProducto: prod.id,
        nombreProducto: prod.nombreProducto,
        modelo: prod.modeloProducto,
        marca: prod.marca?.nombreMarca,
        imagen: prod.urlImagen
      }))
    }));
  });


  buscarProductos(event: any) {
    const query = (event.query || '').toLowerCase();

    const filtrados = this.productosAgrupados()
      .map(grupo => ({
        label: grupo.label,
        items: query
          ? grupo.items.filter(p =>
            p.nombreProducto.toLowerCase().includes(query)
          )
          : grupo.items
      }))
      .filter(grupo => grupo.items.length > 0);

    this.productosFiltrados.set(filtrados);
  }

  dibujarGraficoPrecios() {
    const data = this.listProductoHistorico();

    const fechasSet = new Set<string>();
    data.forEach(p => {
      p.historico?.forEach(h =>
        fechasSet.add(h.vigencia.substring(0, 10))
      );
      if (p.vigencia && p.vigencia !== '0001-01-01T00:00:00') {
        fechasSet.add(p.vigencia.substring(0, 10));
      }
    });

    const fechas = Array.from(fechasSet).sort();
    const series: any[] = [];

    const colores = ['#5470C6', '#91CC75', '#EE6666', '#FAC858'];

    data.forEach((p, index) => {
      const nombreProveedor = p.proveedor?.nombreProveedor ?? 'Proveedor';
      const mapa = new Map<string, number>();
      const color = colores[index % colores.length];

      p.historico?.forEach(h =>
        mapa.set(h.vigencia.substring(0, 10), h.precio)
      );

      if (p.vigencia && p.vigencia !== '0001-01-01T00:00:00') {
        mapa.set(p.vigencia.substring(0, 10), p.precio);
      }

      const valores = fechas.map(f => mapa.get(f) ?? null);
      const ultimaFecha = p.vigencia?.substring(0, 10);

      // Línea
      series.push({
        name: nombreProveedor,
        type: 'line',
        smooth: true,
        data: valores,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          width: 3,
          color
        },
        itemStyle: {
          color
        }
      });

      // Punto parpadeo
      if (ultimaFecha && mapa.has(ultimaFecha)) {
        series.push({
          type: 'effectScatter',
          data: [[ultimaFecha, mapa.get(ultimaFecha)]],
          coordinateSystem: 'cartesian2d',
          symbolSize: 16,
          rippleEffect: {
            scale: 3,
            brushType: 'stroke'
          },
          itemStyle: {
            color
          },
          silent: true,
          zlevel: 10
        });
      }
    });

    this.option = {
      title: {
        text: 'Historial de precios por proveedor'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        top: 50
      },
      grid: {
        top: 90,
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: fechas,
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        name: 'Precio'
      },
      series
    };
  }



  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
