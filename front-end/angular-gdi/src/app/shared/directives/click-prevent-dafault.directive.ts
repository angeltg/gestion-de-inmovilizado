import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appPreventDafault]'
})

export class ClickPreventDefaultDirective {

  @HostListener('click', ['$event'])
  onclick(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
}
