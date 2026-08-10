import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from '../../environment/environment.local';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class OrderService {

    constructor(private _HttpClient: HttpClient) { }

    checkoutSession(
        cartId: string,
        shippingAddress: object
    ): Observable<any> {

        const returnUrl = encodeURIComponent(
            'http://localhost:4200/#'
        );

        return this._HttpClient.post(
            `${BaseURL}/api/v1/orders/checkout-session/${cartId}/?url=${returnUrl}`,
            {
                shippingAddress
            },
            {
                headers: {
                    token: localStorage.getItem('token')!
                }
            }
        );
    }
}