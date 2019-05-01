import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/error.component';
import { NgxsModule } from '@ngxs/store';
import { ErrorState } from './store/error.state';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule,
    NgxsModule.forFeature([ErrorState])
  ],
  exports: [ErrorComponent]
})
export class ErrorModule {}
