import { State, Store, Action, StateContext, Selector } from '@ngxs/store';
import { Product } from '../dashboard.models';
import { ProductsService } from '../services/products.service';
import { 
  GetProducts, 
  GetProducsSuccess, 
  GetProductsFailed,
  AddProduct, 
  AddProductFailed, 
  AddProductSuccess, 
  DelProduct,
  DelProductFailed,
  DelProductSuccess
} from './product.action';
import { tap, catchError } from 'rxjs/operators';


@State<Product[]>({
  name: 'products',
  defaults: []
})

export class ProductState {

  @Selector()
  static getProduct(state: Product[]){
    
    return Object.values(state);
  }
  constructor(private store: Store, private productService: ProductsService){}

  @Action(GetProducts)
  GetProducts({ dispatch }: StateContext<Product[]>){
    return this.productService.getWallProducts().pipe(
      tap(products => dispatch(new GetProducsSuccess(products))),
      catchError(error => dispatch(new GetProductsFailed(error.error)))
    )
  }
  
  @Action(GetProducsSuccess)
  GetProducsSuccess(
    { setState }: StateContext<Product[]>,
    { products }: GetProducsSuccess
  ){
    setState(
      products['products'].reduce((draft, product) => {
        draft[product._id] = product;
        return draft;
      }, {})
    );
  }

  @Action(AddProduct)
  addProduct({ dispatch }: StateContext<Product[]>, { productRequest }: AddProduct) {
    const currentUser = this.store.selectSnapshot(state => state.auth);

    return this.productService.addProduct(
      productRequest.name, 
      productRequest.price, 
      productRequest.category, 
      productRequest.description,
      productRequest.serialNumber).pipe(
      tap(product =>
        dispatch(
          new AddProductSuccess({
            ...product
          })
        )
      ),
      catchError(error => dispatch(new AddProductFailed(error.error)))
    );
  }

  @Action(AddProductSuccess)
  addProductSuccess(
    { setState, getState }: StateContext<Product[]>,
    { product }: AddProductSuccess
  ) {
    setState([product, ...getState()]);
  }

  
  @Action(DelProduct, { cancelUncompleted: true })
  delProduct({ dispatch, getState }: StateContext<Product[]>, { productId }: DelProduct) {
   // const product = getState().find(p => p._id === productId);
   
  //  if (product) {
        return this.productService.delProduct(productId).pipe(
          tap(() => dispatch(new DelProductSuccess(productId))),
          catchError(error => dispatch(new DelProductFailed(error.error)))
        );
  
  //  }
  }

  @Action(DelProductSuccess)
  delProcutSuccess(
    { getState, setState }: StateContext<Product[]>,
    { productId }: DelProductSuccess
  ) {  }


  @Action([GetProductsFailed,AddProductFailed, DelProductFailed])
  error({ dispatch }: StateContext<Product[]>, { errors }: any) {
    console.log(errors);
  }
  // errors(ctx: StateContext<Product[]>, { errors }: GetProductsFailed){
  //   console.log(errors);
  // }

}









