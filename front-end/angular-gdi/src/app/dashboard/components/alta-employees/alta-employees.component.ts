import { Component, OnInit } from '@angular/core';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Store, Actions, ofAction } from '@ngxs/store';


import { MailValidator } from '../../../auth/validators/mail.validators';
import { AddEmployee, AddEmployeeSuccess } from '../../store/employee.action';

@Component({
  selector: 'app-alta-employees',
  templateUrl: './alta-employees.component.html',
  styles: []
})
export class AltaEmployeesComponent implements OnInit {

  rolles: string[] = ['Employee', 'Technical','Accountant', 'Purchasing', 'Manager'];
  default: string = 'Employee';

  employeeForm = this.fb.group({
    firstName: ['',[Validators.required]],
    secondName: ['', [Validators.required]],
    email: ['', [Validators.required, MailValidator]],
    password: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    roll:[this.default,[Validators.required]]
  });


constructor( 
  private fb: FormBuilder, 
  private sotre: Store,
  private actions$: Actions
  ) { }

ngOnInit() {
  this.actions$
    .pipe(ofAction(AddEmployeeSuccess))
    .subscribe(() => this.employeeForm.reset());
}
pushEmployee(){
  if (!this.employeeForm.valid){
    this.markFormGroupAsTouched(this.employeeForm);
    return;
  }
  this.sotre.dispatch(new AddEmployee(this.employeeForm.value));
}
markFormGroupAsTouched(FormGroup: FormGroup){
  Object.values(FormGroup.controls).forEach(control =>
    control.markAsTouched()
    );
}
}