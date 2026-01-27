import {
  AfterViewInit,
  Attribute,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  input,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { Chart, ChartOptions, registerables } from 'chart.js';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { skip } from "rxjs";

import { ThemeService } from "@core/providers/theme.service";
import { ThemeStoreService } from "@core/providers/theme-store.service";

Chart.register(...registerables);

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent implements AfterViewInit, OnDestroy {
  readonly datasetX = input.required<number[]>();
  readonly datasetY = input.required<number[]>();

  @ViewChild('lineChart') donut!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;
  private readonly options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(
    @Attribute('labelX') private labelX: string,
    @Attribute('labelY') private labelY: string,
    private destroyRef: DestroyRef,
    private themeService: ThemeService,
    private themeStore: ThemeStoreService,
  ) {
    effect(() => {
      if (this.datasetX().length > 0 || this.datasetY().length > 0) {
        this.updateChart();
      }
    });
  }

  ngAfterViewInit(): void {
    this.createChart();
    this.updateChartColors();
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
              data: this.datasetX(),
              borderColor: this.themeService.getCssVar('--primary-color'),
              fill: false
            },
            {
              label: this.labelY,
              data: this.datasetY(),
              borderColor: this.themeService.getCssVar('--error-color'),
              fill: false
            }
          ]
        },
        options: this.options,
      });
    }
  }

  private updateChart(): void {
    if (this.chart) {
      this.chart.data.datasets[0].data = this.datasetX();
      this.chart.data.datasets[1].data = this.datasetY();
      this.chart.update();
    }
  }

  private updateChartColors(): void {
    this.themeStore.isDarkMode$.pipe(
      skip(1),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: () => {
        if (this.chart) {
          this.chart.data.datasets[0].borderColor = this.themeService.getCssVar('--primary-color');
          this.chart.data.datasets[1].borderColor = this.themeService.getCssVar('--error-color');
          this.chart.update();
        }
      },
    });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
