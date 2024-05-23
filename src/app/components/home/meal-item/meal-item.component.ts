import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Meal } from '../../../models/meal.model';

@Component({
  selector: 'app-meal-item',
  templateUrl: './meal-item.component.html',
  styleUrls: ['./meal-item.component.css']
})
export class MealItemComponent {
  @Input() meal!: Meal;

  constructor(private router: Router) {}

  formatTime(time: string, period: string): string {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes} ${period}`;
  }

  calculateTotalCalories(): number {
    return Math.round(this.meal.Foods.reduce((sum, food) => sum + (food.Calories * (food.PortionEaten / food.PortionSize)), 0));
  }

  navigateToDetails(): void {
    this.router.navigate(['/meal-details', this.meal.Id]);
  }
}
