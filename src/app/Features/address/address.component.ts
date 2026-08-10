import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../core/services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-address',
  imports: [ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent implements OnInit {

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrderService = inject(OrderService);

  cartId: string = '';

  address = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null)
  });

  payment() {
    this._OrderService.checkoutSession(
      this.cartId,
      this.address.value
    ).subscribe({
      next(res) {
        window.location.href = res.session.url;
      },
      error(err) {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe({
      next: (params) => {
        this.cartId = params['id'];
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
