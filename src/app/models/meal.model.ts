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
  CreationTime: string;  // Add CreationTime field
  HourPeriod: string;  // Add HourPeriod field
  Title: string;
  Score: number;
  Foods: Food[];
  totalCalories?: number;  // Optional field for calculated total calories
}
