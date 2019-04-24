import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: []
})
export class DashboardNavComponent {

  logoutUser(){
    console.log('Logout');
  }

}
