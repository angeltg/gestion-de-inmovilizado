import { Component, OnInit, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Employee } from '../../dashboard.models';
import { GetEmployees } from '../../store/employee.action';
import { EmployeeState } from '../../store/employees.state';
import { Observable } from 'rxjs';
import { AddAssignment } from '../../store/assignment.action';


@Component({
  selector: '[app-product]',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit {


  @Select(EmployeeState.getEmployee) employees$: Observable<Employee[]>;

  @Input() product;
  @Input() index;
  

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetEmployees());
   // this.employees$.subscribe(employees => console.log('EMPLOYEES!', employees ));
  }

  onChange(idEmployee, idProduct) {
    console.log( idEmployee,idProduct);
    //Enviar los datos a la API
    this.store.dispatch(new AddAssignment({ idEmployee, idProduct }));
  }
}
