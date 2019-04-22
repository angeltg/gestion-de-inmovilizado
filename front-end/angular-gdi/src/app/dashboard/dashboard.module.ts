import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxsModule } from '@ngxs/store';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardNavComponent } from './components/dashboard-nav/dashboard-nav.component';
import { DashboardNavTabComponent } from './components/dashboard-nav-tab/dashboard-nav-tab.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardFooterComponent } from './components/dashboard-footer/dashboard-footer.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { WallComponent } from './containers/wall/wall.component';
import { MyAccountComponent } from './containers/my-account/my-account.component';
import { ProductState } from './store/products.state';
import { EmployeeState } from './store/employees.state';
import { PublisherComponent } from './components/publisher/publisher.component';
import { ProductComponent } from './components/product/product.component';
import { EmployeeComponent } from './components/employee/employee.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardFooterComponent,
    DashboardHeaderComponent,
    DashboardNavComponent,
    DashboardNavTabComponent,
    WallComponent,
    MyAccountComponent,
    PublisherComponent,
    ProductComponent,
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    NgxsModule.forFeature([ProductState, EmployeeState])
  ]
})
export class DashboardModule { }
