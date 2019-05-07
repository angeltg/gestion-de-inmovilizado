import { Component, OnDestroy } from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Select, Store } from '@ngxs/store';
import { ErrorState } from '../store/error.state';
import { Observable } from 'rxjs';
import { Error } from 'src/app/error/error.models';
import { ResetErrors } from '../store/error.actions';

@Component({
  selector: 'app-errors',
  template: `
    <div class="errors row alert alert-danger" *ngIf="(errors$ | async)?.length">
      <p *ngFor="let error of (errors$ | async)">
      {{ getErrorMessage(error) | capitalize }}
      </p>
      <a class="close" aria-label="Close" (click)="resetErrors()"><fa-icon [icon]="closeIcon"></fa-icon></a>
    </div>
  `,
  styles: [' .errors > a { position: absolute; top:5px; right:5px; } ']
})
export class ErrorComponent implements OnDestroy {
  @Select(ErrorState) errors$: Observable<Error[]>;

  constructor(private store: Store) {}
  closeIcon = faTimesCircle;

  resetErrors() {
    this.store.dispatch(new ResetErrors());
  }

  getErrorMessage({ detail, data, errmsg }: Error) {
    //MongoError: E11000 duplicate key error MongoError: inmovilizado.users index: email_1 dup key: { : "ramiro3@yopmail.com" }
  
    if (detail) {
      return detail;
    }

    if (data) {
      return `Tus ${data.label} son incorrectos`;
    }
    if (errmsg.indexOf('email_1')>0) {
      return `Este email ya existe en la aplicación`;
    }
    if (errmsg.indexOf('company_1')>0) {
      return `Esta empresa ya existe en la aplicación`;
    }
    
    return errmsg;
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetErrors());
  }
}
