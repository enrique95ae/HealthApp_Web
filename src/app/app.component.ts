import { Component } from '@angular/core';
import { RouterOutlet, provideRouter, Routes } from '@angular/router';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';

import { HeaderComponent } from './components/general/header/header.component';
import { HomeComponent } from './components/home/home/home.component';
import { NutritionComponent } from './components/nutrition/nutrition/nutrition.component';
import { WorkoutsComponent } from './components/workouts/workouts/workouts.component';
import { MoreComponent } from './components/more/more/more.component';
import { MealItemComponent } from './components/home/meal-item/meal-item.component';
import { MealListComponent } from './components/home/meal-list/meal-list.component';
import { SummaryComponent } from './components/home/summary/summary.component';
import { SummaryDoughnutComponent } from './components/home/summary-doughnut/summary-doughnut.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'nutrition', component: NutritionComponent },
  { path: 'workouts', component: WorkoutsComponent },
  { path: 'more', component: MoreComponent },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    HeaderComponent,
    HomeComponent,
    NutritionComponent,
    WorkoutsComponent,
    MoreComponent,
    MealItemComponent,
    MealListComponent,
    SummaryComponent,
    SummaryDoughnutComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HealthAppWeb';
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient()
  ]
});
