import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodsService {
  private baseUrl = 'http://127.0.0.1:5000'; // Replace with your actual base URL

  constructor(private http: HttpClient) {}

  searchFoods(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/foods/search`, { params: { q: query } });
  }
}
