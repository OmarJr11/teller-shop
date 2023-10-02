import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ProductStock } from '../../..//core/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-price-and-stock-historical',
  templateUrl: './price-and-stock-historical.component.html',
  styleUrls: ['./price-and-stock-historical.component.css']
})
export class PriceAndStockHistoricalComponent {
  historical!: ProductStock[];
  constructor(
    public dialogRef: MatDialogRef<PriceAndStockHistoricalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { historical: ProductStock[]},
    private _router: Router,
  ) {}

  ngOnInit(): void {    
    this.historical = this.data.historical;
  }

  close() {
    this.dialogRef.close();
  }
}
