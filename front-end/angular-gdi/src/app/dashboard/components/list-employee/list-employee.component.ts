import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { GetEmployees } from '../../store/employee.action';
import { EmployeeState } from '../../store/employees.state';
import { Employee } from '../../dashboard.models';
import { AuthState } from '../../../auth/store/auth.state';
import { Auth } from '../../../auth/auth.models';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styles: []
})

export class ListEmployeeComponent implements OnInit {

  @Select(EmployeeState.getEmployee) employees$: Observable<Employee[]>;

  
  @Select(AuthState) currentUser$: Observable<Auth>;
  
  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetEmployees());

   // this.employees$.subscribe(employees => console.log('EMPLOYEES!', employees ));
    
  }

}
