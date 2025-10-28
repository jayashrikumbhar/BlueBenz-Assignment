import { Injectable, computed, signal, inject } from '@angular/core';
import { take } from 'rxjs';
import { CartRepository } from './cart.repository';
import { CartItemEntity } from '../models/cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly cartrepo = inject(CartRepository);
  public items = signal<CartItemEntity[]>([]);

  readonly cartItems = this.items.asReadonly();
  readonly totalAmount = computed(() => this.items().reduce((s, i) => s + i.price * i.quantity, 0));

  constructor() {
    this.load();
  }

  private async load(): Promise<void> {
    this.cartrepo.list().subscribe(list => this.items.set(list));
  }

  public addItemToCart(product: { id: string; title: string; image: string; price: number }): void {
    const existing = this.items().find(i => i.id === product.id);
    if (existing) {
      const updated = { ...existing, quantity: existing.quantity + 1 };
      this.cartrepo.upsert(updated).pipe(take(1)).subscribe(() => {
        this.items.update(list => list.map(i => (i.id === updated.id ? updated : i)));
      });
    } else {
      const newItem: CartItemEntity = { ...product, quantity: 1 };
      this.cartrepo.upsert(newItem).pipe(take(1)).subscribe(() => {
        this.items.update(list => [...list, newItem]);
      });
    }
  }

  public increment(item: CartItemEntity): void {
    const updated = { ...item, quantity: item.quantity + 1 };
    this.cartrepo.upsert(updated).pipe(take(1)).subscribe(() => {
      this.items.update(list => list.map(i => (i.id === updated.id ? updated : i)));
    });
  }

  public decrement(item: CartItemEntity): void {
    const qty = item.quantity - 1;
    if (qty <= 0) {
      this.remove(item.id);
      return;
    }
    const updated = { ...item, quantity: qty };
    this.cartrepo.upsert(updated).pipe(take(1)).subscribe(() => {
      this.items.update(list => list.map(i => (i.id === updated.id ? updated : i)));
    });
  }

  public remove(id: string): void {
    this.cartrepo.delete(id).pipe(take(1)).subscribe(() => {
      this.items.update(list => list.filter(i => i.id !== id));
    });
  }
}


