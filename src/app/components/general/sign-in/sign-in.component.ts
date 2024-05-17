import { Component } from '@angular/core';
import { UsersService } from '../../../services/users/users.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  isPopupVisible = true;
  username = '';
  password = '';
  errorMessage = '';

  constructor(private usersService: UsersService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(loggedIn => {
      console.log('Login state changed: ', loggedIn);  // Debugging statement
      this.isPopupVisible = !loggedIn;
    });
  }

  login(): void {
    if (this.username && this.password) {
      console.log('Attempting login with', this.username, this.password);  // Debugging statement
      this.usersService.login(this.username, this.password).subscribe({
        next: (response) => {
          console.log('Login successful, response:', response);  // Debugging statement
          this.authService.login(response);
        },
        error: (error) => {
          console.error('Login failed, error:', error);  // Debugging statement
          this.errorMessage = 'Invalid username or password';
        }
      });
    }
  }

  createAccount(): void {
    alert('Account creation is not implemented yet.');
  }
}
