import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);

  public cartCount = computed(() => this.cartService.items().length);
  public isAuthenticated = this.authService.isAuthenticated;
  public loggedInUser: string = '';

  private readonly authEffect = effect(() => {
    const authed = this.authService.isAuthenticated();
    this.loggedInUser = localStorage.getItem('isLoggenInUser') || '';
  });

  public logOut(){
    this.authService.logout();
  }
}
