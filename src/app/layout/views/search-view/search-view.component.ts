import { Component, OnInit } from '@angular/core';
import { ApiParams, Product } from '../../../core/models';
import { ProductService } from '../../../core/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit {
  products: Product[] = [];
  search: string = String(this._activatedRoute.snapshot.paramMap.get('search'));
  query: ApiParams = {
    search: this.search,
    page: 1,
    limit: 10,
    order: 'desc',
    orderBy: undefined,
    minPrice: 1,
    maxPrice: undefined,
    isNew: undefined,
  }
  totalItems: number = 0;
  pages: number = 0; 
  actual: number = 0; 
  next: number = 1; 
  previous: number = 0; 
  conditions = [
    {value: 'All'},
    {value: 'New'},
    {value: 'Used'}
  ];
  ordersBy = [
    {value: 'Date'},
    {value: 'Price'},
    {value: 'Condition'},
    {value: 'none'}
  ];
  orders = [
    {value: 'asc'},
    {value: 'desc'},
  ];
  min!: number;
  max!: number;
  spinner: boolean = true;

  private _subscription: Subscription = new Subscription();

  constructor(
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.searchProducts();
  }

  handleMaxAndMinPrice() {
    if(this.max !== undefined) {
      if(this.max < this.min || this.min === undefined) {
        this.min = 1;
      }
      this.query.minPrice = this.min;
      this.query.maxPrice = this.max;
      this.query.page = 1;
      this.spinner = true;
      this.products = [];
      this.searchProducts()
    } else {
      this.min = 0;
      this.max = 0;
    }
  }

  handleOrder(e: any) {
    if(e.value === 'asc') {
      this.query.order = e.value;
    } else {
      this.query.order = 'desc';
    }
    this.query.page = 1;
    this.spinner = true;
    this.products = [];
    this.searchProducts()
  }

  handleOrderBy(e: any) {
    if(e.value === 'Date') {
      this.query.orderBy = 'creationDate';
    } else if (e.value === 'Price') {
      this.query.orderBy = 'price';
    } else if (e.value === 'Condition') {
      this.query.orderBy = 'isProductNew';
    } else {
      this.query.orderBy = undefined;
    }
    this.query.page = 1;
    this.spinner = true;
    this.products = [];
    this.searchProducts()
  }

  handleCondition(e: any) {
    if(e.value === 'New') {
      this.query.isNew = true;
    } else if (e.value === 'Used') {
      this.query.isNew = false;
    } else {
      this.query.isNew = undefined;
    }
    this.query.page = 1;
    this.spinner = true;
    this.products = [];
    this.searchProducts()
  }

  handlePageEvent(e: any) {
    this.totalItems = e.length;
    this.query.limit = e.pageSize;
    this.actual = e.pageIndex === 0 ? 1 : e.pageIndex + 1;
    this.next = e.pageIndex === 0 ? 2 : e.pageIndex + 2;
    this.previous = e.previousPageIndex;
    this.query.page = this.actual;
    this.spinner = true;
    this.products = [];
    this.searchProducts()
  }

  searchProducts() {
    this._subscription.add(
      this._productService.searchProduct({
        search: this.query.search,
        page: this.query.page,
        limit: this.query.limit,
        order: this.query.order === 'asc' ? 'asc' : 'desc',
        orderBy: this.query.orderBy,
        minPrice: this.query.minPrice,
        maxPrice: this.query.maxPrice,
        isNew: this.query.isNew,
      }).subscribe({
        next: (response) => {
          this.spinner = false;
          if(response.status && response.result) {
            this.products = response.result.items;
            this.totalItems = response.result.totalItems;
            this.pages = response.result.pages;
            this.actual = response.result.actual;
            this.next = response.result.next;
            this.previous = response.result.previous;
          }
        },
        error: () => {
          this.spinner=false;
          this._router.navigate(['home']);
        }
      })
    );
  }
}
