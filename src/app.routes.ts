import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { AuthGuardChild } from '@/core/helpers/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppLayout,
    canActivateChild: [AuthGuardChild],
    children: [
      { path: '', component: Dashboard },
      {
        path: 'proveedor',
        loadChildren: () => import('./app/proveedor/proveedor-module').then(m => m.ProveedorModule)
      },
      {
        path: 'producto',
        loadChildren: () => import('./app/producto/producto-module').then(m => m.ProductoModule)
      },
      {
        path: 'categoria',
        loadChildren: () => import('./app/categoria/categoria-module').then(m => m.CategoriaModule)
      },
      {
        path: 'producto-proveedor',
        loadChildren: () => import('./app/proveedor-producto/proveedor-producto-module').then(m => m.ProveedorProductoModule)
      },
      {
        path: 'configuracion',
        loadChildren: () => import('./app/configuracion/configuracion-module').then(m => m.ConfiguracionModule)
      },
      {
        path: 'solicitud-compra',
        loadChildren: () => import('./app/proceso-compras/proceso-compras-module').then(m => m.ProcesoComprasModule)
      },
      {
        path: 'alcance',
        loadChildren: () => import('./app/alcance/alcance-module').then(m => m.AlcanceModule)
      },
      {
        path: 'marca',
        loadChildren: () => import('./app/marca/marca-module').then(m => m.MarcaModule)
      },
      {
        path: 'unidad-medida',
        loadChildren: () => import('./app/unidad-medida/unidad-medida-module').then(m => m.UnidadMedidaModule)
      },
      {
        path: 'reporteria',
        loadChildren: () => import('./app/reporteria/reporteria-module').then(m => m.ReporteriaModule)
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadChildren: () => import('./app/auth/auth-module').then((m) => m.AuthModule)
      },
    ]
  },

  { path: '**', redirectTo: '/notfound' }
];
