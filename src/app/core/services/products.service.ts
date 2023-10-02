import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    ApiParams,
    Product,
    ProductResponse
} from '../models';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(
        private _apiService: ApiService,
    ) {}

    /**
     * Create a new product
     * @param {Product} product
     * @returns {Observable<ProductResponse>}
     * @memberof ProductService
     */
    createProduct(product: Product): Observable<ProductResponse> {
        return this._apiService.post('products', product);
    }

    /**
     * Delete product
     * @param {string} id
     * @returns {Observable<ProductResponse>}
     * @memberof ProductService
     */
    deleteProduct(id: string): Observable<ProductResponse> {
        return this._apiService.delete(`products/${id}`);
    }

    /**
     * Get product BY ID
     * @param {string} id
     * @returns  {Observable<ProductResponse>}
     * @memberof ProductService
     */
    getProductById(id: string): Observable<ProductResponse> {
        return this._apiService.get(`products/${id}`);
    }


    /**
     * Get Products for Home
     * @returns {Observable<ProductResponse>}
     * @memberof ProductService
     */
    getProducts(): Observable<ProductResponse> {
        return this._apiService.get('products');
    }

    /**
     * Edit a product
     * @param {Product} product
     * @returns {Observable<ProductResponse>}
     * @memberof ProductService
     */
    editProduct(
        id: string,
        product: Product,
    ): Observable<ProductResponse> {
        return this._apiService.put(`products/${id}`, product);
    }

    /**
     * Search products for shop module
     *
     * @param {string} search
     * @param {number} [page]
     * @param {number} [limit]
     * @param {string} [orderBy]
     * @param {string} [order]
     * @returns {Observable<ProductResponse>}
     * @memberof ProductService
     */
    searchProduct(params: ApiParams): Observable<ProductResponse> {
        if(!params.maxPrice) {
            delete params.maxPrice;
        }
        if(!params.orderBy) {
            delete params.orderBy;
        }
        if(params.isNew === undefined) {
            delete params.isNew;
        }
        
        const httpParams = new HttpParams({
            fromObject: params as any,
        });
        return this._apiService.get('products/search', httpParams);
    }
}
