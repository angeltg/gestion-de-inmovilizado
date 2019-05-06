import { Component} from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-grafic-products',
  templateUrl: './grafic-products.component.html',
  styles: []
})
export class GraficProductsComponent {


  constructor(private categoryProduct: ProductsService){}

  public  barChartOptions:any = {
      scaleShowVerticallines: false,
      responsive: true
  }

  public barChartLabels:string[] = ['Car', 'PC','Phone', 'Laptop', 'Visa', 'Other'];
  public barChartType:string = 'pie';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    { data: [0,0,0,0,0], label: 'Bienes por categoría' }
  ];


  ngOnInit() {
    this.categoryProduct.getProductByCategory()
    .subscribe(res => {
      const arrProductByCategory = res['arrCategoryProducts'];
      this.barChartData = [
        { data: arrProductByCategory, label: 'Bienes por categoría' }
      ];
    });  
    
  }
}
