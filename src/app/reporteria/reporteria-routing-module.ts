import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'productos-no-validos',
    loadComponent: () => import('./ui/list-productos-no-validos/list-productos-no-validos').then((c) => c.ListProductosNoValidos)
  },
  {
    path: 'pagos-realizados',
    loadComponent: () => import('./ui/list-pago-realizado/list-pago-realizado').then((c) => c.ListPagoRealizado)
  },
    {
    path: 'productos-fecha-vencimiento',
    loadComponent: () => import('./ui/list-productos-fecha-vencimiento/list-productos-fecha-vencimiento').then((c) => c.ListProductosFechaVencimiento)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteriaRoutingModule { }