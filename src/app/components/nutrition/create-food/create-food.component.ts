import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FoodsService } from '../../../services/foods/foods.service';

@Component({
  selector: 'app-create-food',
  templateUrl: './create-food.component.html',
  styleUrls: ['./create-food.component.css']
})
export class CreateFoodComponent {
  food = {
    Name: '',
    PortionSize: 100,
    Calories: null,
    TotalFat: null,
    SaturatedFat: null,
    Sodium: null,
    TotalCarbs: null,
    DietaryFiber: null,
    Sugars: null,
    Proteins: null,
    Cholesterol: null
  };

  constructor(private foodsService: FoodsService, private router: Router) {}

  onSubmit() {
    if (this.isValidForm()) {
      this.foodsService.createFood(this.food).subscribe({
        next: () => {
          alert('Food created successfully!');
          this.router.navigate(['/']); // Navigate to the home page
        },
        error: (error) => {
          alert('Failed to create food: ' + error.message);
        }
      });
    }
  }

  isValidForm() {
    return Object.values(this.food).every(value => value !== null && value !== '');
  }

  populateFoodFields(food: any) {
    this.food.Name = food.name;
    this.food.PortionSize = food.serving_size_g;
    this.food.Calories = food.calories;
    this.food.TotalFat = food.fat_total_g;
    this.food.SaturatedFat = food.fat_saturated_g;
    this.food.Sodium = food.sodium_mg;
    this.food.TotalCarbs = food.carbohydrates_total_g;
    this.food.DietaryFiber = food.fiber_g;
    this.food.Sugars = food.sugar_g;
    this.food.Proteins = food.protein_g;
    this.food.Cholesterol = food.cholesterol_mg;
  }
}
