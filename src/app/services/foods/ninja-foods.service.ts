import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/env'; 

@Injectable({
  providedIn: 'root'
})
export class NinjaFoodsService {
  private baseUrl = 'https://api.api-ninjas.com/v1/nutrition';
  private apiKey = environment.ninjaApiKey; 

  constructor(private http: HttpClient) {}

  getFoodSuggestions(query: string): Observable<any> {
    const headers = new HttpHeaders({ 'X-Api-Key': this.apiKey });
    return this.http.get<any>(`${this.baseUrl}?query=${query}`, { headers });
  }
}