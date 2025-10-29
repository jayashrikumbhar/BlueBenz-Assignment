import { Component, computed, inject } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { ProductCardComponent } from '../../common-component/product-card/product-card';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  products = this.productService.products;
  isLoading = this.productService.isLoading;
  currentPage = this.productService.currentPage;
  hasMore = this.productService.hasMore;

  async onAddToCart(product: Product) {
    await this.cartService.addItemToCart(product);
  }

  nextPage() {
    this.productService.nextPage();
  }

  prevPage() {
    this.productService.prevPage();
  }
}
