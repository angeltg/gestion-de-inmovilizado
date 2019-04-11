import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { WelcomeFormsComponent } from './components/welcome-forms/welcome-forms.component';
import { SharedModule } from '../shared/shared.module'
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [WelcomeComponent, WelcomeFormsComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    SharedModule,
    AuthModule
  ]
})
export class WelcomeModule { }
