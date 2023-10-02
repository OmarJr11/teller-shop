import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent, HomeViewComponent, SearchViewComponent } from './views';

export const LAYOUT_ROUTES: Routes = [
  {
      path: '',
      component: HomeLayoutComponent,
      children: [
        {
            path: '',
            component: SearchViewComponent,
        },
        {
            path: 'search/:search',
            component: SearchViewComponent,
        },
        {
            path: 'product',
            loadChildren: () =>
                import('../products/products.module').then(
                    (m) => m.ProductsModule
                ),
        },
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(LAYOUT_ROUTES)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
