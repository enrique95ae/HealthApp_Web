import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar-activities-list',
  templateUrl: './calendar-activities-list.component.html',
  styleUrls: ['./calendar-activities-list.component.css']
})
export class CalendarActivitiesListComponent {
  activities = [
    { name: 'Workout' },
    { name: 'Yoga' },
    { name: 'Running' },
    { name: 'Cycling' },
    { name: 'Swimming' }
  ];

  onDragStart(event: DragEvent, activity: any): void {
    event.dataTransfer?.setData('activity', JSON.stringify(activity));
  }
}