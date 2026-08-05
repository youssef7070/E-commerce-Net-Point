import { Component, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Cart } from '../../core/Interfaces/cart.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {

  private readonly cartService = inject(CartService)

  cartDetails = signal<Cart>({ products: [], totalCartPrice: 0 } as any)

  ngOnInit(): void {
    this.getCartData() // token

  }

  // get cart data
  getCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res.data)

        if (res?.numOfCartItems != null) {
          this.cartService.cartCount.set(res.numOfCartItems);
        }

        this.cartDetails.set(res.data)
      }
      // ,
      // error: (err) => {
      //   console.log(err.)
      // }
    })
  }

  //delete item
  deleteItem(productId: string): void {
    this.cartService.removeProduct(productId).subscribe({
      next: (res) => {
        console.log(res)
        if (res?.numOfCartItems != null) {
          this.cartService.cartCount.set(res.numOfCartItems);
        }
        this.cartDetails.set(res.data)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


  //update you cart
  update(productId: string, count: number): void {
    if (count <= 0) {
      this.deleteItem(productId); // ✅ احذف بدل ما تبعت 0
      return;
    }

    this.cartService.updateQuantity(count, productId).subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.cartCount.set(res.numOfCartItems)

        this.cartDetails.set(res.data)
      }
    })
  }

  // clear cart
  clearCart(): void {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        console.log(res)
        this.cartService.cartCount.set(res.numOfCartItems)

        this.cartDetails.set({ products: [], totalCartPrice: 0 } as any)
      }
    })
  }



}
