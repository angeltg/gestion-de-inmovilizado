import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../dashboard.models';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

getWallEmployees(): Observable<Employee[]>{
  return this.http.get<Employee[]>(`${environment.apiBaseUrl}/employee`);
}
addEmployee(
  firstName: string,
  secondName: string,
  email: string,
  password: string,
  phone: string,
  roll: string,
  userId?: string): Observable<Employee> {
  const path = userId ? `/${userId}` : '';

  return this.http.post<Employee>(`${environment.apiBaseUrl}/employee${path}`, {
    firstName, secondName, email, password, phone, roll
  });
}


delEmployee(employeeId: string) {
  return this.http.delete(`${environment.apiBaseUrl}/employee/${employeeId}`, {});
}

getEmployeeByRoll(){
  return this.http.get(`${environment.apiBaseUrl}/employee-roll`);
}


}
