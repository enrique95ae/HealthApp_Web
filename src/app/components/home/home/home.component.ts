import { Component, OnInit } from '@angular/core';
import { UserComponent } from "../user/user.component";
import { MealListComponent } from "../meal-list/meal-list.component";
import { SummaryComponent } from "../summary/summary.component";
import { ProgressionComponent } from '../progression/progression.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [UserComponent, MealListComponent, SummaryComponent, ProgressionComponent]
})
export class HomeComponent implements OnInit{

      progressionData: { label: string, data: number[] }[] = [
    { label: 'Jan', data: [10] },
    { label: 'Feb', data: [20] },
    { label: 'Mar', data: [30] },
    { label: 'Apr', data: [40] }
  ];

    constructor() { }

  ngOnInit(): void { }
}
