import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-forms',
  templateUrl: './welcome-forms.component.html',
  styles: []
})
export class WelcomeFormsComponent {

  isRegisterFormVisible= true;

 toggleForm(isRegisterClick: boolean){

    if(
      (isRegisterClick && this.isRegisterFormVisible) ||
      (isRegisterClick && !this.isRegisterFormVisible)
    ){
      return;
    }
  this.isRegisterFormVisible = !this.isRegisterFormVisible;
}

}
