import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { WallComponent } from './containers/wall/wall.component';
import { MyAccountComponent } from './containers/my-account/my-account.component';
import { AuthGuard } from '../auth/services/auth.guard';

import { RegisterProductsComponent } from './components/register-products/register-products.component';
import { RegisterEmployeesComponent } from './components/register-employees/register-employees.component';
import { ListEmployeeComponent } from './components/list-employee/list-employee.component';
import { GraficEmployeesComponent } from './components/grafic-employees/grafic-employees.component';
import { GraficProductsComponent } from './components/grafic-products/grafic-products.component';


const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  canActivate: [AuthGuard],
  children : [
    {
      path: 'wall',
      component: WallComponent // Muestra el listado de los productos
    },
    {
      path: 'alta-bienes',
      component: RegisterProductsComponent
    },
    {
      path: 'alta-empleados',
      component: RegisterEmployeesComponent
    },
    {
      path: 'listar-empleados',
      component: ListEmployeeComponent
    },
    {
      path: 'graficas-bienes',
      component: GraficProductsComponent
    },
    {
      path: 'graficas-empleados',
      component: GraficEmployeesComponent
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
