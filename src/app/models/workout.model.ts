export interface Workout {
  Id: number;
  Title: string;
  Color: string;
  Description: string;
  Type: string;
}

export interface WorkoutWithAddNew extends Workout {
  isAddNew: boolean;
}