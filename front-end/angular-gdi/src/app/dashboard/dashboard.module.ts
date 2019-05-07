import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxsModule } from '@ngxs/store';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardNavComponent } from './components/dashboard-nav/dashboard-nav.component';
import { DashboardNavTabComponent } from './components/dashboard-nav-tab/dashboard-nav-tab.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardFooterComponent } from './components/dashboard-footer/dashboard-footer.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { WallComponent } from './containers/wall/wall.component';
import { ProductState } from './store/products.state';
import { EmployeeState } from './store/employees.state';
import { AssignmentState } from './store/assignment.state';
import { PublisherComponent } from './components/publisher/publisher.component';
import { ProductComponent } from './components/product/product.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ProductFriendlyDatePipe } from '../shared/pipes/product-friendly-date.pipe';
import { RegisterProductsComponent } from './components/register-products/register-products.component';
import { RegisterEmployeesComponent } from './components/register-employees/register-employees.component';
import { ListEmployeeComponent } from './components/list-employee/list-employee.component';
import { MatDatepickerModule } from '@angular/material';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { SharedModule } from '../shared/shared.module';
import { GraficEmployeesComponent } from './components/grafic-employees/grafic-employees.component';
import { ChartsModule } from 'ng2-charts';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { GraficProductsComponent } from './components/grafic-products/grafic-products.component';
import { ErrorModule } from '../error/error.module';



@NgModule({
  declarations: [
    DashboardComponent,
    DashboardFooterComponent,
    DashboardHeaderComponent,
    DashboardNavComponent,
    DashboardNavTabComponent,
    WallComponent,
    PublisherComponent,
    ProductComponent,
    EmployeeComponent,
    ProductFriendlyDatePipe,
    RegisterProductsComponent,
    RegisterEmployeesComponent,
    ListEmployeeComponent,
    GraficEmployeesComponent,
    GraficProductsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([ProductState, EmployeeState, AssignmentState]),
    MatDatepickerModule,
    MomentDateModule,
    SharedModule,
    ChartsModule,
    ErrorModule,
    MatCheckboxModule
  ],
  exports:[
    ProductFriendlyDatePipe
  ]
})
export class DashboardModule { }
