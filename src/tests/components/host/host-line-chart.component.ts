import { Component } from '@angular/core';

import { LineChartComponent } from '@shared/components/line-chart/line-chart.component';

@Component({
  imports: [LineChartComponent],
  template: `<app-line-chart [datasetX]="datasetX" [datasetY]="datasetY"></app-line-chart>`,
})
export class HostLineChartComponent {
  readonly datasetX = [4, 5, 0];
  readonly datasetY = [-2, 3, 11];
}
