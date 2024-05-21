import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { NutritionComponent } from './components/nutrition/nutrition/nutrition.component';
import { WorkoutsComponent } from './components/workouts/workouts/workouts.component';
import { MoreComponent } from './components/more/more/more.component';
import { CreateAccountComponent } from './components/general/createAccount/create-account/create-account.component';
import { CreateFoodComponent } from './components/nutrition/create-food/create-food.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'nutrition', component: NutritionComponent },
  { path: 'workouts', component: WorkoutsComponent },
  { path: 'more', component: MoreComponent },  
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'create-food', component: CreateFoodComponent}
];
    