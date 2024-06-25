import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { WorkoutsService } from '../../../services/workouts/workouts.service';
import { WorkoutExerciseDetails } from '../../../models/workoutExerciseDetails.model';
import { Workout } from '../../../models/workout.model';
import { ExerciseSet } from '../../../models/exerciseSet.model';
import { makeColorPaler } from '../../../utils/color.utils';
import { forkJoin, of } from 'rxjs';
import { concatMap, catchError, tap } from 'rxjs/operators';
import { ExerciseSearchComponent } from '../exercise-search/exercise-search.component';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-details.component.html',
  styleUrls: ['./workout-details.component.css']
})
export class WorkoutDetailComponent implements OnInit, AfterViewInit {
  workoutId!: number;
  title: string = '';
  type: string = '';
  description: string = '';
  color: string = '';
  exercises: WorkoutExerciseDetails[] = [];
  editTitle: boolean = false;
  editType: boolean = false;
  editDescription: boolean = false;

  @ViewChild('titleInput') titleInput!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('typeInput') typeInput!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('descriptionInput') descriptionInput!: ElementRef<HTMLTextAreaElement>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workoutsService: WorkoutsService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.workoutId = +this.route.snapshot.paramMap.get('id')!;
    this.loadWorkoutDetails(this.workoutId);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.autoResize(this.titleInput.nativeElement);
      this.autoResize(this.typeInput.nativeElement);
      this.autoResize(this.descriptionInput.nativeElement);
    });
  }

  loadWorkoutDetails(workoutId: number): void {
    this.workoutsService.getWorkoutDetails(workoutId).subscribe((data) => {
      this.title = data.Title;
      this.type = data.Type;
      this.description = data.Description;
      this.color = data.Color;
      this.exercises = data.Exercises.map(exercise => ({
        ...exercise,
        isNew: false // Mark existing exercises as not new
      }));

      setTimeout(() => {
        this.autoResize(this.titleInput.nativeElement);
        this.autoResize(this.typeInput.nativeElement);
        this.autoResize(this.descriptionInput.nativeElement);
      });
    });
  }

  autoResize(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  onInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.autoResize(textarea);
  }

  onColorChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.color = makeColorPaler(input.value);
  }

  save(): void {
    const updatedWorkout: Workout = {
      Id: this.workoutId,
      Title: this.title,
      Color: this.color,
      Type: this.type,
      Description: this.description
    };

    this.workoutsService.updateWorkout(updatedWorkout).pipe(
      tap(response => {
        console.log('Workout updated:', response);
      }),
      concatMap(workout => {
        const newExerciseRequests = this.exercises
          .filter(exercise => exercise.isNew) // Only process new exercises
          .map((exercise, index) =>
            this.workoutsService.addExercise(exercise).pipe(
              tap(response => {
                console.log('Full add exercise response:', response);
              }),
              concatMap(response => {
                const addedExercise = response.duplicate ? response.exercise : response;
                const exerciseSet: ExerciseSet = {
                  Exercise_Id: addedExercise.Id,
                  Sets: exercise.Sets || 1, // Default to 1 if undefined
                  Reps: exercise.Reps || 1, // Default to 1 if undefined
                  Order: index + 1
                };
                return this.workoutsService.addExerciseSet(exerciseSet).pipe(
                  tap(addedExerciseSet => {
                    console.log('Exercise set added:', addedExerciseSet);
                  }),
                  concatMap(addedExerciseSet =>
                    this.workoutsService.addWorkoutExerciseSet(workout.Id, addedExercise.Id).pipe(
                      tap(addedWorkoutExerciseSet => {
                        console.log('Workout exercise set added:', addedWorkoutExerciseSet);
                      })
                    )
                  )
                );
              }),
              catchError(error => {
                console.error('Error adding exercise:', error);
                return of(null); // Continue with the next exercise
              })
            )
          );
        return forkJoin(newExerciseRequests.filter(req => req !== null)); // Filter out null requests
      })
    ).subscribe(
      () => {
        this.snackBar.open('Workout saved successfully', 'Close', {
          duration: 3000
        });
        this.router.navigate(['/workouts-list']); // Navigate back to the workouts list after saving
      },
      error => {
        console.error('Error saving workout', error);
        this.snackBar.open('Error saving workout', 'Close', {
          duration: 3000
        });
      }
    );
  }

  saveAsPDF(): void {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;
    const lineHeight = 8;
    let y = margin;
  
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(this.title, margin, y);
    y += lineHeight;
    doc.text(this.type, margin, y);
    y += lineHeight;
    doc.text(this.description, margin, y);
    y += lineHeight * 2;
  
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += lineHeight;
  
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    const exercisesTitle = 'Exercises:';
    const titleWidth = doc.getTextWidth(exercisesTitle);
    doc.text(exercisesTitle, (pageWidth - titleWidth) / 2, y);
    y += lineHeight * 1.5;
  
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
  
    this.exercises.forEach(exercise => {
      if (y + lineHeight * 4 > pageHeight - margin) { // Check if new page is needed
        doc.addPage();
        y = margin;
      }
  
      doc.setFont('helvetica', 'bold');
      doc.text(exercise.Name, margin, y);
      y += lineHeight;
  
      doc.text(exercise.Type, margin, y);
      y += lineHeight;
  
      if (exercise.Equipment && exercise.Equipment.toLowerCase() !== 'none') {
        doc.text(exercise.Equipment, margin, y);
        y += lineHeight;
      }
  
      const descriptionWidth = pageWidth - margin * 3 - 20; // Limit width for description text
      const lines = doc.splitTextToSize(exercise.Instructions, descriptionWidth);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11); // Make description font size smaller
      doc.text(lines, margin, y);
  
      const descriptionHeight = lines.length * lineHeight;
      y += descriptionHeight;
  
      doc.setFont('helvetica', 'bold');
      const setsRepsY = y - descriptionHeight; // Align sets/reps with the top of the description
      doc.text(`Sets: ${exercise.Sets}`, pageWidth - margin - 20, setsRepsY);
      doc.text(`Reps: ${exercise.Reps}`, pageWidth - margin - 20, setsRepsY + lineHeight);
  
      y += lineHeight * 0.5; // Adjust spacing after the exercise description
  
      doc.setLineWidth(0.1);
      doc.setDrawColor(150);
      doc.line(margin, y, pageWidth - margin, y);
      y += lineHeight * 0.5; // Less space after each exercise
    });
  
    doc.save(`${this.title}.pdf`);
  }


  goBack(): void {
    this.router.navigate(['/workouts-list']); // Navigate back to the workouts list discarding all changes
  }

  addExercise(): void {
    const dialogRef = this.dialog.open(ExerciseSearchComponent, {
      width: '600px',
      maxWidth: '95vw'
    });

    dialogRef.componentInstance.addExerciseEvent.subscribe((newExercise: WorkoutExerciseDetails) => {
      this.exercises.push({ ...newExercise, isNew: true }); // Mark new exercises as new
      dialogRef.close(); // Close the search component after adding the exercise
    });
  }
}