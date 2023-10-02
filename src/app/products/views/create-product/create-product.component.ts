import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ErrorStateMatcher } from '@angular/material/core';
import { ProductService } from '../../../core/services/products.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  image!: string;
  matcher = new MyErrorStateMatcher();
  form!: FormGroup;
  tags: string[] = [];
  spinner: boolean = false;
  readonly separatorKeysCodes: number[] = [13, 188];

  private _subscription: Subscription = new Subscription();

  constructor(
    private _fb: FormBuilder,
    private _productService: ProductService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this._createForm();
  }

  createProduct() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
        return;
    }
    const { 
      image, name, isProductNew, 
      price, stock, sku, 
      description
    } = this.form.value;
    const product = {
      image, name, isProductNew,
      price, stock, sku, 
      description, tags: this.tags
    };
    
    this._subscription.add(
      this._productService.createProduct(product).subscribe({
        next: (response) => {
          if(response.status && response.product) {
            this._router.navigate(['product', response.product._id]);
            this.spinner = false;
          }
        },
        error: () => {
          this.spinner = false;
        }
      })
    )
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    
    // Add tag
    if ((value || '').trim()) {
        this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
        input.value = '';
    }

    // If there is more than 5 tags then disable the input field
    if (this.tags.length > 8) {
        this.form.controls['tags'].disable();
    }
  }

  removeTag(tag: string): void {
    // Enable input tags field
    this.form.controls['tags'].enable();
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
        this.tags.splice(index, 1);
    }
  }

  checkImage() {
    if(this.form.get('image')?.status === 'VALID'){
      this.image = this.form.value.image;
      return true;
    }
    return false;
  }

  private _createForm() {
    return this._fb.group({
        image: [
          '',
          [
            Validators.required,
            Validators.pattern(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/g)
          ]
        ],
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(150),
          ]
        ],
        sku: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ]
        ],
        stock: [
          [
            Validators.required,
            Validators.min(1),
          ]
        ],
        price: [
          [
            Validators.required,
            Validators.min(0.1),
          ]
        ],
        isProductNew: [
          true,
          [
            Validators.required,
          ]
        ],
        description: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
          ]
        ],
        tags: [''],
    });
  }
}
