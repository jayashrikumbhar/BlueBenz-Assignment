import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { UserRepository } from './user.repository';
import { signupPayload, UserEntity } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly users = inject(UserRepository);
  private readonly router = inject(Router);

  public currentUser = signal<UserEntity | null>(null);
  public isAuthenticated = signal(false);

  constructor(){
    if(localStorage.getItem('isLoggenInUser') == 'true'){
      this.isAuthenticated.set(true);
    }
    else{
      this.isAuthenticated.set(false);
    }
  }

  public login(usernameOrEmail: string, password: string): void {
    const isEmail = usernameOrEmail.includes('@');
    const finder = isEmail
      ? this.users.findByEmail(usernameOrEmail)
      : this.users.findByUsername(usernameOrEmail);
    finder.pipe(take(1)).subscribe(list => {
      const user = list.find(u => u.password === password) || null;
      this.currentUser.set(user);
      this.isAuthenticated.set(!!user);
      localStorage.setItem("isLoggenInUser", 'true');
      if (user) this.router.navigateByUrl('/home');
    });
  }

  public signup(payload: signupPayload): void {
    this.users.create(payload).pipe(take(1)).subscribe(user => {
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
      localStorage.setItem("isLoggenInUser", 'true');
      this.router.navigateByUrl('/home');
    });
  }

  public logout(): void {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    localStorage.setItem("isLoggenInUser", 'false');
    this.router.navigateByUrl('/');
  }
}


