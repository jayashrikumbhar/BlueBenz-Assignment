import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { UserEntity } from '../models/user.model';


@Injectable({ providedIn: 'root' })
export class UserRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/users`;

  findByUsername(username: string) {
    return this.http.get<UserEntity[]>(`${this.baseUrl}?username=${encodeURIComponent(username)}`);
  }

  findByEmail(email: string) {
    return this.http.get<UserEntity[]>(`${this.baseUrl}?email=${encodeURIComponent(email)}`);
  }

  create(user: Omit<UserEntity, 'id'>) {
    return this.http.post<UserEntity>(this.baseUrl, user);
  }
}


