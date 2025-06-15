import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { IForecast } from '@core/types/forecast.interface';
import { ThemeStoreService } from '@core/providers/theme-store.service';
import { CardComponent } from '@shared/components/card/card.component';
import { TemperatureConverterPipe } from '@shared/pipes/temperature-converter.pipe';
import { ForecastCardService } from '@pages/home/components/forecast-card/providers/forecast-card.service';

@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html',
  standalone: true,
  imports: [NgIf, DatePipe, CardComponent, TemperatureConverterPipe],
  providers: [ForecastCardService],
})
export class ForecastCardComponent implements OnInit, OnChanges {
  @Input() forecast: IForecast | null = null;

  isCelsius = true;
  averageTemperature: number | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private themeStore: ThemeStoreService,
    private forecastCardService: ForecastCardService,
  ) {}

  ngOnInit(): void {
    this.themeStore.isCelsius$.pipe(
      takeUntil(this.destroy$),
    ).subscribe({
      next: (isCelsius: boolean) => (this.isCelsius = isCelsius),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['forecast'] && changes['forecast']?.currentValue) {
      this.averageTemperature = this.forecastCardService.getAverageTemperature(changes['forecast']?.currentValue);
    }
  }
}
