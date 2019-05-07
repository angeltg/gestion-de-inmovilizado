import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';


import { AuthState } from './store/auth.state';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { JwtInterceptor } from './services/jwt.interceptor';
import { ErrorModule } from '../error/error.module';
import { ErrorInterceptor } from './services/error.interceptor';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [ LoginComponent, RegisterComponent ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    ErrorModule,
    NgxsModule.forFeature([AuthState]),
    MatCheckboxModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  exports: [ LoginComponent, RegisterComponent]
})
export class AuthModule { }
