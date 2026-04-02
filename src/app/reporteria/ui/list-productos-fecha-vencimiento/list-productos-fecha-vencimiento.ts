import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from "primeng/card";
import { TagModule } from "primeng/tag";
import { DatePickerModule } from "primeng/datepicker";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { SelectModule } from "primeng/select";
import { ProductoAlmacenRepository } from '@/alcance/domain/repository/producto-almacen.repository';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { ApiError } from '@/core/interceptors/error-message.model';
import { ProductoAlmacenSignal } from '@/alcance/domain/signals/productoAlmacen.signal';
import { CommonModule } from '@angular/common';
import { TableModule } from "primeng/table";
import { ImageModule } from "primeng/image";
@Component({
  selector: 'app-list-productos-fecha-vencimiento',
  imports: [CardModule, TagModule, DatePickerModule, CommonModule, SelectModule, TableModule, ImageModule],
  templateUrl: './list-productos-fecha-vencimiento.html',
  styleUrl: './list-productos-fecha-vencimiento.scss'
})
export class ListProductosFechaVencimiento implements OnInit {
  loading: boolean = false
  private repository = inject(ProductoAlmacenRepository)
  private alert = inject(AlertService)
  private signal = inject(ProductoAlmacenSignal)
  listProductoAlmacenVencimiento = this.signal.listProductoAlmacenVencimiento

  ngOnInit(): void {
    this.obtenerProductosConFechaVencimiento(3)
  }

  obtenerProductosConFechaVencimiento(idAlmacen: number) {
    this.loading = true
    this.repository.obtenerProductosConFechaVencimiento(idAlmacen).subscribe({
      next: (response) => {
        this.listProductoAlmacenVencimiento.set(response.data)
        this.alert.showAlert(`Prodctos con fecha de vencimiento obtenidos correctamente, ${response.message}`, 'success')
        this.loading = false
      },
      error: (err: ApiError) => {
        this.alert.showAlert(`Error al obtener los productos con fecha de vencimiento, ${err.error.message}`, 'error')
        this.loading = false
      }
    })
  }
}
