import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = { Username: username, Password: password };
    return this.http.post(`${this.baseUrl}/users/login`, body);
  }

  updateUser(userId: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${userId}`, user);
  }
}
