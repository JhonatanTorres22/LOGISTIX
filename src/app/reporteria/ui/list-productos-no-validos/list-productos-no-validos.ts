import { ApiError } from '@/core/interceptors/error-message.model';
import { ProductoRepository } from '@/producto/domain/repository/producto.repository';
import { ProductoSignal } from '@/producto/domain/signals/producto.signal';
import { DataProductosNoValidos, ListarProductosNoValidos, ListarProveedoresProductosNoValidos } from '@/producto/infraestructure/dto/producto.dto';
import { Component, computed, inject, signal } from '@angular/core';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { CommonModule } from '@angular/common';
import { Card } from "primeng/card";
import { IconField } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { SelectModule } from "primeng/select";
import { ButtonModule } from "primeng/button";
import { BadgeModule } from "primeng/badge";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { ProcesoComprasModule } from "@/proceso-compras/proceso-compras-module";
import { ImageModule } from 'primeng/image';
interface SelectOption { label: string; value: string; }
 
const ESTADOS_OPTIONS: SelectOption[] = [
  { label: 'Aprobado',  value: 'APROBADO'  },
  { label: 'Rechazado', value: 'RECHAZADO' },
  { label: 'Pendiente', value: 'PENDIENTE' },
];
@Component({
  selector: 'app-list-productos-no-validos',
  imports: [CommonModule, Card, IconField, InputIconModule,ImageModule,
    FormsModule, SelectModule, ButtonModule, BadgeModule, TableModule, TagModule, InputTextModule, SkeletonModule, TooltipModule, ProcesoComprasModule],
  templateUrl: './list-productos-no-validos.html',
  styleUrl: './list-productos-no-validos.scss'
})
export class ListProductosNoValidos {
private repository = inject(ProductoRepository);
  private alert      = inject(AlertService);
  private signal     = inject(ProductoSignal);
 
  loading = false;

  private _productos = signal<ListarProductosNoValidos[]>([]);
 
  globalFilter      = signal('');
  selectedProveedor = signal<string | null>(null);
  selectedEstado    = signal<string | null>(null);
 
  proveedoresOptions = signal<SelectOption[]>([]);
  readonly estadosOptions = ESTADOS_OPTIONS;
 
  // computed() ahora SÍ reacciona porque lee signals
  productosFiltrados = computed(() => {
    const texto  = this.globalFilter().toLowerCase().trim();
    const prov   = this.selectedProveedor();
    const estado = this.selectedEstado();
    const data   = this._productos();
 
    return data.filter((p) => {
      const matchNombre = !texto  || p.nombreProductoServicio.toLowerCase().includes(texto);
      const matchProv   = !prov   || p.proveedores.some((pr) => pr.nombreProveedor === prov);
      const matchEstado = !estado || p.proveedores.some((pr) => pr.estadoEvaluacion === estado);
      return matchNombre && matchProv && matchEstado;
    });
  });

  expandedRows: Record<string, boolean> = {};
 
  ngOnInit(): void {
    this.obtenerProductosNoValidos();
  }

  obtenerProductosNoValidos(): void {
    this.loading = true;
    this.repository.obtenerProductosNoValidos().subscribe({
      next: (res: DataProductosNoValidos) => {
        this.loading = false;
        this.alert.showAlert(res.message, 'success');
        this.signal.listProductosNoValidos.set(res.data);
        this._productos.set(res.data);
        this._buildProveedoresOptions(res.data);
      },
      error: (err: ApiError) => {
        this.loading = false;
        this.alert.showAlert(`Error: ${err.error.message}`, 'error');
      },
    });
  }
 
  private _buildProveedoresOptions(data: ListarProductosNoValidos[]): void {
    const nombres = new Set<string>();
    data.forEach((p) => p.proveedores.forEach((pr) => nombres.add(pr.nombreProveedor)));
    this.proveedoresOptions.set(
      [...nombres].sort().map((n) => ({ label: n, value: n }))
    );
  }

  get globalFilterValue(): string         { return this.globalFilter(); }
  set globalFilterValue(v: string)        { this.globalFilter.set(v); this.expandedRows = {}; }
 
  get selectedProveedorValue(): string | null      { return this.selectedProveedor(); }
  set selectedProveedorValue(v: string | null)     { this.selectedProveedor.set(v); this.expandedRows = {}; }
 
  get selectedEstadoValue(): string | null         { return this.selectedEstado(); }
  set selectedEstadoValue(v: string | null)        { this.selectedEstado.set(v); this.expandedRows = {}; }
 
  clearFilters(): void {
    this.globalFilter.set('');
    this.selectedProveedor.set(null);
    this.selectedEstado.set(null);
    this.expandedRows = {};
  }
 
  get hasActiveFilters(): boolean {
    return !!this.globalFilter() || !!this.selectedProveedor() || !!this.selectedEstado();
  }

  expandAll(): void {
  const rows: Record<string, boolean> = {};
  this.productosFiltrados().forEach((p) => {
    rows[String(p.idProductoServicio)] = true;
  });
  this.expandedRows = rows;
}

collapseAll(): void {
  this.expandedRows = {};
}

get allExpanded(): boolean {
  const data = this.productosFiltrados();
  return data.length > 0 && data.every((p) => this.expandedRows[String(p.idProductoServicio)]);
}

onRowExpand(event: { data: ListarProductosNoValidos }): void {
  this.expandedRows = {
    ...this.expandedRows,
    [String(event.data.idProductoServicio)]: true
  };
}

onRowCollapse(event: { data: ListarProductosNoValidos }): void {
  const rows = { ...this.expandedRows };
  delete rows[String(event.data.idProductoServicio)];
  this.expandedRows = rows;
}

  getEstadoSeverity(estado: string): 'success' | 'danger' | 'warn' | 'secondary' {
    const map: Record<string, 'success' | 'danger' | 'warn' | 'secondary'> = {
      APROBADO: 'success', RECHAZADO: 'danger', PENDIENTE: 'warn',
    };
    return map[estado] ?? 'secondary';
  }
 
  getEstadoIcon(estado: string): string {
    const map: Record<string, string> = {
      APROBADO: 'pi pi-check-circle', RECHAZADO: 'pi pi-times-circle', PENDIENTE: 'pi pi-clock',
    };
    return map[estado] ?? 'pi pi-question-circle';
  }

  trackById(_: number, item: ListarProductosNoValidos): number {
    return item.idProductoServicio
  }

   async exportToExcel(): Promise<void> {
    const XLSX = await import('xlsx');
    const rows = this.productosFiltrados().flatMap((p, i) =>
      p.proveedores.map((pr, j) => ({
        'N°':              j === 0 ? i + 1 : '',
        'ID Producto':     j === 0 ? p.idProductoServicio : '',
        'Nombre Producto': j === 0 ? p.nombreProductoServicio : '',
        'Proveedor':       pr.nombreProveedor,
        'Precio Ref. (S/)': pr.precioReferencial,
        'Estado':          pr.estadoEvaluacion,
      }))
    );
    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = Object.keys(rows[0] ?? {}).map((k) => ({
      wch: Math.max(k.length, ...rows.map((r) => String((r as Record<string, unknown>)[k] ?? '').length)) + 2,
    }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Productos No Válidos');
    XLSX.writeFile(wb, `productos_no_validos_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }
}
