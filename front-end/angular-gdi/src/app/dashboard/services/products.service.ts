import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductResponse } from '../dashboard.models';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private http: HttpClient) { }

getWallProducts(): Observable<ProductResponse[]>{
  return this.http.get<ProductResponse[]>(`${environment.apiBaseUrl}/product`);
}

}