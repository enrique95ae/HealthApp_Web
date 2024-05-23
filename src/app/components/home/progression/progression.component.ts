import { Component, Input, OnInit, ElementRef, ViewChild, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import { environment } from '../../../env/env';

Chart.register(...registerables);

@Component({
  selector: 'app-progression',
  templateUrl: './progression.component.html',
  styleUrls: ['./progression.component.css']
})
export class ProgressionComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data: { label: string, data: number[] }[] = [];
  @Input() title: string = '';
  @Input() userId!: number;
  @Input() showWeightInput = false;

  @ViewChild('lineChartCanvas', { static: true }) lineChartCanvas!: ElementRef<HTMLCanvasElement>;

  todayWeight = '';
  private baseUrl = environment.baseUrl;
  private chart!: Chart;

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        reverse: false
      },
      y: {
        beginAtZero: true
      }
    }
  };
  public lineChartType: ChartType = 'line';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.updateChart();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  createChart(): void {
    const yValues = this.data.map(d => d.data[0]);
    const minYValue = Math.min(...yValues);
    const maxYValue = Math.max(...yValues);

    const canvas = this.lineChartCanvas.nativeElement;
    this.chart = new Chart(canvas, {
      type: this.lineChartType,
      data: {
        labels: this.data.map(d => d.label),
        datasets: [{
          label: 'Body weight (kg)',
          data: yValues,
          borderColor: '#36A2EB',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true
        }]
      },
      options: {
        ...this.lineChartOptions,
        scales: {
          ...this.lineChartOptions.scales,
          y: {
            beginAtZero: true,
            min: Math.floor(minYValue) - 5,  // Set min slightly below the lowest value
            max: Math.ceil(maxYValue) + 5    // Set max slightly above the highest value
          }
        }
      }
    });
  }

  updateChart(): void {
    if (this.chart) {
      const yValues = this.data.map(d => d.data[0]);
      const minYValue = Math.min(...yValues);
      const maxYValue = Math.max(...yValues);

      this.chart.data.labels = this.data.map(d => d.label);
      this.chart.data.datasets[0].data = yValues;
      if (this.chart.options.scales && this.chart.options.scales['y']) {
        this.chart.options.scales['y'].min = Math.floor(minYValue) - 5;
        this.chart.options.scales['y'].max = Math.ceil(maxYValue) + 5;
      }
      this.chart.update();
    } else {
      this.createChart();
    }
  }

  submitWeight(): void {
    if (this.todayWeight) {
      const weight = parseFloat(this.todayWeight);
      const userId = this.userId;

      this.http.post(`${this.baseUrl}/users/weights`, { USER_Id: userId, Weight: weight }).subscribe({
        next: () => {
          this.todayWeight = '';
          this.fetchProgressionData();
          this.showWeightInput = false;
        },
        error: (error) => {
          console.error('Failed to submit today\'s weight:', error);
        }
      });
    }
  }

  fetchProgressionData(): void {
    this.http.get<{ EntryDate: string, Weight: number }[]>(`${this.baseUrl}/users/weights/${this.userId}`).subscribe({
      next: (response) => {
        if (response && Array.isArray(response)) {
          const sortedResponse = response.sort((a, b) => new Date(a.EntryDate).getTime() - new Date(b.EntryDate).getTime());
          const data = sortedResponse.map(entry => ({ label: entry.EntryDate, data: [entry.Weight] }));
          this.data = data;

          // Update user data with the most recent weight
          if (sortedResponse.length > 0) {
            const mostRecentWeight = sortedResponse[sortedResponse.length - 1].Weight;
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (user) {
              user.Weight = mostRecentWeight;
              localStorage.setItem('user', JSON.stringify(user));
            }
          }
          this.updateChart();
        } else {
          console.error('Unexpected response format:', response);
        }
      },
      error: (error) => {
        console.error('Failed to fetch progression data:', error);
      }
    });
  }
}
