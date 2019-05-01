import { Component } from '@angular/core';
import { Logout } from 'src/app/auth/store/auth.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: []
})
export class DashboardNavComponent {

  constructor(private store: Store) {}
  logoutUser() {
    this.store.dispatch(new Logout());
  }

}
