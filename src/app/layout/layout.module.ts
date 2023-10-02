import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { HomeLayoutComponent } from './views';
import { HeaderComponent } from './components/header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import { BannerComponent } from './components/banner/banner.component';
import { ProductsModule } from '../products/products.module';
import { FooterComponent } from './components/footer/footer.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { SearchViewComponent } from './views/search-view/search-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    HomeLayoutComponent,
    HeaderComponent,
    BannerComponent,
    FooterComponent,
    HomeViewComponent,
    SearchViewComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FlexLayoutModule,
    MatIconModule,
    ProductsModule,
    MatTooltipModule,
    MatButtonModule,
    FormsModule,
    MatPaginatorModule,
    NgxSkeletonLoaderModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSelectModule,
    NgFor,
  ]
})
export class LayoutModule { }
