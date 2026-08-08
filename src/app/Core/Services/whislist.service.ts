import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from '../Interfaces/product.interface';
import { BaseURL } from '../../environment/environment.local';

interface WishlistProductsResponse {
    status: string;
    count: number;
    data: Product[];
}

interface WishlistIdsResponse {
    status: string;
    message: string;
    data: string[];
}

@Injectable({
    providedIn: 'root'
})
export class WishlistService {
    private readonly httpClient = inject(HttpClient);

    wishlistIds = signal<Set<string>>(new Set<string>());
    wishlistProducts = signal<Product[]>([]);
    wishlistCount = computed(() => this.wishlistIds().size);

    addToWishlist(productId: string): Observable<WishlistIdsResponse> {
        return this.httpClient
            .post<WishlistIdsResponse>(`${BaseURL}/api/v1/wishlist`, { productId }, {
                headers: { token: localStorage.getItem('token')! }
            })
            .pipe(tap((res) => this.applyWishlistIdsFromResponse(res)));
    }

    removeFromWishlist(productId: string): Observable<WishlistIdsResponse> {
        return this.httpClient
            .delete<WishlistIdsResponse>(`${BaseURL}/api/v1/wishlist/${productId}`, {
                headers: { token: localStorage.getItem('token')! }
            })
            .pipe(tap((res) => this.applyWishlistIdsFromResponse(res, productId)));
    }

    getLoggedUserWishlist(): Observable<WishlistProductsResponse> {
        return this.httpClient
            .get<WishlistProductsResponse>(`${BaseURL}/api/v1/wishlist`, {
                headers: { token: localStorage.getItem('token')! }
            })
            .pipe(tap((res) => this.applyWishlistProducts(res.data ?? [])));
    }

    isInWishlist(productId: string): boolean {
        return this.wishlistIds().has(productId);
    }

    private applyWishlistIdsFromResponse(res: WishlistIdsResponse, fallbackProductId?: string): void {
        if (Array.isArray(res.data) && typeof res.data[0] === 'string') {
            this.wishlistIds.set(new Set<string>(res.data));
            return;
        }

        if (fallbackProductId) {
            const next = new Set(this.wishlistIds());
            next.delete(fallbackProductId);
            this.wishlistIds.set(next);
        }
    }

    private applyWishlistProducts(products: Product[]): void {
        this.wishlistProducts.set(products);
        const ids = products.map((product) => product._id);
        this.wishlistIds.set(new Set<string>(ids));
    }
}