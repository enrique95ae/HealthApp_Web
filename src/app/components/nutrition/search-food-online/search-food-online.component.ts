import { Component, EventEmitter, Output } from '@angular/core';
import { NinjaFoodsService } from '../../../services/foods/ninja-foods.service';

@Component({
  selector: 'app-search-food-online',
  templateUrl: './search-food-online.component.html',
  styleUrls: ['./search-food-online.component.css']
})
export class SearchFoodOnlineComponent {
  searchQuery: string = '';
  searchResults: any[] = [];
  noResults: boolean = false;

  @Output() foodSelected = new EventEmitter<any>();

  constructor(private ninjaFoodsService: NinjaFoodsService) {}

  onSearch() {
    if (this.searchQuery.length > 2) {
      this.ninjaFoodsService.getFoodSuggestions(this.searchQuery).subscribe({
        next: (data) => {
          this.searchResults = data;
          if (this.searchResults.length > 0) {
            this.foodSelected.emit(this.searchResults[0]);
            this.noResults = false;
          } else {
            this.noResults = true;
          }
        },
        error: (error) => {
          console.error('Failed to get food suggestions:', error);
          this.noResults = true;
        }
      });
    } else {
      this.noResults = false;
    }
  }
}
