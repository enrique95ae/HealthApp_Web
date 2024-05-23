import { Component, Input, OnInit, ElementRef, ViewChild, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-progression',
  templateUrl: './progression.component.html',
  styleUrls: ['./progression.component.css']
})
export class ProgressionComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data: { label: string, data: number[] }[] = [];
  @Input() title: string = '';

  @ViewChild('lineChartCanvas', { static: true }) lineChartCanvas!: ElementRef<HTMLCanvasElement>;

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        reverse: true  // Reverse the order of the x-axis
      },
      y: {
        beginAtZero: true
      }
    }
  };
  public lineChartType: ChartType = 'line';

  private chart!: Chart;

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
          label: 'Body Weight (kgs)',
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
}
