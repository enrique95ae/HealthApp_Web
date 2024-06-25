import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { WorkoutsService } from '../../../services/workouts/workouts.service';
import { Workout } from '../../../models/workout.model';
import { makeColorPaler } from '../../../utils/color.utils';
import { ConfirmationDialogComponent } from '../../general/confirmation-dialog/confirmation-dialog.component';
import { WorkoutDetailComponent } from '../../fitness/workout-details/workout-details.component'; 
import { ExerciseSet } from '../../../models/exerciseSet.model';

@Component({
  selector: 'app-workout-create',
  templateUrl: './workout-create.component.html',
  styleUrls: ['./workout-create.component.css']
})
export class WorkoutCreateComponent {
  title: string = '';
  type: string = '';
  description: string = '';
  color: string = '#000000'; 
  originalColor: string = ''; 
  isEditMode: boolean = false;
  workoutId: number | null = null;
  hasUnsavedChanges: boolean = false;
  exerciseSets: ExerciseSet[] = []; 

  constructor(
    private workoutsService: WorkoutsService,
    private dialogRef: MatDialogRef<WorkoutCreateComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Workout | null
  ) {
    if (data) {
      this.title = data.Title;
      this.type = data.Type;
      this.description = data.Description;
      this.color = data.Color;
      this.originalColor = data.Color; 
      this.isEditMode = true;
      this.workoutId = data.Id;
      this.workoutsService.getExerciseSets(data.Id).subscribe(exerciseSets => {
        this.exerciseSets = exerciseSets;
      });
    }
  }

  saveWorkout() {
    let colorToUse = this.color;
    if (!this.isEditMode || this.color !== this.originalColor) {
      colorToUse = makeColorPaler(this.color);
    }

    const workout: Workout = {
      Id: this.workoutId ?? 0,
      Title: this.title,
      Color: colorToUse,
      Type: this.type,
      Description: this.description
    };

    if (this.isEditMode && this.workoutId !== null) {
      this.workoutsService.updateWorkout(workout).subscribe(
        response => {
          console.log('Workout updated successfully', response);
          this.dialogRef.close(true); 
        },
        error => {
          console.error('Error updating workout', error);
        }
      );
    } else {
      this.workoutsService.addWorkout(workout).subscribe(
        response => {
          console.log('Workout added successfully', response);
          this.dialogRef.close(true); 
        },
        error => {
          console.error('Error adding workout', error);
        }
      );
    }
  }

  onClose() {
    if (this.hasUnsavedChanges) {
      const confirmDialogRef = this.dialog.open(ConfirmationDialogComponent);

      confirmDialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.dialogRef.close(false);
        }
      });
    } else {
      this.dialogRef.close(false);
    }
  }

  openWorkoutDetail() {
    const dialogRef = this.dialog.open(WorkoutDetailComponent, {
      width: '600px',
      data: { workoutId: this.workoutId, exerciseSets: this.exerciseSets }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.exerciseSets = result; 
      }
    });
  }

  get exerciseCount(): number {
    return this.exerciseSets.length;
  }
}