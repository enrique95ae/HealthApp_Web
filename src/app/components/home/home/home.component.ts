import { Component } from '@angular/core';
import { UserComponent } from "../user/user.component";
import { MealListComponent } from "../meal-list/meal-list.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [UserComponent, MealListComponent]
})
export class HomeComponent {

}
