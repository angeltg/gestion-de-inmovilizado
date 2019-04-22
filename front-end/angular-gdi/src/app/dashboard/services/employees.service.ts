import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeResponse } from '../dashboard.models';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

getWallEmployees(): Observable<EmployeeResponse[]>{
  return this.http.get<EmployeeResponse[]>(`${environment.apiBaseUrl}/employee`);
}

}
