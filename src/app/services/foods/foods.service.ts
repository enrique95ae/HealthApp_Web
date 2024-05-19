import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Food } from '../../models/meal.model';

@Injectable({
  providedIn: 'root'
})
export class FoodsService {
  private baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  getFoodSuggestions(query: string): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.baseUrl}/foods/search?q=${query}`);
  }

  getFoodDetails(id: number): Observable<Food> {
    return this.http.get<Food>(`${this.baseUrl}/foods/${id}`);
  }
}
