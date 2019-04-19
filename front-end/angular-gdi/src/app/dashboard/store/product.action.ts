import { ProductResponse } from '../dashboard.models';
import { Error } from 'src/app/error/error.models';

export class GetProducts{
  static readonly type= '[Dashboard] GetProducts';
}

export class GetProducsSuccess {
  static readonly type= '[Dashboard] GetProductsSuccess';
  constructor (public products: ProductResponse[]) {}
}

export class GetProductsFailed{
  static readonly type = '[Dashboard] GetProductsFailed';
  constructor(public errors: Error[]) {}
}