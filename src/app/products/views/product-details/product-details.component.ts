import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/models';
import { ProductService } from 'src/app/core/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PriceAndStockHistoricalComponent } from '../price-and-stock-historical';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  id = String(this._activatedRoute.snapshot.paramMap.get('id'));

  private _subscription: Subscription = new Subscription();

  constructor(
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this._subscription.add(
      this._productService.getProductById(this.id).subscribe({
        next: (response) => {
          if(response.status && response.product) {
            this.product = response.product;
          }
        },
        error: () => {
        }
      })
    );
  }

  openDialog() {
    this._dialog.open(PriceAndStockHistoricalComponent, {
      hasBackdrop: true,
      autoFocus: false,
      maxWidth: '100vw',
      data: {
        historical: this.product.productsStock,
      },
    });
  }

  edit() {
    this._router.navigate(['product',this.id,'edit']);
  }

  delete() {
    this._subscription.add(
      this._productService.deleteProduct(this.id).subscribe({
        next: (response) => {
          if(response.status) {
            this._router.navigate(['search']);
          }
        },
        error: () => {
        }
      })
    );
  }
}
