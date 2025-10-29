import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { ProductEntity } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/products`;

  listAll() {
    return this.http.get<ProductEntity[]>(this.baseUrl);
  }

  getById(id: string) {
    return this.http.get<ProductEntity>(`${this.baseUrl}/${id}`);
  }
}


