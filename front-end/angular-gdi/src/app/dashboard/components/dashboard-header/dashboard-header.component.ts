import { Component } from '@angular/core';
import { AuthState } from '../../../auth/store/auth.state';
import { Observable } from 'rxjs';
import { Auth } from '../../../auth/auth.models';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styles: []
})
export class DashboardHeaderComponent{

  @Select(AuthState) currentUser$: Observable<Auth>;
  


}
