import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GetProducts } from '../../store/product.action';
import { ProductState } from '../../store/products.state';
import { ProductResponse } from '../../dashboard.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styles: []
})
export class WallComponent {

  @Select(ProductState.getProduct) products$: Observable<ProductResponse[]>;
  
  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetProducts());
    this.products$.subscribe(products => console.log('PRODUCTS!', products ));
    
  }

}
