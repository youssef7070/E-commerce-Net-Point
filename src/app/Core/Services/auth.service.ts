import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BaseURL } from '../../environment/environment.local';
import { Observable } from 'rxjs';
import { SignUpData } from '../Interfaces/signup.interface';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly _httpClient = inject(HttpClient);
    private readonly _router = inject(Router);


    signIn(data: object): Observable<any> {
        return this._httpClient.post(`${BaseURL}/api/v1/auth/signin`, data)
    }

    SignUp(data: SignUpData): Observable<any> {
        return this._httpClient.post(`${BaseURL}/api/v1/auth/signup`, data);
    }


    //verfiy token
    verifyToken(): Observable<any> {
        let token = localStorage.getItem("token")!;
        return this._httpClient.get(`${BaseURL}/api/v1/auth/verifyToken`, { headers: { token: token } });
    }

    validateToken() {
        let token = localStorage.getItem("token")!;
        if (token) {
            try {
                let payload = jwtDecode(token);
                this.verifyToken().subscribe({
                    next: (res) => {
                        console.log("Token is verfied");
                    },
                    error: (err) => {
                        console.log("Token is invalid or expired", err);
                        this.logout();
                    }
                })
            } catch (err) {
                this.logout();
            }
        } else {
            this._router.navigate(['/signIn']);
        }
    }

    logout() {
        localStorage.removeItem("token");
        this._router.navigate(['/signIn']);
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
