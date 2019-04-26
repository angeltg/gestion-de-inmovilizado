import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, Assignment } from '../dashboard.models';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private http: HttpClient) { }

getWallProducts(): Observable<Product[]>{
  return this.http.get<Product[]>(`${environment.apiBaseUrl}/product`);
}

addProduct(name: string,
  price: number,
  category: string,
  description: string,
  serialNumber: string, userId?: string): Observable<Product> {
  const path = userId ? `/${userId}` : '';

  return this.http.post<Product>(`${environment.apiBaseUrl}/product${path}`, {
    name, price, category, description, serialNumber
  });
}

Assignment(
  idEmployee: string,
  idProduct: string,
  description: string, userId?: string): Observable<Assignment> {
  const path = userId ? `/${userId}` : '';

  return this.http.post<Assignment>(`${environment.apiBaseUrl}/assignment/create${path}`, {
    idEmployee, idProduct, description
  });
}

}