import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit, OnChanges {
  @Input() label: string = '';
  @Input() totalAmount: number = 100;
  @Input() progressAmount: number = 0;
  @Input() color: string = '#268040';

  progressPercentage: number = 0;

  ngOnInit(): void {
    this.calculateProgressPercentage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalAmount'] || changes['progressAmount']) {
      this.calculateProgressPercentage();
    }
  }

  calculateProgressPercentage(): void {
    if (this.totalAmount > 0) {
      this.progressPercentage = (this.progressAmount / this.totalAmount) * 100;
    } else {
      this.progressPercentage = 0;
    }
  }
}
