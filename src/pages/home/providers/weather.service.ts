import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { IWeather } from '../types/weather.interface';
import { IForecast } from '../types/forecast.interface';

@Injectable()
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(key: string): Observable<IWeather> {
    return this.http
      .get<[IWeather]>(`/currentconditions/v1/${key}`)
      .pipe(map((response) => response[0]));
  }

  getForecasts(key: string): Observable<IForecast[]> {
    const params = new HttpParams().set('metric', true);
    return this.http
      .get<{ DailyForecasts: IForecast[] }>(`/forecasts/v1/daily/5day/${key}`, {
        params
      })
      .pipe(map((response) => response.DailyForecasts));
  }
}
