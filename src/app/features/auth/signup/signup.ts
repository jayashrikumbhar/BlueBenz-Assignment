import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class SignupComponent implements OnInit {
  private readonly auth = inject(AuthService);
  
  public signUpForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initSignUpForm();
  }

  private initSignUpForm(){
    this.signUpForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)])
    })
  }

  get f() { return this.signUpForm.controls; }

  submit() {
    this.auth.signup(this.signUpForm.value);
  }
}


