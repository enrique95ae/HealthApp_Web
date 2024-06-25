import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-workout-card',
  templateUrl: './workout-card.component.html',
  styleUrls: ['./workout-card.component.css']
})
export class WorkoutCardComponent {
  @Input() title: string = '';
  @Input() type: string = '';
  @Input() description: string = '';
  @Input() backgroundColor: string = 'white';
  @Input() isAddNew: boolean = false;
}