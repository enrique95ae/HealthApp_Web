import { Component, Input } from '@angular/core';
import { WorkoutExerciseDetails } from '../../../models/workoutExerciseDetails.model';

@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.css']
})
export class ExerciseCardComponent {
  @Input() exercise!: WorkoutExerciseDetails;
}
