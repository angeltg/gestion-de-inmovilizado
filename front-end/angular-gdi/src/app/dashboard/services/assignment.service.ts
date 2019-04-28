import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Assignment } from '../dashboard.models';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private http: HttpClient) { }

getWallAssignments(): Observable<Assignment[]>{
  return this.http.get<Assignment[]>(`${environment.apiBaseUrl}/assignment`);
}
addAssignment(
  idEmployee: string,
  idProduct: string,
  userId?: string): Observable<Assignment> {
  const path = userId ? `/${userId}` : '';

  return this.http.post<Assignment>(`${environment.apiBaseUrl}/assignment/create${path}`, {
    idEmployee, idProduct
  });
}

}
