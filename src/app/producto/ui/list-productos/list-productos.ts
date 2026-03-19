import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ImportProductos } from "../import-productos/import-productos";
import { ProductoSignal } from '@/producto/domain/signals/producto.signal';
import { AddEditProducto } from "../add-edit-producto/add-edit-producto";
import { AlertService } from 'src/assets/demo/services/alert.service';
import { ProductoRepository } from '@/producto/domain/repository/producto.repository';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { EliminarProducto, ProductoCategoria,TablaProductoCategoria } from '@/producto/domain/models/producto.model';
import { finalize } from 'rxjs';
import { ProductoModule } from '@/producto/producto-module';
import { ProcesoComprasModule } from "@/proceso-compras/proceso-compras-module";
import { ApiError } from '@/core/interceptors/error-message.model';
import { Route, Router } from '@angular/router';
import { UiIconButton } from "@/core/components/ui-icon-button/ui-icon-button";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";

@Component({
  selector: 'app-list-productos',
  imports: [ProductoModule, ImportProductos, AddEditProducto, UiLoadingProgressBarComponent, ProcesoComprasModule, UiIconButton, IconFieldModule, InputIconModule],
  templateUrl: './list-productos.html',
  styleUrl: './list-productos.scss'
})
export class ListProductos implements OnInit, OnDestroy {

  signal = inject(ProductoSignal);
  listProducto = this.signal.productoList;
  productoAccion = this.signal.productoAccion;

  tablaCategoria = signal<TablaProductoCategoria[]>([]);
  selectProducto = this.signal.productoSelect;
  selectProductoDefault = this.signal.productoDefault

  repositoryProducto = inject(ProductoRepository);

  visibleAdd = false;
  loading = false;
  expandedCategorias: { [key: number]: boolean } = {};

  constructor(
    private alert: AlertService,
    private router: Router
  ) {
    effect(() => {
      const accion = this.productoAccion();
      if (!accion) return;

      switch (accion) {
        case 'CREADO':
        case 'EDITADO':
        case 'ELIMINADO':
          break;
      }
      this.obtenerProductoXCategoria()
      this.productoAccion.set('');
    });
  }


  ngOnInit(): void {
    this.obtenerProductoXCategoria()
  }

  obtenerProductoXCategoria = () => {
    this.loading = true
    this.repositoryProducto.obtener().pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.listProducto.set(data.data)
          this.alert.showAlert(`Listando, ${data.message}`, 'success')
          this.construirTablaCategorias(data.data);
        },
        error: (err) => {
          console.log(err);
          
          this.alert.showAlert(`Error, ${err.error.Message}`)
        }
      })
  }


  construirTablaCategorias(data: ProductoCategoria[]): void {
  const filas: TablaProductoCategoria[] = [];
  data.forEach(categoria => {

    if (categoria.productos.length) {
      categoria.productos.forEach(producto => {
        filas.push({
          idCategoria: categoria.idCategoria,
          nombre: categoria.nombre,
          descripcion: categoria.descripcion,
          id: producto.id,
          nombreProducto: producto.nombreProducto,
          modeloProducto: producto.modeloProducto,
          descripcionProducto: producto.descripcionProducto,
          tipo: producto.tipo,
          unidad: producto.unidad,
          precioReferencial: producto.precioReferencial,
          urlImagen: producto.urlImagen,
          marca: producto.marca
        });
      });
    }

    else {
      filas.push({
        idCategoria: categoria.idCategoria,
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
        id: 0,
        nombreProducto: '',
        modeloProducto: '',
        descripcionProducto: '',
        tipo: '',
        unidad: '',
        precioReferencial: 0,
        urlImagen: '',
        marca: null
      });
    }
  });

  this.tablaCategoria.set(filas);
}



seleccionarProducto(producto: TablaProductoCategoria): void {
  
  // if (!producto.nombreProducto) return;
  console.log(producto.nombreProducto);

  this.selectProducto.set(producto);
  this.visibleAdd = true
  this.expandedCategorias[producto.idCategoria] = true;
}

crearProducto(row: TablaProductoCategoria): void {

  const nuevo = {
    ...this.selectProductoDefault,
    idCategoria: row.idCategoria,
    nombre: row.nombre,
    descripcion: row.descripcion
  };

  this.selectProducto.set(nuevo);
  this.visibleAdd = true;
  this.expandedCategorias[row.idCategoria] = true;
}


confirmEliminar(producto: TablaProductoCategoria): void {
  if (!producto.id) return;

  this.alert
    .sweetAlert('question', '¿Confirmar?', '¿Eliminar producto?')
    .then(ok => {
      if (!ok) return;
      let eliminar : EliminarProducto = {
        id : producto.id
      }
      this.eliminar(eliminar);
    });
}


  eliminar(eliminar: EliminarProducto): void {
    this.loading = true;

    this.repositoryProducto.eliminar(eliminar)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => {
          this.alert.showAlert(`Producto eliminado, ${res.message}`, 'success');
          this.productoAccion.set('ELIMINADO');
        },
        error: (err: ApiError) => { this.alert.showAlert(`Error al eliminar, ${err.message}`, 'error') }
      });
  }

expandirCategoria(event: any) {
  console.log(event.data);
  
  const row = event.data;
  this.expandedCategorias[row.idCategoria] = true;
  this.selectProducto.set(event.data)
}

collapsarCategoria(event: any) {
  const row = event.data;
  delete this.expandedCategorias[row.idCategoria]  
}

  irACategoria(): void {
    this.router.navigate(['/categoria']);
  }
  ngOnDestroy(): void {
    this.expandedCategorias = {}
    this.productoAccion.set('')
  }
}
