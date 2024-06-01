import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workout } from '../../models/workout.model';
import { environment } from '../../env/env';
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

  addWorkout(workout: Workout): Observable<any> {
    return this.http.post(`${this.baseUrl}/workouts/workouts`, workout);
  }

  updateWorkout(workout: Workout): Observable<any> {
    return this.http.put(`${this.baseUrl}/workouts/workouts/${workout.Id}`, workout);
  }

  getExerciseSets(workoutId: number): Observable<ExerciseSet[]> {
    return this.http.get<ExerciseSet[]>(`${this.baseUrl}/workouts/${workoutId}/exercise-sets`);
  }
}
