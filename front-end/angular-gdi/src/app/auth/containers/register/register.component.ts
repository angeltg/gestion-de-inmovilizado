import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { MailValidator } from '../../validators/mail.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
    registerForm = this.fb.group({
      fullName: ['',[Validators.required]],
      email: ['', [Validators.required, MailValidator]],
      password: ['', [Validators.required]],
      company: ['', [Validators.required]]
    });

  constructor( private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
  }
  register(){
    if (this.registerForm.valid){
      this.authService
      .register(this.registerForm.value)
      .subscribe(data => console.log(data), error => console.log(error));
    }
  }

}
