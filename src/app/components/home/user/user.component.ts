import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserEditComponent } from '../user-edit/user-edit.component';  // Adjust the path as needed

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userData: User | null = null;
  isLoggedIn = false;

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.userData = this.authService.getUserData();
        if (this.userData) {
          this.userData.Age = this.calculateAge(this.userData.DoB);
        }
      } else {
        this.userData = null;
      }
    });

    this.loadUserData();
  }

  loadUserData(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.userData = JSON.parse(user) as User;
      if (this.userData) {
        this.userData.Age = this.calculateAge(this.userData.DoB);
      }
    }
  }

  calculateAge(dob: string): number {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  logout(): void {
    this.authService.logout();
  }

  openEdit(): void {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '400px',
      data: { ...this.userData } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userData = result;
        if( this.userData)
        this.userData.Age = this.calculateAge(this.userData.DoB ?? '');
      console.log(this.userData);
        localStorage.setItem('user', JSON.stringify(this.userData));
      }
    });
  }
}
