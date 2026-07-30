import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BaseURL } from '../../environment/environment.local';
import { Observable } from 'rxjs';
import { SignUpData } from '../Interfaces/signup.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _httpClient = inject(HttpClient);


    signIn(data: object): Observable<any> {
        return this._httpClient.post(`${BaseURL}/api/v1/auth/signin`, data)
    }

    SignUp(data: SignUpData): Observable<any> {
        return this._httpClient.post(`${BaseURL}/api/v1/auth/signup`, data);
    }



    // ===== forgot password =====


    // forgot password
    forgotPassword(data: object): Observable<any> {
        return this._httpClient.post(`${BaseURL}/api/v1/auth/forgotPasswords`, data)
    }

    // verify Reset Code
    verifyResetCode(data: object): Observable<any> {
        return this._httpClient.post(`${BaseURL}/api/v1/auth/verifyResetCode`, data)
    }

    // reset Password
    resetPassword(data: object): Observable<any> {
        return this._httpClient.put(`${BaseURL}/api/v1/auth/resetPassword`, data)
    }


}
