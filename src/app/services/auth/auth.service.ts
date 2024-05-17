import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasUser());
  public loggedIn$ = this.loggedIn.asObservable();
  private userData: any = this.getStoredUserData();

  private hasUser(): boolean {
    return !!localStorage.getItem('user');
  }

  private getStoredUserData(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  login(user: any): void {
    console.log('Setting user data in localStorage and updating state:', user);  // Debugging statement
    localStorage.setItem('user', JSON.stringify(user));
    this.userData = user;
    this.loggedIn.next(true);
  }

  logout(): void {
    console.log('Removing user data from localStorage and updating state');  // Debugging statement
    localStorage.removeItem('user');
    this.userData = null;
    this.loggedIn.next(false);
  }

  getUserData(): any {
    return this.userData;
  }
}
