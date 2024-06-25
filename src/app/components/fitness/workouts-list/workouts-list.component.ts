import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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

  constructor(private workoutsService: WorkoutsService, private router: Router, public dialog: MatDialog) { }

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

  openDialog(workout: WorkoutWithAddNew): void {
    if (workout.isAddNew) {
      const dialogRef = this.dialog.open(WorkoutCreateComponent, {
        width: '400px',
        maxWidth: '95vw',
        disableClose: true, // Disable closing on backdrop click
        data: null
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadWorkouts(); // Reload workouts if a new one was added or an existing one was modified
        }
      });
    } else {
      this.router.navigate(['/workout', workout.Id]);
    }
  }
}