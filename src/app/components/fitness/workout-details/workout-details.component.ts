import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExerciseSet } from '../../../models/exerciseSet.model';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-details.component.html',
  styleUrls: ['./workout-details.component.css']
})
export class WorkoutDetailComponent implements OnInit {
  workoutId: number;
  exerciseSets: ExerciseSet[];

  constructor(
    private dialogRef: MatDialogRef<WorkoutDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.workoutId = data.workoutId;
    this.exerciseSets = data.exerciseSets;
  }

  ngOnInit(): void {
    // Fetch and display the details of the workout using this.workoutId
  }

  save() {
    this.dialogRef.close(this.exerciseSets); // Return the updated exercise sets
  }

  close() {
    this.dialogRef.close();
  }
}
