import { Component, Input } from '@angular/core';
import { Meal } from '../../../models/meal.model';

@Component({
  selector: 'app-meal-item',
  templateUrl: './meal-item.component.html',
  styleUrls: ['./meal-item.component.css']
})
export class MealItemComponent {
  @Input() meal!: Meal;

  formatTime(time: string, period: string): string {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes} ${period}`;
  }

  calculateTotalCalories(): number {
    return Math.round(this.meal.Foods.reduce((sum, food) => sum + (food.Calories * (food.PortionEaten / food.PortionSize)), 0));
  }
}
