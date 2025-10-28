import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { SignupComponent } from './features/auth/signup/signup';

export const routes: Routes = [
  { 
    path: '', 
    component: LoginComponent 
  },
  { 
    path: 'signup', 
    component: SignupComponent 
  },
  { 
    path: 'home', 
    loadComponent: () => import('./features/home/home').then(m => m.Home)
  },
  
  { 
    path: 'cart', 
    loadComponent: () => import('./features/cart/cart').then(m => m.Cart)
  },
];
