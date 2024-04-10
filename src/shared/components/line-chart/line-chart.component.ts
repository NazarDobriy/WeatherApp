import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import { Chart, ChartOptions, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html'
})
export class LineChartComponent implements AfterViewInit {
  @Input() labelX = '';
  @Input() labelY = '';
  @Input() datasetX: number[] = [];
  @Input() datasetY: number[] = [];

  @ViewChild('lineChart') donut!: ElementRef;

  chart: Chart | null = null;
  private options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  ngAfterViewInit(): void {
    this.createChart();
  }

  private createChart(): void {
    const canvas: HTMLCanvasElement = this.donut.nativeElement;
    const ctx = canvas.getContext('2d');

    if (ctx != null) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['1', '2', '3', '4', '5'],
          datasets: [
            {
              label: this.labelX,
              data: this.datasetX,
              borderColor: 'rgba(255, 99, 132, 1)',
              fill: false
            },
            {
              label: this.labelY,
              data: this.datasetY,
              borderColor: 'rgba(54, 162, 235, 1)',
              fill: false
            }
          ]
        },
        options: this.options
      });
    }
  }
}
