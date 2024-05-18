import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.model';  // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasUser());
  public loggedIn$ = this.loggedIn.asObservable();
  public userLoggedIn = new EventEmitter<User>();
  private userData: User | null = this.getStoredUserData();

  private hasUser(): boolean {
    return !!localStorage.getItem('user');
  }

  private getStoredUserData(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  login(user: User): void {
    console.log('Setting user data in localStorage and updating state:', user);  // Debugging statement
    localStorage.setItem('user', JSON.stringify(user));
    this.userData = user;
    this.loggedIn.next(true);
    this.userLoggedIn.emit(user);  // Emit the event
  }

  logout(): void {
    console.log('Removing user data from localStorage and updating state');  // Debugging statement
    localStorage.removeItem('user');
    this.userData = null;
    this.loggedIn.next(false);
  }

  getUserData(): User | null {
    return this.userData;
  }
}
