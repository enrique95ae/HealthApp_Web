import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  @Output() close = new EventEmitter<void>();

  user = {
    Name: '',
    DoB: '',
    Weight: null,
    Height: null,
    BodyType: '',
    Goal: '',
    Username: '',
    Password: '',
    Gender: ''
  };
  confirmPassword = '';
  submitted = false;
  isValidDob = true;
  isValidPassword = true;
  passwordsMatch = true;
  baseUrl = 'http://127.0.0.1:5000';  // Replace with your actual API URL

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  validateDob() {
    const dobDate = new Date(this.user.DoB);
    const today = new Date();
    this.isValidDob = dobDate <= today;
  }

  validatePassword() {
    const password = this.user.Password;
    const confirmPassword = this.confirmPassword;
    this.passwordsMatch = password === confirmPassword;
    const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    this.isValidPassword = passwordPattern.test(password);
  }

  onSubmit() {
    this.submitted = true;
    this.validateDob();
    this.validatePassword();

    if (!this.isValidDob || !this.isValidPassword || !this.passwordsMatch) {
      return;
    }

    console.log('Creating account with:', this.user);  
    this.http.post(`${this.baseUrl}/users/`, this.user).subscribe({
      next: () => {
        alert('Account created successfully!');
        this.router.navigate(['/sign-in']);
        this.close.emit();
      },
      error: (error) => {
        alert('Failed to create account: ' + error.message);
      }
    });
  }

  onClose() {
    this.close.emit();
  }
}