import { ProductoCategoria } from "@/producto/domain/models/producto.model";
import { Proveedor } from "@/proveedor/domain/models/proveedor.model";
import { ProveedorProductoView, ProductoView } from "../models/proveedor-producto-view.model";
import { ProveedorProducto } from "../models/proveedor-producto.model";

export function mapProveedorToView(
  proveedores: Proveedor[],
  proveedorProductos: ProveedorProducto[]
): ProveedorProductoView[] {

  return proveedores.map(prov => {

    const asociados = proveedorProductos.filter(
      pp => pp.proveedor?.ruc?.trim() === prov.ruc?.trim()
    );

    const productos: ProductoView[] = asociados.map(pp => ({
      id: pp.producto?.codigo ?? 0,
      idProveedorProducto: pp.idProveedorProducto,
      nombre: pp.producto?.nombre ?? '',
      modelo: pp.producto?.modelo ?? '',
      descripcion: pp.producto?.descripcion ?? '',
      unidad: pp.producto?.unidadDeMedida ?? '',
      urlImagen: pp.producto?.url ?? '',
      marca: pp.producto?.marca ?? null,
      precio: pp.precio ?? 0,
      precioOriginal: pp.precio ?? 0,
      vigencia: pp.vigencia ?? '',
      selected: false,
      editado: false
    }));

    return {
      idProveedor: prov.id,
      nombre: prov.nombre,
      ruc: prov.ruc,
      tipo: prov.tipo,
      productos,
      productosDisponibles: [],
      modoAgregar: false,
      puedeAgregar: false
    };

  });

}