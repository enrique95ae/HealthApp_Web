import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExerciseResultsComponent } from '../exercise-results/exercise-results.component';
import { WorkoutExerciseDetails } from '../../../models/workoutExerciseDetails.model';
import { environment } from '../../../env/env';

@Component({
  selector: 'app-exercise-search',
  templateUrl: './exercise-search.component.html',
  styleUrls: ['./exercise-search.component.css']
})
export class ExerciseSearchComponent {
  @Output() addExerciseEvent = new EventEmitter<WorkoutExerciseDetails>(); 

  muscles: string[] = [
    'abdominals', 'abductors', 'adductors', 'biceps', 'calves', 'chest', 
    'forearms', 'glutes', 'hamstrings', 'lats', 'lower_back', 'middle_back', 
    'neck', 'quadriceps', 'traps', 'triceps'
  ];

  private apiKey = environment.ninjaApiKey; 

  selectedMuscle: string = '';
  exercise: any = {
    name: '',
    type: '',
    muscle: '',
    sets: 0,
    reps: 0,
    equipment: '',
    difficulty: '',
    instructions: ''
  };

  constructor(public dialog: MatDialog, private http: HttpClient) {}

  searchExercise() {
    const headers = new HttpHeaders().set('X-Api-Key', this.apiKey);
    const url = `https://api.api-ninjas.com/v1/exercises?muscle=${this.selectedMuscle}`;
    this.http.get<any[]>(url, { headers }).subscribe(
      (results) => {
        const transformedResults: WorkoutExerciseDetails[] = results.map(result => ({
          Id: 0, 
          Name: result.name,
          Type: result.type,
          Muscle: result.muscle,
          Equipment: result.equipment,
          Difficulty: result.difficulty,
          Instructions: result.instructions,
          Reps: 0, 
          Sets: 0, 
          SetOrder: 0 
        }));

        const dialogRef = this.dialog.open(ExerciseResultsComponent, {
          width: '600px',
          data: transformedResults
        });

        dialogRef.afterClosed().subscribe(selectedExercise => {
          if (selectedExercise) {
            this.populateExercise(selectedExercise);
          }
        });
      },
      (error) => {
        console.error('Error fetching exercises', error);
      }
    );
  }

  populateExercise(exercise: WorkoutExerciseDetails): void {
    this.exercise.name = exercise.Name;
    this.exercise.type = exercise.Type;
    this.exercise.muscle = exercise.Muscle;
    this.exercise.equipment = exercise.Equipment;
    this.exercise.difficulty = exercise.Difficulty;
    this.exercise.instructions = exercise.Instructions;
    this.exercise.sets = exercise.Sets;
    this.exercise.reps = exercise.Reps;
  }

  addExercise() {
    const newExercise: WorkoutExerciseDetails = {
      Id: 0, 
      Name: this.exercise.name,
      Type: this.exercise.type,
      Muscle: this.exercise.muscle,
      Equipment: this.exercise.equipment,
      Difficulty: this.exercise.difficulty,
      Instructions: this.exercise.instructions,
      Reps: this.exercise.reps,
      Sets: this.exercise.sets,
      SetOrder: 0 
    };

    this.addExerciseEvent.emit(newExercise); 
  }
}