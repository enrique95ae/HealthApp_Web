import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workout } from '../../models/workout.model';
import { environment } from '../../env/env';
import { WorkoutExerciseDetails } from '../../models/workoutExerciseDetails.model';
import { ExerciseSet } from '../../models/exerciseSet.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.baseUrl}/workouts/workouts`);
  }

  addWorkout(workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(`${this.baseUrl}/workouts/workouts`, workout);
  }

  updateWorkout(workout: Workout): Observable<Workout> {
    return this.http.put<Workout>(`${this.baseUrl}/workouts/workouts/${workout.Id}`, workout);
  }

  getWorkoutDetails(id: number): Observable<{ Color: string, Description: string, Exercises: WorkoutExerciseDetails[], Id: number, Title: string, Type: string }> {
    return this.http.get<{ Color: string, Description: string, Exercises: WorkoutExerciseDetails[], Id: number, Title: string, Type: string }>(`${this.baseUrl}/workouts/workouts/${id}/details`);
  }

  addExercise(exercise: WorkoutExerciseDetails): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/workouts/exercises`, exercise);
  }

  addExerciseSet(exerciseSet: ExerciseSet): Observable<ExerciseSet> {
    return this.http.post<ExerciseSet>(`${this.baseUrl}/workouts/exercise_sets`, exerciseSet);
  }

  addWorkoutExerciseSet(workoutId: number, exerciseId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/workouts/workout_exercise_sets`, {
      Workout_Id: workoutId,
      Exercise_Id: exerciseId
    });
  }

  getExerciseSets(workoutId: number): Observable<ExerciseSet[]> {
    return this.http.get<ExerciseSet[]>(`${this.baseUrl}/workouts/${workoutId}/exercise-sets`);
  }
}
