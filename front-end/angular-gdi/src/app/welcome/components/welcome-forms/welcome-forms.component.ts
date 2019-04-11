import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-forms',
  templateUrl: './welcome-forms.component.html',
  styles: []
})
export class WelcomeFormsComponent {

  isRegisterFormVisible= true;

toggleForm(){
  this.isRegisterFormVisible = !this.isRegisterFormVisible;
}

}
