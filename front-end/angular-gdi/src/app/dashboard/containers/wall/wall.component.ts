import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GetProducts } from '../../store/product.action';
import { ProductState } from '../../store/products.state';
import { ProductResponse, EmployeeResponse } from '../../dashboard.models';
import { GetEmployees } from '../../store/employee.action';
import { EmployeeState } from '../../store/employees.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styles: []
})
export class WallComponent {

  @Select(ProductState.getProduct) products$: Observable<ProductResponse[]>;
  @Select(EmployeeState.getEmployee) employees$: Observable<EmployeeResponse[]>;
  
  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetProducts());
    this.store.dispatch(new GetEmployees());
    this.products$.subscribe(products => console.log('PRODUCTS!', products ));
    this.employees$.subscribe(employees => console.log('EMPLOYEES!', employees ));
    
  }

}
