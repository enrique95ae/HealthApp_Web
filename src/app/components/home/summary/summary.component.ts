import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @Input() macrosData: any;
  bmr: number = 0;
  consumedCalories: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.fetchBMR();
    this.calculateConsumedCalories();
  }

  fetchBMR(): void {
    const storedBmr = localStorage.getItem('bmr');
    console.log('STORED: ' + storedBmr);
    if (storedBmr) {
      const parsedBmr = JSON.parse(storedBmr);
      console.log('PARSED: ' + parsedBmr.bmr);
      this.bmr = parsedBmr.bmr || 0; // Safely accessing the bmr property
      console.log('BMR: ' + this.bmr);
    }
  }

  calculateConsumedCalories(): void {
    if (this.macrosData) {
      const { consumedProtein, consumedCarbs, consumedFat } = this.macrosData;
      this.consumedCalories = (4 * consumedProtein) + (4 * consumedCarbs) + (9 * consumedFat);
      console.log('Consumed Calories: ' + this.consumedCalories);
    }
  }
}