import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ErrorStateMatcher } from '@angular/material/core';
import { ProductService } from '../../../core/services/products.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../core/models';

export class MyErrorUpdateStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  image!: string;
  matcher = new MyErrorUpdateStateMatcher();
  form!: FormGroup;
  tags: string[] = [];
  spinner: boolean = false;
  id = String(this._activatedRoute.snapshot.paramMap.get('id'));
  product!: Product;

  readonly separatorKeysCodes: number[] = [13, 188];

  private _subscription: Subscription = new Subscription();

  constructor(
    private _fb: FormBuilder,
    private _productService: ProductService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.form = this._createForm();
    this._subscription.add(
      this._productService.getProductById(this.id).subscribe({
        next: (response) => {
          if(response.status && response.product) {
            this.product = response.product;
            this._patchValues();
          }
        },
        error: () => {
          this._router.navigate(['home']);
        }
      })
    );
  }

  editProduct() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
        return;
    }
    const { 
      image, name, isProductNew, 
      price, stock, sku, 
      description, tags 
    } = this.form.value;
    const product = {
      image, name, isProductNew,
      price, stock, sku, 
      description, tags: this.tags
    };
    
    this._subscription.add(
      this._productService.editProduct(this.id, product).subscribe({
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

  private _patchValues() {
    if (this.product) {
        const { 
          image, name, isProductNew, 
          price, stock, sku, 
          description, tags 
        } = this.product;
        this.form.patchValue({
          image, name, isProductNew, 
          price, stock, sku, 
          description, 
        });
        this.tags = tags ? [...tags] : [];
    }
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
          0,
          [
            Validators.required,
            Validators.min(1),
          ]
        ],
        price: [
          0,
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

