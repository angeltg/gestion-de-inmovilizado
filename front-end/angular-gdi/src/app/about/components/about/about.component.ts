import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
  
})
export class AboutComponent {

  title= 'Hola! Gracias por visitar mi página';
  subtitle= 'Soy Ángel Téllez';
  description= 'Soy programador fullstack en Nodejs y Angular';
  links =[
    { url: 'https://www.linkedin.com/in/angeltellez/', name:'Linkedin' },
    { url: 'https://github.com/angeltg', name:'Github'}
  ];

  contact ={
    description: 'Si quieres contactar conmigo envíame un email',
    mail: 'angeltellez@yopmail.com'
  };

}
