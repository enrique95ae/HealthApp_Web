import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../env/env';

interface Food {
  Id: number;
  Name: string;
  Calories: number;
  Cholesterol: number;
  DietaryFiber: number;
  PortionEaten: number;
  PortionSize: number;
  Proteins: number;
  SaturatedFat: number;
  Sodium: number;
  Sugars: number;
  TotalCarbs: number;
  TotalFat: number;
}

interface NutritionHistoryItem {
  CreationDate: string;
  CreationTime: string;
  Foods: Food[];
  Id: number;
  Score: number;
  Title: string;
}

interface NutritionHistoryResponse {
  items: NutritionHistoryItem[];
  totalPages: number;
}

@Component({
  selector: 'app-nutrition-history',
  templateUrl: './nutrition-history.component.html',
  styleUrls: ['./nutrition-history.component.css']
})
export class NutritionHistoryComponent implements OnInit {
  historyItems: NutritionHistoryItem[] = [];
  displayedItems: NutritionHistoryItem[] = [];
  private baseUrl = environment.baseUrl;
  private userId = JSON.parse(localStorage.getItem('user') || '{}').Id;

  itemsPerPage: number = 20;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('Initializing component'); 
    this.fetchNutritionHistory(this.currentPage);
  }

  fetchNutritionHistory(page: number): void {
    const url = `${this.baseUrl}/meals/user_meals/${this.userId}?page=${page}&page_size=${this.itemsPerPage}`;
    console.log('Fetching nutrition history from:', url); 
    this.http.get<NutritionHistoryResponse>(url).subscribe({
      next: (response) => {
        console.log('Fetched data:', response);  
        if (response && response.items) {
          this.historyItems = response.items;
          console.log('History items set:', this.historyItems); 
          this.totalPages = response.totalPages;
          this.updateDisplayedItems();
        } else {
          console.error('Response items are undefined or null:', response);
        }
      },
      error: (error) => {
        console.error('Failed to fetch nutrition history:', error);
      }
    });
  }

  updateDisplayedItems(): void {
    console.log('Updating displayed items'); 
    this.displayedItems = this.historyItems;
    console.log('Displayed items:', this.displayedItems);  
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    console.log('Going to page:', page); 
    this.currentPage = page;
    this.fetchNutritionHistory(page);
  }
}