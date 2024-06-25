import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users/users.service';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user.model';  // Adjust the path as needed

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  isPopupVisible = true;
  showCreateAccount = false;
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router // Inject the Router service
  ) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(loggedIn => {
      console.log('Login state changed: ', loggedIn);  // Debugging statement
      this.isPopupVisible = !loggedIn;
      if (loggedIn) {
        this.router.navigate(['/']); // Navigate to the home page
      }
    });
  }

  login(): void {
    if (this.username && this.password) {
      console.log('Attempting login with', this.username, this.password);  // Debugging statement
      this.usersService.login(this.username, this.password).subscribe({
        next: (response: User) => {
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
    this.showCreateAccount = true;
  }

  closeCreateAccount(): void {
    this.showCreateAccount = false;
  }
}