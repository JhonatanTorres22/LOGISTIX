import { ApiError } from '@/core/interceptors/error-message.model';
import { AnexosPorFaseOrdenCompra, OrdenCompraDetalle } from '@/proceso-compras/domain/models/ordenCompraDetalle.model';
import { SolicitudCompraRepository } from '@/proceso-compras/domain/repository/solicitud-compra.repository';
import { OrdenCompraDetalleSignal } from '@/proceso-compras/domain/signals/ordenCompraDetalle.signal';
import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit, signal } from '@angular/core';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { TagModule } from "primeng/tag";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";

@Component({
  selector: 'app-view-orden-despachar',
  imports: [CommonModule, TagModule, ButtonModule, TableModule],
  templateUrl: './view-orden-despachar.html',
  styleUrl: './view-orden-despachar.scss'
})
export class ViewOrdenDespachar implements OnChanges{
    loading = false
 
    @Input() ordenId!: number  | null;
  private alert      = inject(AlertService)
  private repository = inject(SolicitudCompraRepository)
  private signal     = inject(OrdenCompraDetalleSignal)
 
  listOrdenCompra = this.signal.listOrdenCompraDetalle
 
  /**
   * Mapa de selecciones por anexo:
   * { [idAnexosPorFase]: OrdenCompra[] }
   * Necesario porque p-table usa [(selection)] y cada tabla es independiente.
   */
  seleccionadosPorAnexo: Record<number, OrdenCompraDetalle[]> = {}
 
  /** Lista plana de todos los ítems seleccionados (computed reactivo) */
  seleccionados = signal<OrdenCompraDetalle[]>([])
 
  ngOnInit(): void {
    // this.obtenerOrdenCompra()
  }

  ngOnChanges() {
  if (this.ordenId) {
    this.obtenerOrdenCompra(this.ordenId);
  }
}
 
  obtenerOrdenCompra(id:number): void {
    if(this.ordenId == null || this.ordenId == 0){return}
    this.loading = true
    this.repository.obtenerOrdenCompraDetalle(id).subscribe({
      next: (data) => {
        this.listOrdenCompra.set(data.data)
        this.inicializarSelecciones()
        this.loading = false
        this.alert.showAlert(`Listar Orden, ${data.message}`, 'success')
      },
      error: (err: ApiError) => {
        this.loading = false
        this.alert.showAlert(`Error, ${err.error.message}`, 'error')
      }
    })
  }
 
  /** Inicializa el mapa con arrays vacíos por cada anexo */
  private inicializarSelecciones(): void {
    const data = this.listOrdenCompra()
    if (!data?.length) return
    data[0].anexosPorFases.forEach((anexo: AnexosPorFaseOrdenCompra) => {
      this.seleccionadosPorAnexo[anexo.idAnexosPorFase] = []
    })
  }
 
  /** Llamado por (selectionChange) de cada tabla — actualiza el signal global */
  onSelectionChange(): void {
    const todos = Object.values(this.seleccionadosPorAnexo).flat()
    this.seleccionados.set(todos)
  }
 
  /** Retorna los ítems pendientes (despacho === false) de un anexo */
  obtenerPendientes(anexo: AnexosPorFaseOrdenCompra): OrdenCompraDetalle[] {
    return anexo.ordenCompra.filter(o => !o.despacho)
  }

  /** Acción de despacho — aquí conectas tu lógica/endpoint */
  despacharSeleccionados(): void {
    const items = this.seleccionados()
    console.log('Despachando:', items)
    this.alert.showAlert(`Despachando ${items.length} ítem(s)`, 'info')
  }
}

