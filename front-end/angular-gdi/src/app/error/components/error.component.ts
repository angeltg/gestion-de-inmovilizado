import { Component, OnDestroy } from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Select, Store } from '@ngxs/store';
import { ErrorState } from '../store/error.state';
import { Observable } from 'rxjs';
import { Error } from 'src/app/error/error.models';
import { ResetErrors } from '../store/error.actions';

@Component({
  selector: 'sn-errors',
  template: `
    <div class="errors" *ngIf="(errors$ | async)?.length">
      <p *ngFor="let error of (errors$ | async)">
        {{ getErrorMessage(error) | capitalize }}
      </p>
      <a (click)="resetErrors()"><fa-icon [icon]="closeIcon"></fa-icon></a>
    </div>
  `,
  styles: []
})
export class ErrorComponent implements OnDestroy {
  @Select(ErrorState) errors$: Observable<Error[]>;

  constructor(private store: Store) {}
  closeIcon = faTimesCircle;

  resetErrors() {
    this.store.dispatch(new ResetErrors());
  }

  getErrorMessage({ detail, data }: Error) {
    if (detail) {
      return detail;
    }

    if (data) {
      return `Tus ${data.label} son incorrectos`;
    }
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetErrors());
  }
}
