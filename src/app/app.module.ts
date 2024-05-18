import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/general/header/header.component';
import { HomeComponent } from './components/home/home/home.component';
import { NutritionComponent } from './components/nutrition/nutrition/nutrition.component';
import { WorkoutsComponent } from './components/workouts/workouts/workouts.component';
import { MoreComponent } from './components/more/more/more.component';
import { MealItemComponent } from './components/home/meal-item/meal-item.component';
import { MealListComponent } from './components/home/meal-list/meal-list.component';
import { SummaryComponent } from './components/home/summary/summary.component';
import { SummaryDoughnutComponent } from './components/home/summary-doughnut/summary-doughnut.component';
import { ProgressionComponent } from './components/home/progression/progression.component';
import { SignInComponent } from './components/general/sign-in/sign-in.component';
import { UserComponent } from './components/home/user/user.component';

import { AuthService } from './services/auth/auth.service';
import { UsersService } from './services/users/users.service';
import { MealsService } from './services/meals/meals.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'nutrition', component: NutritionComponent },
  { path: 'workouts', component: WorkoutsComponent },
  { path: 'more', component: MoreComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NutritionComponent,
    WorkoutsComponent,
    MoreComponent,
    MealItemComponent,
    MealListComponent,
    SummaryComponent,
    SummaryDoughnutComponent,
    ProgressionComponent,
    SignInComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, UsersService, MealsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
