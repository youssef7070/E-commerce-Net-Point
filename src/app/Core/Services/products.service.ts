import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from '../../environment/environment.local';

@Injectable({ providedIn: 'root' })
export class ProductsService {
    private _httpClient = inject(HttpClient);

    getAllProducts(): Observable<any> {
        return this._httpClient.get(`${BaseURL}/api/v1/products`);
    }

    getSpecificProduct(id: string | number): Observable<any> {
        return this._httpClient.get(`${BaseURL}/api/v1/products/${id}`);
    }


}