import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  createFood(foodData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/foods/`, foodData, { headers });
  }

  createMeal(mealData: any): Observable<{ Id: number }> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<{ Id: number }>(`${this.baseUrl}/meals/usr_meals`, mealData, { headers });
  }

  addFoodToMeal(mealFoodData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/meals/meal_foods`, mealFoodData, { headers });
  }
}