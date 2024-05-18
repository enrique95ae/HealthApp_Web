import { Component } from '@angular/core';

interface Food {
  foodName: string;
  portionSize: number;
}

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent {
  mealTitle: string = '';
  mealTime: string = '';
  mealPeriod: string = 'AM';
  mealRating: number = 1;
  ratings: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  foods: Food[] = [];

  convertTo12HourFormat(): void {
    const [hours, minutes] = this.mealTime.split(':').map(Number);
    let hours12 = hours % 12;
    if (hours12 === 0) {
      hours12 = 12;
    }
    this.mealPeriod = hours >= 12 ? 'PM' : 'AM';
    this.mealTime = `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  addFood(): void {
    if (this.foods.length === 0 || this.foods[this.foods.length - 1].foodName.trim() !== '' && this.foods[this.foods.length - 1].portionSize > 0) {
      this.foods.push({ foodName: '', portionSize: 0 });
    } else {
      alert('Please fill in the previous food item completely before adding a new one.');
    }
  }
}
