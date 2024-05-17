import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-progression',
  standalone: true,
  templateUrl: './progression.component.html',
  styleUrls: ['./progression.component.css']
})
export class ProgressionComponent implements OnInit {
  @Input() data: { label: string, data: number[] }[] = [];
  @Input() title: string = '';

  @ViewChild('lineChartCanvas', { static: true }) lineChartCanvas!: ElementRef<HTMLCanvasElement>;

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };
  public lineChartType: ChartType = 'line';

  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
    const canvas = this.lineChartCanvas.nativeElement;
    new Chart(canvas, {
      type: this.lineChartType,
      data: {
        labels: this.data.map(d => d.label),
        datasets: [{
          label: 'Progression Data',
          data: this.data.map(d => d.data).flat(),
          borderColor: '#36A2EB',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true
        }]
      },
      options: this.lineChartOptions
    });
  }
}
