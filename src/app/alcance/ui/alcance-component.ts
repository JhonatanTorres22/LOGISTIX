import { Component, computed, signal } from '@angular/core';
import { ListAlcance } from "./list-alcance/list-alcance";
import { Card } from "@/core/components/card/card";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { ListAlmacen } from "./list-almacen/list-almacen";
import { ListProductoAlmacen } from "./list-producto-almacen/list-producto-almacen";
import { DividerModule } from "primeng/divider";

@Component({
  selector: 'app-alcance',
  imports: [ListAlcance, BreadcrumbModule, Card, ListAlmacen, ListProductoAlmacen, DividerModule],
  templateUrl: './alcance-component.html',
  styleUrl: './alcance-component.scss'
})
export class AlcanceComponent {

  vistaActual = signal<'alcances' | 'almacenes' | 'productos'>('alcances')

  breadcrumbItems = computed(() => {
    const vista = this.vistaActual();

    if (vista === 'alcances') {
      return [
        {
          label: 'Alcances',
          icon: 'pi pi-map-marker'
        }
      ];
    }

    if (vista === 'almacenes') {
      return [
        {
          label: 'Alcances',
          icon: 'pi pi-map-marker',
          command: () => this.irAlcances()
        },
        {
          label: 'Almacenes',
          icon: 'pi pi-home'
        }
      ];
    }

    return [
      {
        label: 'Alcances',
        icon: 'pi pi-map-marker',
        command: () => this.irAlcances()
      },
      {
        label: 'Almacenes',
        icon: 'pi pi-home',
        command: () => this.irAlmacenes()
      },
      {
        label: 'Productos',
        icon: 'pi pi-box'
      }
    ];
  });


  irAlcances() {
    this.vistaActual.set('alcances');
  }

  irAlmacenes() {
    this.vistaActual.set('almacenes');
  }

  irProductos() {
    this.vistaActual.set('productos');
  }
}
