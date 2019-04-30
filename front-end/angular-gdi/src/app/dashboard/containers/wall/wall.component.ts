import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GetProducts } from '../../store/product.action';
import { ProductState } from '../../store/products.state';
import { Product } from '../../dashboard.models';
import { Observable } from 'rxjs';
import { AuthState } from '../../../auth/store/auth.state';
import { Auth } from '../../../auth/auth.models';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styles: []
})
export class WallComponent {


  @Select(ProductState.getProduct) products$: Observable<Product[]>;

  @Select(AuthState) currentUser$: Observable<Auth>;
  
  
  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetProducts());
   // this.products$.subscribe(products => console.log('PRODUCTS!', products ));
    
  }

}
