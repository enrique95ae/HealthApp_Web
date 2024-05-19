import { Component, OnInit } from '@angular/core';
import { FoodsService } from '../../../services/foods/foods.service';
import { Food } from '../../../models/meal.model';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent implements OnInit {
  mealTitle: string = '';
  mealTimeHour: number | null = null;
  mealTimeMinute: number | null = null;
  mealTimePeriod: string = 'AM';
  foods: Food[] = [];
  isFoodValid: boolean = false;
  totalCalories: number = 0;
  totalProteins: number = 0;
  totalCarbs: number = 0;
  totalFats: number = 0;

  constructor(private foodsService: FoodsService) {}

  ngOnInit(): void {
    this.initializeFoodComponent(); // Ensure one empty food component on load
    console.log('Initial empty food component added:', this.foods);
  }

  onFoodValidityChange(isValid: boolean): void {
    this.isFoodValid = isValid;
    console.log('Food validity changed:', isValid);
  }

  onPortionEatenChange(portion: number, index: number): void {
    if (this.foods[index]) {
      this.foods[index].PortionEaten = portion;
      console.log('Portion eaten changed:', portion, 'for food at index:', index);
      this.updateMealSummary();
    }
  }

  onFoodNameChange(food: Food, index: number): void {
    if (this.foods[index]) {
      this.foods[index] = food;
      console.log('Food name changed:', food, 'at index:', index);
      this.foods = [...this.foods]; // Create a new array reference
      this.updateMealSummary();
    }
  }

  addFoodComponent(): void {
    if (this.isLatestFoodValid()) {
      this.foods.push({ Id: 0, Name: '', PortionEaten: 0, PortionSize: 0, Calories: 0, TotalFat: 0, SaturatedFat: 0, Cholesterol: 0, Sodium: 0, TotalCarbs: 0, DietaryFiber: 0, Sugars: 0, Proteins: 0 });
      console.log('New food component added:', this.foods);
    } else {
      console.log('Latest food component is not valid yet. No new food added.');
    }
  }

  initializeFoodComponent(): void {
    this.foods = [{ Id: 0, Name: '', PortionEaten: 0, PortionSize: 0, Calories: 0, TotalFat: 0, SaturatedFat: 0, Cholesterol: 0, Sodium: 0, TotalCarbs: 0, DietaryFiber: 0, Sugars: 0, Proteins: 0 }];
  }

  isLatestFoodValid(): boolean {
    const latestFood = this.foods[this.foods.length - 1];
    return latestFood && latestFood.Name.trim() !== '' && latestFood.PortionEaten > 0;
  }

  updateMealSummary(): void {
    console.log('Updating meal summary with foods:', this.foods);
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
  }
}
