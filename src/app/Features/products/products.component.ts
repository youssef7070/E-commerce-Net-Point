import { Component, effect, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../core/Interfaces/product.interface';
import { ProductsService } from '../../core/services/products.service';
import { WishlistService } from '../../core/services/whislist.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { StockPipe, StockFilterMode } from '../../Shared/pipes/stock.pipe';
import { AvailablePipe, AvailabilityFilterMode } from '../../Shared/pipes/available.pipe';
import { SearchPipe } from '../../Shared/pipes/search.pipe';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, FormsModule, StockPipe, AvailablePipe, SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  text = signal<string>('');
  availabilityFilter = signal<AvailabilityFilterMode>('all');
  stockFilter = signal<StockFilterMode>('all');

  setAvailabilityFilter(mode: AvailabilityFilterMode): void {
    this.availabilityFilter.set(mode);
  }

  setStockFilter(mode: StockFilterMode): void {
    this.stockFilter.set(mode);
  }

  resetFilters(): void {
    this.text.set('');
    this.availabilityFilter.set('all');
    this.stockFilter.set('all');
  }

  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  // Route parameter binding (or managed via ActivatedRoute)
  id = input<string | null>(null);

  allProducts = signal<Product[]>([]);
  selectedProductDetails = signal<Product | null>(null);

  constructor() {
    // Whenever 'id' route param changes, load the corresponding view
    effect(() => {
      const currentId = this.id();
      if (currentId) {
        this.loadSpecificProduct(currentId);
      } else {
        this.selectedProductDetails.set(null);
      }
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.allProducts.set(res.data);
      },
    });
  }

  loadSpecificProduct(productId: string): void {
    this.productsService.getSpecificProduct(productId).subscribe({
      next: (res) => {
        this.selectedProductDetails.set(res.data);
      },
      error: () => {
        // Fallback to local list if API fails
        const localProd = this.allProducts().find((p) => p._id === productId);
        if (localProd) {
          this.selectedProductDetails.set(localProd);
        }
      },
    });
  }

  showProductDetails(productId: string): void {
    this.router.navigate(['/products', productId]);
  }

  backToAllProducts(): void {
    this.router.navigate(['/products']);
  }

  addToCart(productId: string): void {
    this.cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        this.toastr.success('Product added to cart successfully.', 'Added to Cart');
        if (res?.numOfCartItems != null) {
          this.cartService.cartCount.set(res.numOfCartItems);
        }
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
        this.toastr.error('Could not add the product to cart. Please try again.', 'Cart Error');
      },
    });
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistService.isInWishlist(productId);
  }

  addToWishlist(productId: string): void {
    if (this.wishlistService.isInWishlist(productId)) {
      this.toastr.info('This product is already in your wishlist.', 'Wishlist');
      return;
    }

    this.wishlistService.addToWishlist(productId).subscribe({
      next: () => {
        // Refresh wishlistProducts so the wishlist page shows the new item
        // and the nav counter reflects the updated count
        this.wishlistService.getLoggedUserWishlist().subscribe();
        this.toastr.success('Product added to wishlist.', 'Wishlist');
      },
      error: (err) => {
        console.error('Error adding product to wishlist:', err);
        this.toastr.error('Could not add the product to wishlist. Please try again.', 'Wishlist Error');
      },
    });
  }

}
