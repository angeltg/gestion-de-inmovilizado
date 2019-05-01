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
        *ngIf="control.invalid && (control.dirty || control.touched)">
        <h6 class="alert alert-danger" *ngIf="control.hasError('required')">
           Este campo es obligatorio
        </h6>
        <h6 class="alert alert-danger" *ngIf="control.hasError('malformedMail')">
           El email no es correcto
        </h6>
        <h6 class="alert alert-danger" *ngIf="control.hasError('malformedPassword')">
           Debe contener más 3 caractéres, mayúsculas, minúsculas y numeros
        </h6>
        </ng-container>
    </div>
  `
})
export class FormControlComponent {
  @Input() control: FormControl;
  errorIcon: IconProp = faExclamationTriangle;
}
