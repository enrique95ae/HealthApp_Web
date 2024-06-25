import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users/users.service';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user.model';  

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
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(loggedIn => {
      console.log('Login state changed: ', loggedIn);  
      this.isPopupVisible = !loggedIn;
      if (loggedIn) {
        this.router.navigate(['/']); 
      }
    });
  }

  login(): void {
    if (this.username && this.password) {
      console.log('Attempting login with', this.username, this.password);  
      this.usersService.login(this.username, this.password).subscribe({
        next: (response: User) => {
          console.log('Login successful, response:', response);  
          this.authService.login(response);
        },
        error: (error) => {
          console.error('Login failed, error:', error);  
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