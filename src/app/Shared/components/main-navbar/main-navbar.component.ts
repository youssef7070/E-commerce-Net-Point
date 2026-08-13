import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/whislist.service';
import { TranslatePipe } from '@ngx-translate/core';
import { MyTranslationService } from '../../../core/services/my-translation.service';

@Component({
  selector: 'app-main-navbar',
  imports: [RouterLink, RouterLinkActive,TranslatePipe],
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.scss',
})
export class MainNavbarComponent implements OnInit {
  private readonly _authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly translationService = inject(MyTranslationService);
  readonly cartCount = this.cartService.cartCount;
  readonly wishlistCount = this.wishlistService.wishlistCount;

  selectLang(lang:string){
    this.translationService.changeLang(lang);
  }
  toggleLanguage() {
    let currentLang = localStorage.getItem('lang') || 'en',
        newLang = currentLang === 'en' ? 'ar' : 'en';
    this.selectLang(newLang);
  }
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

      this.translationService.changeDirection();
    }
  }

  logout(): void {
    this._authService.logout();
  }
}
