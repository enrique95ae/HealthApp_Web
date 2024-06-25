import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-summary-doughnut',
  templateUrl: './summary-doughnut.component.html',
  styleUrls: ['./summary-doughnut.component.css']
})
export class SummaryDoughnutComponent implements OnInit {
  @Input() totalCalories: number = 1000;
  @Input() totalFat: number = 500;
  @Input() totalProtein: number = 250;
  @Input() totalCarbs: number = 250;
  @Input() consumedFat: number = 100;
  @Input() consumedProtein: number = 100;
  @Input() consumedCarbs: number = 100;
  @Input() title: string = '';

  @ViewChild('doughnutCanvas', { static: true }) doughnutCanvas!: ElementRef<HTMLCanvasElement>;

  private originalConsumedFat!: number;
  private originalConsumedProtein!: number;
  private originalConsumedCarbs!: number;

  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,  // Disable the default legend
      },
      datalabels: {
        color: 'white',
        font: {
          weight: 'bold',
          size: 14,
        },
        textStrokeColor: 'black',
        textStrokeWidth: 2,
        anchor: 'center',
        align: 'center',
        formatter: (value, context) => {
          const labels = context.chart.data.labels;
          if (labels) {
            const label = labels[context.dataIndex] as string;
            const data = context.dataset.data as number[];
            const isTotalSegment = context.dataIndex % 2 === 0;
            const adjacentIndex = isTotalSegment ? context.dataIndex + 1 : context.dataIndex - 1;

            if (data[adjacentIndex] !== undefined && data[context.dataIndex] > data[adjacentIndex]) {
              if (label.includes('Protein')) {
                return 'Protein';
              } else if (label.includes('Carbs')) {
                return 'Carbs';
              } else if (label.includes('Fat')) {
                return 'Fat';
              }
            }
          }
          return '';
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw as number;
            let originalConsumedAmount = 0;
            let totalAmount = 0;

            switch (label) {
              case 'Consumed Fat':
                originalConsumedAmount = this.originalConsumedFat;
                totalAmount = this.totalFat;
                break;
              case 'Consumed Protein':
                originalConsumedAmount = this.originalConsumedProtein;
                totalAmount = this.totalProtein;
                break;
              case 'Consumed Carbs':
                originalConsumedAmount = this.originalConsumedCarbs;
                totalAmount = this.totalCarbs;
                break;
              default:
                originalConsumedAmount = 0;
                totalAmount = 0;
                break;
            }

            return [`${label}: ${originalConsumedAmount} grams`, `Goal amount: ${totalAmount} grams`];
          },
        },
      },
    },
  };

  ngOnInit(): void {
    this.originalConsumedFat = this.consumedFat;
    this.originalConsumedProtein = this.consumedProtein;
    this.originalConsumedCarbs = this.consumedCarbs;

    this.createChart();
  }

  createChart(): void {
    const canvas = this.doughnutCanvas.nativeElement;
    const colors = ['#FF6384', '#36A2EB', '#FFCE56'];
    const fadedColors = colors.map(color => this.fadeColor(color, 0.3));

    const cappedConsumedFat = Math.min(this.consumedFat, this.totalFat);
    const cappedConsumedProtein = Math.min(this.consumedProtein, this.totalProtein);
    const cappedConsumedCarbs = Math.min(this.consumedCarbs, this.totalCarbs);

    const totalData = [
      this.totalFat - cappedConsumedFat,
      this.totalProtein - cappedConsumedProtein,
      this.totalCarbs - cappedConsumedCarbs
    ];

    const consumedData = [
      cappedConsumedFat,
      cappedConsumedProtein,
      cappedConsumedCarbs
    ];

    const data = [];
    const backgroundColor = [];

    for (let i = 0; i < totalData.length; i++) {
      data.push(totalData[i]);
      backgroundColor.push(fadedColors[i]);
      data.push(consumedData[i]);
      backgroundColor.push(colors[i]);
    }

    new Chart(canvas, {
      type: this.doughnutChartType,
      data: {
        labels: ['Total Fat', 'Consumed Fat', 'Total Protein', 'Consumed Protein', 'Total Carbs', 'Consumed Carbs'],
        datasets: [{
          data: data,
          backgroundColor: backgroundColor,
          hoverBackgroundColor: backgroundColor,
          borderWidth: 1,
        }]
      },
      options: this.doughnutChartOptions
    });
  }

  fadeColor(color: string, percent: number): string {
    const num = parseInt(color.replace("#", ""), 16);
    const R = (num >> 16) + Math.round((255 - (num >> 16)) * percent);
    const G = (num >> 8 & 0x00FF) + Math.round((255 - (num >> 8 & 0x00FF)) * percent);
    const B = (num & 0x0000FF) + Math.round((255 - (num & 0x0000FF)) * percent);
    return `rgba(${R},${G},${B},${percent})`;
  }
}
