import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../env/env';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  progressionData: { label: string, data: number[] }[] = [];
  title = 'Progression Over Time';
  showWeightInput = false;
  userId: number = 1; // Default user ID (change as needed)
  todayWeight = '';
  weightEntered = false;
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.Id) {
      this.userId = user.Id;
    }

    this.checkTodayWeight();
    this.fetchProgressionData();
  }

  checkTodayWeight(): void {
    this.http.get<any>(`${this.baseUrl}/users/weights/today/${this.userId}`).subscribe({
      next: (response) => {
        if (response && typeof response.weight_entered !== 'undefined') {
          this.weightEntered = response.weight_entered;
          this.showWeightInput = !this.weightEntered;
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
          const data = response.map(entry => ({ label: entry.EntryDate, data: [entry.Weight] }));
          this.progressionData = data;
        } else {
          console.error('Unexpected response format:', response);
        }
      },
      error: (error) => {
        console.error('Failed to fetch progression data:', error);
      }
    });
  }

  submitWeight(): void {
    if (this.todayWeight) {
      const weight = parseFloat(this.todayWeight);
      this.http.post(`${this.baseUrl}/users/weights/today/${this.userId}`, { weight }).subscribe({
        next: () => {
          this.checkTodayWeight();
          this.fetchProgressionData();
        },
        error: (error) => {
          console.error('Failed to submit today\'s weight:', error);
        }
      });
    }
  }
}
