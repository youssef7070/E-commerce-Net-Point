import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/whislist.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-whislist',
  standalone: true,
  imports: [CurrencyPipe, TranslatePipe],
  templateUrl: './whislist.component.html',
  styleUrl: './whislist.component.scss',
})
export class WhislistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);

  wishlistProducts = computed(() => this.wishlistService.wishlistProducts());

  ngOnInit(): void {


    this.getWishlistData();
  }

  getWishlistData(): void {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: () => { }
    });
  }

  showProductDetails(productId: string): void {
    this.router.navigate(['/products', productId]);
  }

  removeFromWishlist(productId: string): void {
    this.wishlistService.removeFromWishlist(productId).subscribe({
      next: (res) => {
        // Refresh wishlistProducts so the list updates immediately
        this.wishlistService.getLoggedUserWishlist().subscribe();
        this.toastrService.info(res?.message ?? 'Removed from wishlist', 'freshCart', { progressBar: true, closeButton: true });
      }
    });
  }
}