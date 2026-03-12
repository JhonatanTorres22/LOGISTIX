import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Dialog } from "primeng/dialog";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { ProductoRepository } from '@/producto/domain/repository/producto.repository';
import { ListProductos } from '@/producto/ui/list-productos/list-productos';
import { DataProducto, Producto, ProductoCategoria } from '@/producto/domain/models/producto.model';
import { ApiError } from '@/core/interceptors/error-message.model';
import { CommonModule } from '@angular/common';
import { ProductoSignal } from '@/producto/domain/signals/producto.signal';
import { PickList, PickListModule } from "primeng/picklist";

@Component({
  selector: 'app-add-producto-almacen',
  imports: [Dialog, UiButtonComponent, CommonModule, PickListModule],
  templateUrl: './add-producto-almacen.html',
  styleUrl: './add-producto-almacen.scss'
})
export class AddProductoAlmacen implements OnInit {
  @Input() visible: boolean = false
  @Output() visibleChange = new EventEmitter<boolean>()

  private repositoryProducto = inject(ProductoRepository)
  private productoSignal = inject(ProductoSignal)
  listProducto = this.productoSignal.productoList

  loading: boolean = false
  productosDisponibles: Producto[] = [];
productosAsignados: Producto[] = [];

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  ngOnInit(): void {
    this.obtenerProducto()
  }
  obtenerProducto = () => {
    this.loading = true
    this.repositoryProducto.obtener().subscribe({
      next : (data : DataProducto) => {
        this.listProducto.set(data.data)

          const productos: Producto[] = data.data.flatMap(
        (categoria: ProductoCategoria) => categoria.productos
      )

       this.productosAsignados = [];

      this.productosDisponibles = productos;
        this.loading = false
      },
      error : (err : ApiError) => {
        this.loading = false
      }
    })
  }
}
