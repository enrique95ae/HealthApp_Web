import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WorkoutsService } from '../../../services/workouts/workouts.service';
import { Workout, WorkoutWithAddNew } from '../../../models/workout.model';
import { WorkoutCreateComponent } from '../workout-create/workout-create.component';

@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.component.html',
  styleUrls: ['./workouts-list.component.css']
})
export class WorkoutsListComponent implements OnInit {
  workouts: WorkoutWithAddNew[] = [];

  constructor(private workoutsService: WorkoutsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadWorkouts();
  }

  loadWorkouts(): void {
    this.workoutsService.getWorkouts().subscribe(
      (data) => {
        this.workouts = data.map(workout => ({
          ...workout,
          backgroundColor: workout.Color,
          isAddNew: false
        }));
        // Add the "Add New" card manually
        this.workouts.unshift({
          Id: 0,
          Title: '',
          Type: '',
          Description: '',
          Color: 'grey',
          isAddNew: true
        });
      },
      (error) => {
        console.error('Error fetching workouts', error);
      }
    );
  }

  openCreateWorkoutDialog(workout?: WorkoutWithAddNew): void {
    const dialogRef = this.dialog.open(WorkoutCreateComponent, {
      width: '400px',
      maxWidth: '95vw',
      disableClose: true, // Disable closing on backdrop click
      data: workout && !workout.isAddNew ? workout : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadWorkouts(); // Reload workouts if a new one was added or an existing one was modified
      }
    });
  }
}