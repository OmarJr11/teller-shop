import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searched = '';
  routes: { path: string, name: string}[] = [
    { path: 'product/create', name: 'add_circle'}
  ];

  constructor(
    private _router: Router,
  ) {}

  goTo(path: string) {
    this._router.navigate([path]);
  }

  search() {
    this._router.navigateByUrl(
      '/', { skipLocationChange: true }
    ).then(() =>
      this._router.navigate(['search', this.searched])
    );
  }
}
