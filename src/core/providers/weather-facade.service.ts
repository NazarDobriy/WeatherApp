import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { WeatherService } from '@core/providers/weather.service';
import { IWeather } from '@core/types/weather.interface';
import { IForecast } from '@core/types/forecast.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherFacadeService {
  constructor(private weatherService: WeatherService) {}

  joinedWeather(key: string): Observable<[IWeather, IForecast[]]> {
    return forkJoin([this.weatherService.getWeather(key), this.weatherService.getForecasts(key)]);
  }
}
