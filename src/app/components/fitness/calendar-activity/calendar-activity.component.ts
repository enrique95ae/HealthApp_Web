import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calendar-activity',
  templateUrl: './calendar-activity.component.html',
  styleUrls: ['./calendar-activity.component.css']
})
export class CalendarActivityComponent {
  @Input() title: string = '';
  @Input() backgroundColor: string = '#e0e0e0';
  @Output() remove = new EventEmitter<void>();

  onRemove(): void {
    this.remove.emit();
  }
}