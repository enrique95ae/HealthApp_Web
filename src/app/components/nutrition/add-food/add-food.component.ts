import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FoodsService } from '../../../services/foods/foods.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {
  @Input() foodName: string = '';
  @Output() foodNameChange = new EventEmitter<string>();
  
  @Input() portionSize: number = 0;
  @Output() portionSizeChange = new EventEmitter<number>();

  suggestions: any[] = [];
  searchTerms = new Subject<string>();

  constructor(private foodsService: FoodsService) {}

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(300), // wait 300ms after each keystroke before considering the term
      distinctUntilChanged(), // ignore new term if same as previous term
      switchMap((term: string) => this.foodsService.searchFoods(term)), // switch to new search observable each time the term changes
    ).subscribe(data => {
      this.suggestions = data;
    });
  }

  onFoodNameInput(): void {
    this.searchTerms.next(this.foodName);
  }

  selectSuggestion(suggestion: any): void {
    this.foodName = suggestion.Name;
    this.portionSize = suggestion.PortionSize;
    this.foodNameChange.emit(this.foodName);
    this.portionSizeChange.emit(this.portionSize);
    this.suggestions = [];
  }

  isFilled(): boolean {
    return this.foodName.trim() !== '' && this.portionSize > 0;
  }
}
