import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-form-control',
  template: `
    <div [class.has-error]="control.errors && (control.dirty || control.touched)" >
      <ng-content></ng-content>

      <ng-container
        *ngIf="control.invalid && (control.dirty || control.touched)"
      >
        <p class="form-text text-muted alert" *ngIf="control.hasError('required')">
           Este campo es obligatorio
        </p>
        <p class="form-text text-muted alert" *ngIf="control.hasError('malformedMail')">
           El email no es correcto
        </p>
        <p class="form-text text-muted alert" *ngIf="control.hasError('malformedPassword')">
           La password debe contener más 3 caractéres, mayúsculas, minúsculas y numeros.
        </p>
     
        </ng-container>
    </div>
  `
})
export class FormControlComponent {
  @Input() control: FormControl;
  errorIcon: IconProp = faExclamationTriangle;
}
