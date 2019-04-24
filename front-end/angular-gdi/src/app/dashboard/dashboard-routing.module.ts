import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { WallComponent } from './containers/wall/wall.component';
import { MyAccountComponent } from './containers/my-account/my-account.component';
import { AuthGuard } from '../auth/services/auth.guard';

import { AltaProductsComponent } from './components/alta-products/alta-products.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  canActivate: [AuthGuard],
  children : [
    {
      path: 'wall',
      component: WallComponent
    },
    {
      path: 'alta-bienes',
      component: AltaProductsComponent
    },
    {
      path: 'my-account',
      component: MyAccountComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
