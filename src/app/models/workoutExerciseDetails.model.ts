export interface WorkoutExerciseDetails {
  Id: number;
  Name: string;
  Type: string;
  Muscle: string;
  Equipment: string;
  Difficulty: string;
  Instructions: string;
  Reps: number;
  Sets: number;
  SetOrder: number;
  isNew?: boolean; 
}