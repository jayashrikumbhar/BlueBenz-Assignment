import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  private readonly cartService = inject(CartService);
  cartItems = this.cartService.cartItems;
  totalAmount = this.cartService.totalAmount;

  async increment(item: any) { await this.cartService.increment(item); }
  async decrement(item: any) { await this.cartService.decrement(item); }
  async remove(id: string) { await this.cartService.remove(id); }
}
