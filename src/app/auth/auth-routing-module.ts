import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Logout } from './ui/logout/logout';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./ui/auth-component').then((c) => c.AuthComponent)
  },
  {
    path: 'logout',
    loadComponent: () => import('./ui/logout/logout').then((c) => Logout)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
