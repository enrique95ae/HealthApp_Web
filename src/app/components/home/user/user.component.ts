import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userData: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.userData = loggedIn ? this.authService.getUserData() : null;
    });
    this.loadUserData();
  }

  loadUserData(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.userData = JSON.parse(user);
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
