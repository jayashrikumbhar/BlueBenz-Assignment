import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { CartItemEntity } from '../models/cart.model';
import { catchError, map, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/cartItems`;

  list() {
    return this.http.get<CartItemEntity[]>(this.baseUrl);
  }

  upsert(item: CartItemEntity) {
    return this.http.get<CartItemEntity>(`${this.baseUrl}/${item.id}`).pipe(
      switchMap(() => 
        this.http.put<CartItemEntity>(`${this.baseUrl}/${item.id}`, item)
      ),
      catchError(() => 
        this.http.post<CartItemEntity>(this.baseUrl, item)
      )
    );
  }
  
  public delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}