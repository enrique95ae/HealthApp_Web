import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { FoodsService } from '../../../services/foods/foods.service';
import { Food } from '../../../models/meal.model';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {
  @Input() food!: Food;
  @Output() validFood = new EventEmitter<boolean>();
  @Output() foodChange = new EventEmitter<Food>();

  foodNameControl: FormControl;
  portionEatenControl: FormControl;
  suggestions: Food[] = [];

  constructor(private foodsService: FoodsService) {
    this.foodNameControl = new FormControl('');
    this.portionEatenControl = new FormControl('');
  }

  ngOnInit(): void {
    this.foodNameControl.setValue(this.food.Name);
    this.portionEatenControl.setValue(this.food.PortionEaten);

    this.foodNameControl.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      if (value !== null) {
        console.log('Food name control value changed:', value);
        this.foodsService.getFoodSuggestions(value).subscribe(suggestions => {
          this.suggestions = suggestions;
          console.log('Food suggestions received:', suggestions);
        });
      }
      this.food.Name = value || '';
      this.foodChange.emit(this.food);
      this.validateFood();
    });

    this.portionEatenControl.valueChanges.pipe(debounceTime(1000)).subscribe(value => {
      const portion = value !== null ? parseFloat(value) : 0;
      this.food.PortionEaten = portion;
      console.log('Portion eaten control value changed:', value);
      this.foodChange.emit(this.food);
      this.validateFood();
    });
  }

  selectSuggestion(suggestion: Food): void {
    this.food = suggestion;
    this.foodNameControl.setValue(suggestion.Name);
    console.log('Suggestion selected:', suggestion);
    this.foodsService.getFoodDetails(suggestion.Id).subscribe(foodDetails => {
      this.food = { ...this.food, ...foodDetails };
      console.log('Food details received:', foodDetails);
      this.foodChange.emit(this.food);
      this.suggestions = [];
      this.validateFood();
    });
  }

  validateFood(): void {
    const isValid = this.foodNameControl.valid && this.portionEatenControl.valid && !!this.food.Name && !!this.food.PortionEaten;
    console.log('Food validation:', isValid);
    this.validFood.emit(isValid);
  }
}