export interface Food {
  Id: number;
  Name: string;
  PortionEaten: number;
  PortionSize: number;
  Calories: number;
  TotalFat: number;
  SaturatedFat: number;
  Cholesterol: number;
  Sodium: number;
  TotalCarbs: number;
  DietaryFiber: number;
  Sugars: number;
  Proteins: number;
}

export interface Meal {
  Id: number;
  CreationDate: string;
  CreationTime: string;  
  HourPeriod: string;  
  Title: string;
  Score: number;
  Foods: Food[];
  totalCalories?: number;  
}