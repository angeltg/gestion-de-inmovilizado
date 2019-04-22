import { State, Store, Action, StateContext, Selector } from '@ngxs/store';
import { ProductCollection } from '../dashboard.models';
import { ProductsService } from '../services/products.service';
import { GetProducts, GetProducsSuccess, GetProductsFailed } from './product.action';
import { tap, catchError } from 'rxjs/operators';


@State<ProductCollection>({
  name: 'products',
  defaults: { }
})

export class ProductState {

  @Selector()
  static getProduct(state: ProductCollection){
    return Object.values(state);
  }
  constructor(private store: Store, private productService: ProductsService){}

  @Action(GetProducts)
  GetProducts({ dispatch }: StateContext<ProductCollection>){
    return this.productService.getWallProducts().pipe(
      tap(products => dispatch(new GetProducsSuccess(products))),
      catchError(error => dispatch(new GetProductsFailed(error.error)))
    )
  }
  
  @Action(GetProducsSuccess)
  GetProducsSuccess(
    { setState }: StateContext<ProductCollection>,
    { products }: GetProducsSuccess
  ){
   
    setState(
      Array.from(products).reduce((draft, product) => {
        draft[product._id] = product;
        return draft;
      }, {})
    );
  }

  @Action([GetProductsFailed])
  errors(ctx: StateContext<ProductCollection>, { errors }: GetProductsFailed){
    console.log(errors);
  }

}



