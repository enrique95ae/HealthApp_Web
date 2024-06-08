import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WorkoutExerciseDetails } from '../../../models/workoutExerciseDetails.model';

@Component({
  selector: 'app-exercise-results',
  templateUrl: './exercise-results.component.html',
  styleUrls: ['./exercise-results.component.css']
})
export class ExerciseResultsComponent {
  constructor(
    public dialogRef: MatDialogRef<ExerciseResultsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WorkoutExerciseDetails[]
  ) {}

  selectExercise(exercise: WorkoutExerciseDetails): void {
    this.dialogRef.close(exercise);
  }
}
