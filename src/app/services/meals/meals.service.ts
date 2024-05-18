import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meal } from '../../models/meal.model';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  private baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  getMealsToday(userId: number): Observable<Meal[]> {
    return this.http.get<Meal[]>(`${this.baseUrl}/meals/meals_today/${userId}`);
  }
}
