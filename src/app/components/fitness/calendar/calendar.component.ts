import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @ViewChild('calendarBody') calendarBody: any;
  cells: any[] = new Array(7 * 24).fill(null); 
  hours: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.generateHours();
  }

  ngAfterViewInit(): void {
    this.scrollTo6am();
  }

  generateHours(): void {
    for (let hour = 0; hour < 24; hour++) {
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const period = hour >= 12 ? 'PM' : 'AM';
      this.hours.push(`${displayHour} ${period}`);
    }
  }

  scrollTo6am(): void {
    const scrollPosition = this.calendarBody.nativeElement.scrollHeight * (6 / 24);
    this.calendarBody.nativeElement.scrollTop = scrollPosition;
  }

  onDrop(event: DragEvent, cellIndex: number): void {
    event.preventDefault();
    const activity = JSON.parse(event.dataTransfer?.getData('activity') || '{}');
    this.cells[cellIndex] = activity;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  removeActivity(cellIndex: number): void {
    this.cells[cellIndex] = null;
  }

  getCellContent(cellIndex: number): any {
    return this.cells[cellIndex];
  }
}