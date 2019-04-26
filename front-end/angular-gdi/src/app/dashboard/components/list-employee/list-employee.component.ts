import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GetEmployees } from '../../store/employee.action';
import { EmployeeState } from '../../store/employees.state';
import { Employee } from '../../dashboard.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styles: []
})

export class ListEmployeeComponent implements OnInit {

  @Select(EmployeeState.getEmployee) employees$: Observable<Employee[]>;
  
  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetEmployees());
   // this.employees$.subscribe(employees => console.log('EMPLOYEES!', employees ));
    
  }

}
