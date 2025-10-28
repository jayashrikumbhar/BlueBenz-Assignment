import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCardComponent {
  @Input() product!: { id: string; title: string; description: string; image: string; price: number };
  @Output() addToCart = new EventEmitter<typeof this.product>();
}
