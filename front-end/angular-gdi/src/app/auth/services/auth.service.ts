import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { LoginRequest, LoginResponse } from '../auth.models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient) { }

    login({ email, password} : LoginRequest ){
      return this.http.post<LoginResponse>(
        `${environment.apiBaseUrl}/account/login`, {
        email,
        password
      })
      .pipe(
        map(user => {
          if (user && user.accessToken){
            const { accessToken, refreshToken, company } = user;
            localStorage.setItem(
              'auth',
              JSON.stringify({ accessToken, refreshToken, company })
            );
          }
          return user;
        })
      );
    }

    register ({ fullName, email, password, company}){
      return this.http.post(`${environment.apiBaseUrl}/account/create`,{
        fullName,
        email,
        password,
        company
      })
    }

    logout() {
      localStorage.removeItem('auth');
    }
}
