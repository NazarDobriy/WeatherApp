import { Attribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatTooltip } from "@angular/material/tooltip";
import { NgOptimizedImage } from "@angular/common";

import { IForecastPhase } from "@core/types/forecast.interface";

@Component({
  selector: 'app-forecast-phase',
  imports: [NgOptimizedImage, MatTooltip],
  templateUrl: './forecast-phase.component.html',
  styleUrl: './forecast-phase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastPhaseComponent {
  readonly forecastPhase = input.required<IForecastPhase>();

  constructor(@Attribute('phase') public phase: string) {}

}
