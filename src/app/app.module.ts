import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlatpickrModule } from 'angularx-flatpickr';

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
import { AddMealComponent } from './components/nutrition/add-meal/add-meal.component';
import { MealSummaryComponent } from './components/nutrition/meal-summary/meal-summary.component';
import { AddFoodComponent } from './components/nutrition/add-food/add-food.component';
import { ErrorPopupComponent } from './components/general/error/error-popup/error-popup.component';
import { CreateAccountComponent } from './components/general/createAccount/create-account/create-account.component';
import { CreateFoodComponent } from './components/nutrition/create-food/create-food.component';
import { SearchFoodOnlineComponent } from './components/nutrition/search-food-online/search-food-online.component';
import { FoodCardComponent } from './components/nutrition/food-card/food-card.component';
import { MealDetailsComponent } from './components/nutrition/meal-details/meal-details.component';
import { UserEditComponent } from './components/home/user-edit/user-edit.component';
import { NutritionHistoryComponent } from './components/nutrition/nutrition-history/nutrition-history.component';
import { NutritionHistoryItemComponent } from './components/nutrition/nutrition-history-item/nutrition-history-item.component';
import { ProgressBarComponent } from './components/general/progress-bar/progress-bar.component';
import { ScheduleComponent } from './components/fitness/schedule/schedule.component';
import { CalendarComponent } from './components/fitness/calendar/calendar.component';
import { CalendarActivitiesListComponent } from './components/fitness/calendar-activities-list/calendar-activities-list.component';

import { AuthService } from './services/auth/auth.service';
import { UsersService } from './services/users/users.service';
import { MealsService } from './services/meals/meals.service';
import { FoodsService } from './services/foods/foods.service';
import { CommonModule } from '@angular/common';
import { CalendarActivityComponent } from './components/fitness/calendar-activity/calendar-activity.component';
import { WorkoutCardComponent } from './components/fitness/workout-card/workout-card.component';
import { WorkoutsListComponent } from './components/fitness/workouts-list/workouts-list.component';
import { WorkoutsService } from './services/workouts/workouts.service';
import { WorkoutCreateComponent } from './components/fitness/workout-create/workout-create.component';
import { ConfirmationDialogComponent } from './components/general/confirmation-dialog/confirmation-dialog.component';
import { WorkoutDetailComponent } from './components/fitness/workout-details/workout-details.component';
import { ExerciseCardComponent } from './components/fitness/exercise-card/exercise-card.component';
import { ExerciseSearchComponent } from './components/fitness/exercise-search/exercise-search.component';
import { ExerciseResultsComponent } from './components/fitness/exercise-results/exercise-results.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'nutrition', component: NutritionComponent },
  { path: 'workouts', component: WorkoutsComponent },
  { path: 'more', component: MoreComponent },
  { path: 'add-meal', component: AddMealComponent }, 
  { path: 'history', component: NutritionHistoryComponent },
  { path: 'create-account', component: CreateAccountComponent},
  { path: 'create-food', component: CreateFoodComponent},
  { path: 'search-food-online', component: SearchFoodOnlineComponent},
  { path: 'meal-details/:id', component: MealDetailsComponent},
  { path: 'schedule', component: ScheduleComponent},
  { path: 'workouts-list', component: WorkoutsListComponent },
  { path: 'workout/:id', component: WorkoutDetailComponent },
  { path: 'create', component: WorkoutCreateComponent }
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
    UserComponent,
    MealSummaryComponent,
    AddMealComponent,
    AddFoodComponent,
    ErrorPopupComponent,
    CreateAccountComponent,
    CreateFoodComponent,
    SearchFoodOnlineComponent,
    MealDetailsComponent,
    FoodCardComponent,
    UserEditComponent,
    NutritionHistoryComponent,
    NutritionHistoryItemComponent,
    ProgressBarComponent,
    ScheduleComponent,
    CalendarComponent,
    CalendarActivitiesListComponent,
    CalendarActivityComponent,
    WorkoutCardComponent,
    WorkoutsListComponent,
    WorkoutCreateComponent,
    ConfirmationDialogComponent, 
    WorkoutDetailComponent,
    ExerciseCardComponent,
    ExerciseSearchComponent,
    ExerciseResultsComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
    DragDropModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [AuthService, UsersService, MealsService,  FoodsService, WorkoutsService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }