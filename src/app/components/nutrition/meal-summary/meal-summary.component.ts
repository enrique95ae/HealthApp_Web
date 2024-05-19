import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Food } from '../../../models/meal.model';

@Component({
  selector: 'app-meal-summary',
  templateUrl: './meal-summary.component.html',
  styleUrls: ['./meal-summary.component.css']
})
export class MealSummaryComponent implements OnChanges {
  @Input() foods: Food[] = [];

  totalCalories: number = 0;
  totalProteins: number = 0;
  totalCarbs: number = 0;
  totalFats: number = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['foods']) {
      console.log('Foods input changed:', this.foods);
      this.updateMealSummary();
    }
  }

  updateMealSummary(): void {
    this.totalCalories = this.foods.reduce((acc, food) => acc + (food.Calories * (food.PortionEaten / 100)), 0);
    this.totalProteins = this.foods.reduce((acc, food) => acc + (food.Proteins * (food.PortionEaten / 100)), 0);
    this.totalCarbs = this.foods.reduce((acc, food) => acc + (food.TotalCarbs * (food.PortionEaten / 100)), 0);
    this.totalFats = this.foods.reduce((acc, food) => acc + (food.TotalFat * (food.PortionEaten / 100)), 0);
    console.log('Meal summary updated:', {
      totalCalories: this.totalCalories,
      totalProteins: this.totalProteins,
      totalCarbs: this.totalCarbs,
      totalFats: this.totalFats
    });
    this.cdr.detectChanges(); // Manually trigger change detection
  }
}
