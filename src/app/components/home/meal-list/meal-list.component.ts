import { Component } from '@angular/core';
import { MealItemComponent } from "../meal-item/meal-item.component";

@Component({
    selector: 'app-meal-list',
    standalone: true,
    templateUrl: './meal-list.component.html',
    styleUrl: './meal-list.component.css',
    imports: [MealItemComponent]
})
export class MealListComponent {

}
