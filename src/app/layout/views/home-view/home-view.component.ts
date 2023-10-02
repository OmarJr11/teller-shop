import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../../app/core/models';
import { ProductService } from '../../../../app/core/services/products.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {
  products: Product[] = [];

  private _subscription: Subscription = new Subscription();

  constructor( private _productService: ProductService ) {}

  ngOnInit(): void {
    this._subscription.add(
      this._productService.getProducts().subscribe({
        next: (response) => {
          if(response.status && response.products && response.products.length > 0) {
            this.products.push(...response.products);
          }
        }
      })
    );
  }
}
