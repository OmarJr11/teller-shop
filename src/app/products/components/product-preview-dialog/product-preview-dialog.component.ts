import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Product } from '../../../core/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-preview-dialog',
  templateUrl: './product-preview-dialog.component.html',
  styleUrls: ['./product-preview-dialog.component.css']
})
export class ProductPreviewDialogComponent implements OnInit {
  product!: Product;
  constructor(
    public dialogRef: MatDialogRef<ProductPreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product},
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.product = this.data.product;
  }

  close() {
    this.dialogRef.close();
  }

  goToDetails() {
    this.close();
    this._router.navigate(['product', this.product._id]);
  }
}
