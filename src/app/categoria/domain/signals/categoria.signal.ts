import { Injectable, signal } from "@angular/core";
import { Categoria } from "../models/categoria.model";

@Injectable({
    providedIn: 'root'
})

export class CategoriaSignal {
    categoriaListDefault : Categoria[] = []
    categoriaDefault : Categoria = {
        id: 0,
        nombre: "",
        descripcion: ""
    }   
    categoriaSelect = signal(this.categoriaDefault)
    categoriaList = signal(this.categoriaListDefault)
    categoriaAccion = signal('')
}