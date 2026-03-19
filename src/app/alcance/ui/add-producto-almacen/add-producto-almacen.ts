import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Dialog } from "primeng/dialog";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { ProductoRepository } from '@/producto/domain/repository/producto.repository';
import { ListProductos } from '@/producto/ui/list-productos/list-productos';
import { DataProducto, Producto, ProductoCategoria } from '@/producto/domain/models/producto.model';
import { ApiError, ApiResponse } from '@/core/interceptors/error-message.model';
import { CommonModule } from '@angular/common';
import { ProductoSignal } from '@/producto/domain/signals/producto.signal';
import { PickList, PickListModule } from "primeng/picklist";
import { InputNumberModule } from "primeng/inputnumber";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgregarProductoAlmacen } from '@/alcance/domain/models/producto-almacen.model';
import { ProductoAlmacenRepository } from '@/alcance/domain/repository/producto-almacen.repository';
import { AlertService } from 'src/assets/demo/services/alert.service';

@Component({
  selector: 'app-add-producto-almacen',
  imports: [Dialog, UiButtonComponent, CommonModule, PickListModule, InputNumberModule, ReactiveFormsModule, FormsModule],
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

  cantidades: { [idProducto: number]: number } = {}

  sourceSelection: Producto[] = []
  targetSelection: Producto[] = []

  private repositoryProductoAlmacen = inject(ProductoAlmacenRepository)
  private alert = inject(AlertService)

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
      next: (data: DataProducto) => {
        this.listProducto.set(data.data)

        const productos: Producto[] = data.data.flatMap(
          (categoria: ProductoCategoria) => categoria.productos
        )

        this.productosAsignados = [];

        this.productosDisponibles = productos.map(p => ({
          ...p,
          asignadoAlmacen: false
        }))
        this.loading = false
      },
      error: (err: ApiError) => {
        this.loading = false
      }
    })
  }

  private sincronizarAsignados() {

    const idsTarget = new Set(
      this.productosAsignados.map(p => p.id)
    )

    this.productosDisponibles.forEach(p => {
      p.asignadoAlmacen = false
    })

    this.productosAsignados.forEach(p => {
      p.asignadoAlmacen = true
    })

  }
  alPasarTodos(event: any) {

    this.productosDisponibles = [
      ...this.productosDisponibles,
      ...this.productosAsignados
    ]
    this.productosAsignados = []
    this.productosDisponibles.forEach(p => p.asignadoAlmacen = false)
    this.productosDisponibles = [...this.productosDisponibles]

  }
  alPasarUno(event: { items: Producto[] }) {
    if (event.items.length > 1) {

      this.productosAsignados =
        this.productosAsignados.filter(
          p => !event.items.some(e => e.id === p.id)
        )

      this.productosDisponibles = [
        ...this.productosDisponibles,
        ...event.items
      ]
      return
    }

    if (this.productosAsignados.length > 1) {

      const item = event.items[0]

      this.productosAsignados =
        this.productosAsignados.filter(p => p.id !== item.id)

      this.productosDisponibles = [
        ...this.productosDisponibles,
        item
      ]

      return
    }

    const p = event.items[0]
    p.asignadoAlmacen = true
    this.cantidades[p.id] ??= 1

    this.productosAsignados = [...this.productosAsignados]
    this.productosDisponibles = [...this.productosDisponibles]


  }


  alRegresarUno(event: { items: Producto[] }) {

    this.productosAsignados =
      this.productosAsignados.filter(
        p => !event.items.some(e => e.id === p.id)
      )

    this.sincronizarAsignados()

    this.productosAsignados = [...this.productosAsignados]
    this.productosDisponibles = [...this.productosDisponibles]
  }

  alRegresarTodos(event: any) {
    this.productosDisponibles.forEach(p => p.asignadoAlmacen = false)
    this.productosAsignados.forEach(p => p.asignadoAlmacen = true)

    this.productosDisponibles = [...this.productosDisponibles]
    this.productosAsignados = [...this.productosAsignados]

  }
  cambiarCantidad(idProducto: number, valor: number) {
    this.cantidades[idProducto] = valor
  }

  agregarProductoAlmacen() {
    this.loading = true
    if (this.productosAsignados.length === 0) { this.loading = false; return }

    const producto = this.productosAsignados[0]

    const agregarProductoAlmacen: AgregarProductoAlmacen = {
      idProducto: producto.id,
      idAlmacen: 3,
      cantidad: this.cantidades[producto.id] ?? 1
    }
    console.log(agregarProductoAlmacen)

    this.repositoryProductoAlmacen.agregarProductoAlmacen(agregarProductoAlmacen).subscribe({
      next : (res : ApiResponse) => {
        this.loading = false
        this.alert.showAlert(`Agregado correctamente, ${res.message}`, 'success')
      },
      error : (err : ApiError) => {
        console.log(err);
        
        this.loading = false
        this.alert.showAlert(`Error, ${err.error.message}`, 'error')
      }
    })
  }

}
