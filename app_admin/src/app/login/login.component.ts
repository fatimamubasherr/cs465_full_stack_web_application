import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public formError = '';
  public submitting = false;
  public credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password || !this.credentials.name) {
      this.formError = 'All fields are required, please try again.';
      return;
    }

    const user = {
      name: this.credentials.name,
      email: this.credentials.email
    } as User;

    this.submitting = true;
    this.authenticationService.login(user, this.credentials.password).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/']);
      },
      error: () => {
        this.submitting = false;
        this.formError = 'Login failed. Check your email and password and try again.';
      }
    });
  }
}
