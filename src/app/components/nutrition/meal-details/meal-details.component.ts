import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealsService } from '../../../services/meals/meals.service';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.css']
})
export class MealDetailsComponent implements OnInit {
  meal: any;

  constructor(
    private route: ActivatedRoute,
    private mealsService: MealsService
  ) { }

  ngOnInit(): void {
    const mealId = this.route.snapshot.paramMap.get('id');
    if (mealId) {
      this.fetchMealDetails(mealId);
    }
  }

  fetchMealDetails(mealId: string): void {
    this.mealsService.getMealDetails(mealId).subscribe({
      next: (meal) => {
        this.meal = meal;
      },
      error: (error) => {
        console.error('Failed to fetch meal details:', error);
      }
    });
  }
}
