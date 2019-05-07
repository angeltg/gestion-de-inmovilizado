import { Component, OnInit } from '@angular/core';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Store, Actions, ofAction } from '@ngxs/store';


import { MailValidator } from '../../../auth/validators/mail.validators';
import { PasswordValidator } from '../../../auth/validators/password.validators';
import { AddEmployee, AddEmployeeSuccess } from '../../store/employee.action';
import { ResetErrors } from '../../../error/store/error.actions';

@Component({
  selector: 'register-alta-employees',
  templateUrl: './register-employees.component.html',
  styles: []
})
export class RegisterEmployeesComponent implements OnInit {

  rolles: string[] = ['Employee', 'Technical','Accountant', 'Purchasing', 'Manager'];
  default: string = 'Employee';

  employeeForm = this.fb.group({
    firstName: ['',[Validators.required]],
    secondName: ['', [Validators.required]],
    email: ['', [Validators.required, MailValidator]],
    password: ['', [Validators.required, PasswordValidator]],
    phone: ['', [Validators.required]],
    roll:[this.default,[Validators.required]]
  });


constructor( 
  private fb: FormBuilder, 
  private store: Store,
  private actions$: Actions
  ) { }

ngOnInit() {
  this.actions$
    .pipe(ofAction(AddEmployeeSuccess))
    .subscribe(() => {
      this.employeeForm.reset()
      //Remove with css the form
      let elemt = document.getElementById('register-form');
      elemt.style.display = 'none';
      let elemtWelcome = document.getElementById('register-form-message');
      elemtWelcome.style.display = 'block';
    });   
}
pushEmployee(){
  
  if (!this.employeeForm.valid){
    this.markFormGroupAsTouched(this.employeeForm);
    return;
  }
  this.store.dispatch(new ResetErrors());
  this.store.dispatch(new AddEmployee(this.employeeForm.value));
}
markFormGroupAsTouched(FormGroup: FormGroup){
 
  Object.values(FormGroup.controls).forEach(control =>
    control.markAsTouched()
    );
}
}