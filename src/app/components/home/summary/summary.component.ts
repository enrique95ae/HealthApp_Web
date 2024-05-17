import { Component, OnInit } from '@angular/core';
import { SummaryDoughnutComponent } from '../summary-doughnut/summary-doughnut.component';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [SummaryDoughnutComponent],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  doughnutData1: [string, number][] = [
    ['Label 1', 30],
    ['Label 2', 70],
    ['Label 3', 50],
    ['Label 4', 20]
  ];

  doughnutData2: [string, number][] = [
    ['Label A', 40],
    ['Label B', 60],
    ['Label C', 80],
    ['Label D', 10]
  ];

  constructor() { }

  ngOnInit(): void { }
}
