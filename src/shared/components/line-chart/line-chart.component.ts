import {
  AfterViewInit,
  Attribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Chart, ChartOptions, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() datasetX: number[] = [];
  @Input() datasetY: number[] = [];

  @ViewChild('lineChart') donut!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;
  private readonly options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(
    @Attribute('labelX') private labelX: string,
    @Attribute('labelY') private labelY: string,
  ) {}


  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datasetX']?.currentValue?.length || changes['datasetY']?.currentValue?.length) {
      this.updateChart();
    }
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

  private updateChart(): void {
    if (this.chart) {
      this.chart.data.datasets[0].data = this.datasetX;
      this.chart.data.datasets[1].data = this.datasetY;
      this.chart.update();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
