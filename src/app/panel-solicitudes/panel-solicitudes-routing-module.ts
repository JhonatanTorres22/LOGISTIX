import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadComponent :() => import('./ui/panel-solicitudes-component').then((c) => c.PanelSolicitudesComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelSolicitudesRoutingModule { }
