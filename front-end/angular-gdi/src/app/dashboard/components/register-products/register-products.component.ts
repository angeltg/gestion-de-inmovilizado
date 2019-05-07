import { Component, OnInit } from '@angular/core';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Store, Actions, ofAction } from '@ngxs/store';

import { AuthService } from '../../../auth/services/auth.service';
import { AddProduct, AddProductSuccess } from '../../store/product.action';
import * as moment from 'moment';

@Component({
  selector: 'register-alta-products',
  templateUrl: './register-products.component.html',
  styles: []
})
export class RegisterProductsComponent implements OnInit {

  categories: string[] = ['Car', 'PC','Phone', 'Laptop', 'Visa', 'Other'];
  default: string = 'Other';

  //Establecemos como fecha mínima de amortización la de hoy
  minDate = new Date();

  productForm = this.fb.group({
    name: ['',[Validators.required]],
    price: ['', [Validators.required,Validators.min(0)]],
    serialNumber: ['', [Validators.required]],
    category: [this.default, [Validators.required]],
    description: ['', [Validators.required]],
    amortizationAt: [this.minDate,[]]
  });

constructor( 
  private fb: FormBuilder, 
  private sotre: Store,
  private actions$: Actions
  ) { }

ngOnInit() {
  this.actions$
    .pipe(ofAction(AddProductSuccess))
    .subscribe(() =>{ 
      this.productForm.reset();
        //Remove with css the form
        let elemt = document.getElementById('register-form');
        elemt.style.display = 'none';
        let elemtWelcome = document.getElementById('register-form-message');
        elemtWelcome.style.display = 'block';
      });
}

formatDate (formDate){
    let newDate = new Date (formDate);
    return moment(newDate).format("YYYY-MM-DD");
  }

pushProduct(){
  if (!this.productForm.valid){
    this.markFormGroupAsTouched(this.productForm);
    return;
  }
  //Cambiamos la fecha al formato YYYY-MM-DD
  this.productForm.value.amortizationAt = this.formatDate(this.productForm.value.amortizationAt);

  this.sotre.dispatch(new AddProduct(this.productForm.value));
}

markFormGroupAsTouched(FormGroup: FormGroup){
  Object.values(FormGroup.controls).forEach(control =>
    control.markAsTouched()
    );
}

}