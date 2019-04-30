import { Product, ProductRequest } from '../dashboard.models';
import { Error } from 'src/app/error/error.models';

export class GetProducts{
  static readonly type= '[Dashboard] GetProducts';
}

export class GetProducsSuccess {
  static readonly type= '[Dashboard] GetProductsSuccess';
  constructor (public products: Product[]) {}
}

export class GetProductsFailed{
  static readonly type = '[Dashboard] GetProductsFailed';
  constructor(public errors: Error[]) {}
}

export class AddProduct {
  static readonly type = '[Products] AddProduct';
  constructor(public productRequest: ProductRequest) {}
}

export class AddProductSuccess {
  static readonly type = '[Products] AddProductSuccess';
  constructor(public product: Product) {}
}

export class AddProductFailed {
  static readonly type = '[Products] AddProductFailed';
  constructor(public errors: Error[]) {}
}

export class DelProduct {
  static readonly type = '[Protucts] DelProduct';
  constructor(public productId: string) {}
}

export class DelProductSuccess {
  static readonly type = '[Product] Del Product Success';
  constructor(
    public productId: string
    ) {}
}

export class DelProductFailed {
  static readonly type = '[Product] Del Product Failed';
  constructor(public errors: Error[]) {}
}