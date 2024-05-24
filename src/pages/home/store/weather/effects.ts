import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import * as WeatherActions from './actions';
import { WeatherService } from '@pages/home/providers/weather.service';
import { IWeather } from '@pages/home/types/weather.interface';
import { IForecast } from '@pages/home/types/forecast.interface';

@Injectable()
export class WeatherEffects {
  getWeather$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherActions.getWeather),
      switchMap((action) => {
        return this.weatherService.getWeather(action.key).pipe(
          map((weather: IWeather) =>
            WeatherActions.getWeatherSuccess({ weather })
          ),
          catchError((error: Error) =>
            of(WeatherActions.getWeatherFailure({ error: error.message }))
          )
        );
      })
    );
  });

  getForecasts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherActions.getForecasts),
      switchMap((action) => {
        return this.weatherService.getForecasts(action.key).pipe(
          map((forecasts: IForecast[]) =>
            WeatherActions.getForecastsSuccess({ forecasts })
          ),
          catchError((error: Error) =>
            of(WeatherActions.getForecastsFailure({ error: error.message }))
          )
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) {}
}
