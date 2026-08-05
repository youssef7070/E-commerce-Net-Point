import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-main-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.scss',
})
export class MainNavbarComponent implements OnInit {
  private readonly _authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  readonly cartCount = this.cartService.cartCount;

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.cartService.getLoggedUserCart().subscribe({
        next: (res) => {
          if (res?.numOfCartItems != null) {
            this.cartService.cartCount.set(res.numOfCartItems);
          }
        },
      });
    }
  }

  logout(): void {
    this._authService.logout();
  }
}
