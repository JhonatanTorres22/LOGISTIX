import { Injectable, signal } from "@angular/core";
import { Producto, ProductoCategoria, TablaProductoCategoria } from "../models/producto.model";
import { ListarMarca } from "@/marca/domain/models/marca.model";

@Injectable({
  providedIn: 'root'
})

export class ProductoSignal {
  productoListDefault: ProductoCategoria[] = []

productoDefault: TablaProductoCategoria = {
  // Producto
  id: 0,
  nombreProducto: '',
  modeloProducto: '',
  descripcionProducto: '',
  unidad: '',
  precioReferencial: 0,
  urlImagen: '',
  marca: {
    idMarca: 0,
    nombreMarca: '',
    descripcionMarca: ''
  },

  // Categoria
  idCategoria: 0,
  nombre: '',
  descripcion: ''
};


  productoSelect = signal(this.productoDefault)
  productoList = signal(this.productoListDefault)
  productoAccion = signal<'CREADO' | 'EDITADO' | 'ELIMINADO' | ''>('')

  cargado = signal(false);

  setProductos(data: ProductoCategoria[]) {
    this.productoList.set(data);
    this.cargado.set(true);
  }

  reset() {
    this.productoList.set([]);
    this.productoSelect.set(this.productoDefault);
    this.productoAccion.set('');
    this.cargado.set(false);
  }
}