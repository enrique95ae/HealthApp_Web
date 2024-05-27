import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

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

@Component({
  selector: 'app-nutrition-history-item',
  templateUrl: './nutrition-history-item.component.html',
  styleUrls: ['./nutrition-history-item.component.css']
})
export class NutritionHistoryItemComponent implements OnInit, OnChanges {
  @Input() item!: NutritionHistoryItem;

  constructor(private router: Router) {
    console.log('Constructor Item:', this.item);  // Debugging statement
  }

  ngOnInit(): void {
    console.log('OnInit Item:', this.item);  // Debugging statement
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item']) {
      console.log('OnChanges Item:', changes['item'].currentValue);  // Debugging statement
    }
  }

  getTotalCalories(): string {
    return this.item.Foods.reduce((total, food) => total + food.Calories, 0).toFixed(0);
  }

  getTotalProteins(): string {
    return this.item.Foods.reduce((total, food) => total + food.Proteins, 0).toFixed(2);
  }

  getTotalCarbs(): string {
    return this.item.Foods.reduce((total, food) => total + food.TotalCarbs, 0).toFixed(2);
  }

  getTotalFats(): string {
    return this.item.Foods.reduce((total, food) => total + food.TotalFat, 0).toFixed(2);
  }

  seeDetails(): void {
    this.router.navigate(['/meal-details', this.item.Id]);
  }
}
