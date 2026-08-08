import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/whislist.service';

@Component({
  selector: 'app-main-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.scss',
})
export class MainNavbarComponent implements OnInit {
  private readonly _authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  readonly cartCount = this.cartService.cartCount;
  readonly wishlistCount = this.wishlistService.wishlistCount;

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.cartService.getLoggedUserCart().subscribe({
        next: (res) => {
          if (res?.numOfCartItems != null) {
            this.cartService.cartCount.set(res.numOfCartItems);
          }
        },
      });

      this.wishlistService.getLoggedUserWishlist().subscribe({
        next: () => {
          // wishlistCount is updated by the service signals
        },
      });
    }
  }

  logout(): void {
    this._authService.logout();
  }
}
