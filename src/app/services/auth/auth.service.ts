import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';  // Adjust the path as needed
import { environment } from '../../env/env';  // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  private loggedIn = new BehaviorSubject<boolean>(this.hasUser());
  public loggedIn$ = this.loggedIn.asObservable();
  public userLoggedIn = new EventEmitter<User>();
  private userData: User | null = this.getStoredUserData();

  constructor(private http: HttpClient) {}

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
    this.fetchBmr();
    this.fetchMacros();
  }

  logout(): void {
    console.log('Removing user data from localStorage and updating state');  // Debugging statement
    localStorage.removeItem('user');
    localStorage.removeItem('bmr');  // Remove BMR from localStorage on logout
    localStorage.removeItem('macros');  // Remove Macros from localStorage on logout
    this.userData = null;
    this.loggedIn.next(false);
  }

  getUserData(): User | null {
    return this.userData;
  }

  fetchBmr(): void {
    const user = this.getStoredUserData();
    if (user && user.Id) {
      this.http.get<any>(`${this.baseUrl}/users/bmr/${user.Id}`).subscribe({
        next: (response) => {
          localStorage.setItem('bmr', JSON.stringify(response));
        },
        error: (error) => {
          console.error('Failed to fetch BMR:', error);
        }
      });
    }
  }

  fetchMacros(): void {
    const user = this.getStoredUserData();
    if (user && user.Id) {
      this.http.get<any>(`${this.baseUrl}/users/macros_today/${user.Id}`).subscribe({
        next: (response) => {
          localStorage.setItem('macros', JSON.stringify(response));
        },
        error: (error) => {
          console.error('Failed to fetch macros:', error);
        }
      });
    }
  }
}