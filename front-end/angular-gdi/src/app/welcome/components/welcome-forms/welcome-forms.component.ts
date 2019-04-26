import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-forms',
  templateUrl: './welcome-forms.component.html',
  styles: []
})
export class WelcomeFormsComponent {

  isRegisterFormVisible = true;
  registerClass='active'; 
  loginClass='';

  toggleForm(isRegisterClick: boolean) {
    if (
      (isRegisterClick && this.isRegisterFormVisible) ||
      (!isRegisterClick && !this.isRegisterFormVisible)
    ) { 
      return;
    }
    if (this.registerClass !='') {
      this.loginClass='active';
      this.registerClass='';
    }
    else {
      this.registerClass='active';
      this.loginClass='';
    }; 
    
   
    
    this.isRegisterFormVisible = !this.isRegisterFormVisible;
  }

}
