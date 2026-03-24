import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CardModule } from "primeng/card";
import { CronogramaSignal } from '@/proceso-compras/domain/signals/cronograma.signal';
import { CronogramaRepository } from '@/proceso-compras/domain/repository/cronograma.repository';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { CommonModule } from '@angular/common';
import { DataPagosRealizados, ListarPagosRealizados } from '@/proceso-compras/domain/models/cronograma.model';
import { TagModule } from "primeng/tag";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table"; import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { Select } from "primeng/select";
import { UiSelectComponent } from "@/core/components/ui-select/ui-select.component";
import { ProcesoComprasModule } from "@/proceso-compras/proceso-compras-module";
import { ApiError } from '@/core/interceptors/error-message.model';

@Component({
  selector: 'app-list-pago-realizado',
  imports: [CardModule, CommonModule, TagModule, ButtonModule, TableModule, DatePickerModule, FormsModule, Select, UiSelectComponent, ProcesoComprasModule],
  templateUrl: './list-pago-realizado.html',
  styleUrl: './list-pago-realizado.scss'
})
export class ListPagoRealizado implements OnInit {
  loading : boolean = false
  private signal = inject(CronogramaSignal);
  listPagosRealizados = this.signal.listPagosRealizados;
  private repository = inject(CronogramaRepository);
  private alert = inject(AlertService);

  filtroTipoPago: string | null = null;
  filtroAlcance: string | null = null;
  filtroFecha: Date | null = null;

  pagosFiltradosActuales: ListarPagosRealizados[] = [];

  tipoPagoOptions = [
    { label: 'Todos', value: null },
    { label: 'Transferencia', value: 'TRANSFERENCIA' },
    { label: 'Cheque', value: 'CHEQUE' },
  ];

  // ── Opciones Local (dinámico desde el signal) ─────────────
  get alcanceOptions() {
    const locales = [
      ...new Set(this.listPagosRealizados().map((p) => p.alcance)),
    ].sort();
    return [
      { label: 'Todos', value: null },
      ...locales.map((l) => ({ label: l, value: l })),
    ];
  }

  ngOnInit(): void {
    this.loading = true
   this.repository.obtenerPagosRealizados().subscribe({
    next : (data : DataPagosRealizados) => {
      this.alert.showAlert(`Listando, ${data.message}`, 'success')
      this.loading = false
      this.listPagosRealizados.set(data.data)
      this.aplicarFiltros();
    },
    error : (err : ApiError) => {
      this.alert.showAlert(`Error, ${err.error.message}`,'error')
      this.loading = false
    }
   })

    
  }

  aplicarFiltros(): void {
  this.pagosFiltradosActuales = this.listPagosRealizados().filter((p) => {
    const matchTipo  = !this.filtroTipoPago || p.tipoPago === this.filtroTipoPago;
    const matchFecha = !this.filtroFecha    || p.fechaPagoRealizado.startsWith(this.toIsoDate(this.filtroFecha));
    const matchAlcance = !this.filtroAlcance || p.alcance === this.filtroAlcance
    return matchTipo && matchAlcance && matchFecha;
  });
}

formatFechaDisplay(fecha: string): string {
  const [y, m, d] = fecha.split('T')[0].split('-');
  return `${d}/${m}/${y}`;
}

  limpiarFiltros(): void {
    this.filtroTipoPago = null;
    this.filtroAlcance = null;
    this.filtroFecha = null;
    this.aplicarFiltros();
  }

  getSeverity(tipo: string): 'success' | 'warn' {
    return tipo === 'TRANSFERENCIA' ? 'success' : 'warn';
  }

  getIcon(tipo: string): string {
    return tipo === 'TRANSFERENCIA' ? 'pi pi-send' : 'pi pi-file';
  }

  toIsoDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}
