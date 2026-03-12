import { ListarMarca } from "@/marca/domain/models/marca.model";

export interface ProveedorProductoView {
  idProveedor: number;
  nombre: string;
  ruc: string;
  tipo: string;

  productos: ProductoView[];
  productosDisponibles?: ProductoView[];

  modoAgregar: boolean;
  puedeAgregar: boolean;
  puedeEditar?: boolean;
}
export interface ProductoView {
  id: number;
  idProveedorProducto?: number;

  nombre: string;
  modelo: string;
  descripcion: string;
  unidad: string;
  urlImagen: string;
  vigencia?: string
  marca: ListarMarca | null;

  precio: number;
  precioOriginal?: number;

  selected?: boolean;
  editado?: boolean;
  precioModificado?: boolean;
}

