import { Injectable, computed, signal, inject } from '@angular/core';
import { ProductRepository } from './product.repository';
import { ProductEntity } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly repo = inject(ProductRepository);

  private readonly allProducts = signal<ProductEntity[]>([]);
  private readonly page = signal(1);
  private readonly pageSize = signal(5);
  readonly isLoading = signal(false);

  readonly products = computed(() => {
    const p = this.page();
    const ps = this.pageSize();
    const start = (p - 1) * ps;
    return this.allProducts().slice(start, start + ps);
  });

  readonly hasMore = computed(() => {
    const p = this.page();
    const ps = this.pageSize();
    return p * ps < this.allProducts().length;
  });

  constructor() {
    // initial load
    this.refresh();
  }

  async refresh(): Promise<void> {
    this.isLoading.set(true);
    try {
      this.repo.listAll().subscribe(list => this.allProducts.set(list));
    } finally {
      this.isLoading.set(false);
    }
  }

  nextPage(): void {
    if (this.hasMore()) this.page.update(v => v + 1);
  }

  prevPage(): void {
    if (this.page() > 1) this.page.update(v => v - 1);
  }

  get currentPage() {
    return this.page;
  }

}


