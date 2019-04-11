import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient) { }

    login({ email, password}){
      return this.http.post(`${environment.apiBaseUrl}/employee/login`, {
        email,
        password
      })
    }
    register ({ fullName, email, password, company}){
      return this.http.post(`${environment.apiBaseUrl}/account/create`,{
        fullName,
        email,
        password,
        company
      })
    }
}
