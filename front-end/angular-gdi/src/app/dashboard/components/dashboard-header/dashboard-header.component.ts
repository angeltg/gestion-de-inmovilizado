import { Component } from '@angular/core';
import { faHandSpock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styles: []
})
export class DashboardHeaderComponent{

  logo = faHandSpock;

}
