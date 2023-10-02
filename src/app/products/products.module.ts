import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductCardComponent, ProductListComponent } from './components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductPreviewDialogComponent } from './components/product-preview-dialog/product-preview-dialog.component';
import { ProductDetailsComponent, CreateProductComponent, EditProductComponent, PriceAndStockHistoricalComponent } from './views';
import {MatChipsModule} from '@angular/material/chips';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule,} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductListComponent,
    ProductPreviewDialogComponent,
    ProductDetailsComponent,
    CreateProductComponent,
    EditProductComponent,
    PriceAndStockHistoricalComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    NgxSkeletonLoaderModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    NgIf,
    NgFor,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule
  ],
  exports: [
    ProductCardComponent,
    ProductListComponent,
    ProductPreviewDialogComponent,
  ]
})
export class ProductsModule { }
