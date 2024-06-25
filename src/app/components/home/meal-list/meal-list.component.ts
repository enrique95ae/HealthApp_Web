import { Component, OnInit } from '@angular/core';
import { MealsService } from '../../../services/meals/meals.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Meal } from '../../../models/meal.model';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css']
})
export class MealListComponent implements OnInit {
  meals: Meal[] = [];

  constructor(private mealsService: MealsService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userLoggedIn.subscribe(user => {
      console.log('User logged in:', user);
      this.fetchMeals(user.Id);
    });

    const userData = this.authService.getUserData();
    if (userData) {
      console.log('User already logged in:', userData);
      this.fetchMeals(userData.Id);
    }
  }

  fetchMeals(userId: number): void {
    console.log(`Fetching meals for user ID: ${userId}`);
    this.mealsService.getMealsToday(userId).subscribe({
      next: (meals) => {
        console.log('Meals data fetched from API:', meals);
        this.meals = meals
          .sort((a, b) => this.compareTimes(a.CreationTime, b.CreationTime))
          .map(meal => ({
            ...meal,
            totalCalories: Math.round(meal.Foods.reduce((sum, food) => sum + (food.Calories * (food.PortionEaten / food.PortionSize)), 0))
          }));
        console.log('Meals data assigned to component:', this.meals);
      },
      error: (error) => {
        console.error('Failed to fetch meals:', error);
      }
    });
  }

  compareTimes(timeA: string, timeB: string): number {
    const parseTime = (time: string) => {
      const [hoursMinutes, period] = time.split(' ');
      let [hours, minutes] = hoursMinutes.split(':').map(Number);
      if (period === 'PM' && hours < 12) {
        hours += 12;
      }
      if (period === 'AM' && hours === 12) {
        hours = 0;
      }
      return hours * 60 + minutes;
    };

    return parseTime(timeA) - parseTime(timeB);
  }
}