import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { BaseURL } from '../../environment/environment.local';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
    private readonly _httpClient = inject(HttpClient);

    constructor(private _HttpClient: HttpClient) { }

    cartCount = signal<number>(0);


    addProductToCart(productId: string): Observable<any> {
        return this._HttpClient.post(`${BaseURL}/api/v1/cart`, { productId });
    }

    updateQuantity(count: number, productId: string): Observable<any> {
        return this._HttpClient.put(`${BaseURL}/api/v1/cart/${productId}`, { count });
    }

    getLoggedUserCart(): Observable<any> {
        return this._HttpClient.get(`${BaseURL}/api/v1/cart`);
    }

    removeProduct(productId: string): Observable<any> {
        return this._HttpClient.delete(`${BaseURL}/api/v1/cart/${productId}`);
    }

    clearCart(): Observable<any> {
        return this._HttpClient.delete(`${BaseURL}/api/v1/cart`);
    }

}
