import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
