import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-summary-doughnut',
  templateUrl: './summary-doughnut.component.html',
  styleUrls: ['./summary-doughnut.component.css']
})
export class SummaryDoughnutComponent implements OnInit {
  @Input() data: [string, number][] = [];
  @Input() title: string = '';

  @ViewChild('doughnutCanvas', { static: true }) doughnutCanvas!: ElementRef<HTMLCanvasElement>;

  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
  };

  ngOnInit(): void {
    this.doughnutChartLabels = this.data.map(item => item[0]);
    this.doughnutChartData = this.data.map(item => item[1]);
    this.createChart();
  }

  createChart(): void {
    const canvas = this.doughnutCanvas.nativeElement;
    new Chart(canvas, {
      type: this.doughnutChartType,
      data: {
        labels: this.doughnutChartLabels,
        datasets: [{
          data: this.doughnutChartData,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }]
      },
      options: this.doughnutChartOptions
    });
  }
}
