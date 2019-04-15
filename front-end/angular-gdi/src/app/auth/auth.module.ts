import { NgModule } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './store/auth.state';


import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ LoginComponent, RegisterComponent ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forFeature([AuthState])
  ],
  exports: [ LoginComponent, RegisterComponent ]
})
export class AuthModule { }
