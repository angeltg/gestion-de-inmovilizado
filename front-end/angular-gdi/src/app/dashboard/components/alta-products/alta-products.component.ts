import { Component, OnInit } from '@angular/core';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Store, Actions, ofAction } from '@ngxs/store';

import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-alta-products',
  templateUrl: './alta-products.component.html',
  styles: []
})
export class AltaProductsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
