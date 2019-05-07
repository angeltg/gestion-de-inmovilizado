import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Store, Actions, ofAction } from '@ngxs/store';

import { AuthService } from '../../../auth/services/auth.service';
import { MailValidator } from '../../validators/mail.validators';
import { Register, RegisterSuccess } from '../../store/auth.actions';
import { PasswordValidator } from '../../validators/password.validators';
import { ResetErrors } from '../../../error/store/error.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
    registerForm = this.fb.group({
      fullName: ['',[Validators.required]],
      email: ['', [Validators.required, MailValidator]],
      password: ['', [Validators.required, PasswordValidator]],
      company: ['', [Validators.required]]
    });

  constructor( 
    private fb: FormBuilder, 
    private store: Store,
    private actions$: Actions
    ) { }


  ngOnInit() {
    this.actions$
      .pipe(ofAction(RegisterSuccess))
      .subscribe(() => {
        this.registerForm.reset();
        //Remove with css the form
        let elemt = document.getElementById('register-form');
        elemt.style.display = 'none';
        let elemtWelcome = document.getElementById('register-form-message');
        elemtWelcome.style.display = 'block';
      });
  }
  register(){
    if (!this.registerForm.valid){
      this.markFormGroupAsTouched(this.registerForm);
      return;
    }
    this.store.dispatch(new ResetErrors());
    this.store.dispatch(new Register(this.registerForm.value));
  }
  markFormGroupAsTouched(FormGroup: FormGroup){
    Object.values(FormGroup.controls).forEach(control =>
      control.markAsTouched()
      );
  }
}