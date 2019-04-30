import { Component, OnInit } from '@angular/core';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Store, Actions, ofAction } from '@ngxs/store';

import { AuthService } from '../../../auth/services/auth.service';
import { AddProduct, AddProductSuccess } from '../../store/product.action';

@Component({
  selector: 'app-alta-products',
  templateUrl: './alta-products.component.html',
  styles: []
})
export class AltaProductsComponent implements OnInit {

  categories: string[] = ['Car', 'PC','Phone', 'Laptop', 'Visa', 'Other'];
  default: string = 'Other';

 
  productForm = this.fb.group({
    name: ['',[Validators.required]],
    price: ['', [Validators.required]],
    serialNumber: ['', [Validators.required]],
    category: [this.default, [Validators.required]],
    description: ['', [Validators.required]],
    amortizationAt: ['',[]]
  });

constructor( 
  private fb: FormBuilder, 
  private sotre: Store,
  private actions$: Actions
  ) { }

ngOnInit() {
  this.actions$
    .pipe(ofAction(AddProductSuccess))
    .subscribe(() => this.productForm.reset());
}
pushProduct(){
  if (!this.productForm.valid){
    this.markFormGroupAsTouched(this.productForm);
    return;
  }
  this.sotre.dispatch(new AddProduct(this.productForm.value));
}
markFormGroupAsTouched(FormGroup: FormGroup){
  Object.values(FormGroup.controls).forEach(control =>
    control.markAsTouched()
    );
}
}