import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardNavComponent } from './components/dashboard-nav/dashboard-nav.component';
import { DashboardNavTabComponent } from './components/dashboard-nav-tab/dashboard-nav-tab.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardFooterComponent } from './components/dashboard-footer/dashboard-footer.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { WallComponent } from './containers/wall/wall.component';
import { MyAccountComponent } from './containers/my-account/my-account.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardFooterComponent,
    DashboardHeaderComponent,
    DashboardNavComponent,
    DashboardNavTabComponent,
    WallComponent,
    MyAccountComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule
  ]
})
export class DashboardModule { }
