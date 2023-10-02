import { Component, Input } from '@angular/core';
import { Product } from '../../../core/models';
import {MatDialog} from '@angular/material/dialog';
import { ProductPreviewDialogComponent } from '../product-preview-dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(
    public _dialog: MatDialog,
    private _router: Router,
  ) {}

  openDialog() {
    this._dialog.open(ProductPreviewDialogComponent, {
      hasBackdrop: true,
      autoFocus: false,
      maxWidth: '100vw',
      data: {
        product: this.product,
      },
    });
  }

  goToDetails() {    
    this._router.navigate(['product', this.product._id]);
  }
}
