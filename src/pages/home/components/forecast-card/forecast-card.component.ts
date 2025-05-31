import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { IForecast } from '@pages/home/types/forecast.interface';
import { ThemeStoreService } from '@core/providers/theme-store.service';
import { CardComponent } from '@shared/components/card/card.component';
import { TemperatureConverterPipe } from '@shared/pipes/temperature-converter.pipe';

@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html',
  standalone: true,
  imports: [CardComponent, DatePipe, TemperatureConverterPipe],
})
export class ForecastCardComponent implements OnInit, OnDestroy {
  @Input() forecast!: IForecast;

  isCelsius = true;
  private destroy$ = new Subject<void>();

  get averageTemperature(): number {
    return (
      (parseFloat(this.forecast.Temperature.Minimum.Value) +
        parseFloat(this.forecast.Temperature.Maximum.Value)) /
      2
    );
  }

  constructor(private themeStore: ThemeStoreService) {}

  ngOnInit(): void {
    this.themeStore.isCelsius$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isCelsius) => (this.isCelsius = isCelsius));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
