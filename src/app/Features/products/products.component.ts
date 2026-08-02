import { Component, effect, inject, input, signal } from '@angular/core';
import { Product } from '../../core/Interfaces/product.interface';
import { ProductsService } from '../../core/Services/products.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {

  private readonly productsService = inject(ProductsService);
  private readonly router = inject(Router);

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

}
