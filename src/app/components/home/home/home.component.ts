import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{

      progressionData: { label: string, data: number[] }[] = [
    { label: 'Jan', data: [10] },
    { label: 'Feb', data: [20] },
    { label: 'Mar', data: [30] },
    { label: 'Apr', data: [40] }
  ];

    constructor() { }

  ngOnInit(): void { }
}
