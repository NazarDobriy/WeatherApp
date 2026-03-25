import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { IWeather } from '@core/types/weather.interface';
import { IForecast } from '@core/types/forecast.interface';
import { IWeatherApi } from '@core/types/weather-api.interface';
import { weatherMapper } from '@core/mappers/weather.mapper';
import { IForecastApi } from '@core/types/forecast-api.interface';
import { forecastsMapper } from '@core/mappers/forecasts.mapper';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(key: string): Observable<IWeather> {
    return this.http
      .get<IWeatherApi[]>(`/currentconditions/v1/${key}`)
      .pipe(map((response: IWeatherApi[]) => weatherMapper(response[0])));
  }

  getForecasts(key: string): Observable<IForecast[]> {
    const params = new HttpParams().set('metric', true);
    return this.http
      .get<{
        DailyForecasts: IForecastApi[];
      }>(`/forecasts/v1/daily/5day/${key}`, { params })
      .pipe(map((response: { DailyForecasts: IForecastApi[] }) => forecastsMapper(response.DailyForecasts)));
  }
}
