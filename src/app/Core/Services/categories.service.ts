import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BaseURL } from '../../environment/environment.local';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
    private _httpClient = inject(HttpClient);

    getAllCategories():Observable<any>{
        return this._httpClient.get(`${BaseURL}/api/v1/categories`);
    }
}
