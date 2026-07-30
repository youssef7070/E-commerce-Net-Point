import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BaseURL } from '../../environment/environment.local';
import { Observable } from 'rxjs';
import { SignUpData } from '../Interfaces/signup.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _httpClient = inject(HttpClient);

    SignUp(data:SignUpData): Observable<any> {
        return this._httpClient.post(`${BaseURL}/api/v1/auth/signup`, data);
    }
}
