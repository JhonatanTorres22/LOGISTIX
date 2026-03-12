import { Injectable, signal } from "@angular/core";
import { Categoria } from "../models/categoria.model";

@Injectable({
    providedIn: 'root'
})

export class CategoriaSignal {

    categoriaDefault : Categoria = {
        idCategoria: 0,
        nombre: "",
        descripcion: ""
    }   
    categoriaSelect = signal(this.categoriaDefault)
    categoriaList = signal<Categoria[]>([]);
    categoriaAccion = signal('')

     cargado = signal(false);

  setCategorias(data: Categoria[]) {
    this.categoriaList.set(data);
    this.cargado.set(true);
  }

  reset() {
    this.categoriaList.set([]);
    this.cargado.set(false);
    this.categoriaSelect.set(this.categoriaDefault);
    this.categoriaAccion.set('');
  }
  
}