import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkoutsService } from '../../../services/workouts/workouts.service';
import { Workout } from '../../../models/workout.model';

@Component({
  selector: 'app-workout-create',
  templateUrl: './workout-create.component.html',
  styleUrls: ['./workout-create.component.css']
})
export class WorkoutCreateComponent {
  title: string = '';
  type: string = '';
  description: string = '';
  color: string = '#000000'; // Default color
  isEditMode: boolean = false;
  workoutId: number | null = null;

  constructor(
    private workoutsService: WorkoutsService,
    private dialogRef: MatDialogRef<WorkoutCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Workout | null
  ) {
    if (data) {
      this.title = data.Title;
      this.type = data.Type;
      this.description = data.Description;
      this.color = data.Color;
      this.isEditMode = true;
      this.workoutId = data.Id;
    }
  }

  saveWorkout() {
    const workout: Workout = {
      Id: this.workoutId ?? 0,
      Title: this.title,
      Color: this.color,
      Type: this.type,
      Description: this.description
    };

    if (this.isEditMode && this.workoutId !== null) {
      this.workoutsService.updateWorkout(workout).subscribe(
        response => {
          console.log('Workout updated successfully', response);
          this.dialogRef.close(true); // Close the dialog and pass success status
        },
        error => {
          console.error('Error updating workout', error);
        }
      );
    } else {
      this.workoutsService.addWorkout(workout).subscribe(
        response => {
          console.log('Workout added successfully', response);
          this.dialogRef.close(true); // Close the dialog and pass success status
        },
        error => {
          console.error('Error adding workout', error);
        }
      );
    }
  }
}
