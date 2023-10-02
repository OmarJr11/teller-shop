import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent, PriceAndStockHistoricalComponent, ProductDetailsComponent } from './views';
import { CreateProductComponent } from './views/create-product';

const routes: Routes = [
  {
    path: 'create',
    component: CreateProductComponent,
  },
  {
    path: ':id',
    children: [
        {
            path: '',
            component: ProductDetailsComponent,
        },
        {
          path: 'edit',
          component: EditProductComponent,
        },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
