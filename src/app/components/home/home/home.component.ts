import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../env/env';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  progressionData: { label: string, data: number[] }[] = [];
  title = 'Bodyweight over time';
  showWeightInput = false;
  userId: number = 1;
  private baseUrl = environment.baseUrl;

  macrosData: any = {};

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.Id) {
      this.userId = user.Id;
    }

    this.authService.fetchBmr();
    this.authService.fetchMacros();
    this.loadMacrosFromStorage();
    this.checkTodayWeight();
    this.fetchProgressionData();
  }

  loadMacrosFromStorage(): void {
    const macros = localStorage.getItem('macros');
    if (macros) {
      this.macrosData = JSON.parse(macros);
    }
  }

  checkTodayWeight(): void {
    this.http.get<any>(`${this.baseUrl}/users/weights/today/${this.userId}`).subscribe({
      next: (response) => {
        if (response && typeof response.weight_entered !== 'undefined') {
          this.showWeightInput = !response.weight_entered;
        }
      },
      error: (error) => {
        console.error('Failed to check today\'s weight:', error);
      }
    });
  }

  fetchProgressionData(): void {
    this.http.get<{ EntryDate: string, Weight: number }[]>(`${this.baseUrl}/users/weights/${this.userId}`).subscribe({
      next: (response) => {
        if (response && Array.isArray(response)) {
          const sortedResponse = response.sort((a, b) => new Date(a.EntryDate).getTime() - new Date(b.EntryDate).getTime());
          const data = sortedResponse.map(entry => ({ label: entry.EntryDate, data: [entry.Weight] }));
          this.progressionData = data;

          if (sortedResponse.length > 0) {
            const mostRecentWeight = sortedResponse[sortedResponse.length - 1].Weight;
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (user) {
              user.Weight = mostRecentWeight;
              localStorage.setItem('user', JSON.stringify(user));
            }
          }
        } else {
          console.error('Unexpected response format:', response);
        }
      },
      error: (error) => {
        console.error('Failed to fetch progression data:', error);
      }
    });
  }
}