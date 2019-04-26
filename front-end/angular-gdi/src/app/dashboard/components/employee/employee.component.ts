import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';


@Component({
  selector: '[app-employee]',
  templateUrl: './employee.component.html',
  styles: []
})
export class EmployeeComponent implements OnInit {

  
  @Input() employee;
  @Input() index;
  
  
  constructor(private store: Store) { }

  ngOnInit() {
  }

  
}
