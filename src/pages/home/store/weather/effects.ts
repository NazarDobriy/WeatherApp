import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import * as WeatherActions from './actions';
import { WeatherService } from '@core/providers/weather.service';
import { IWeather } from '@core/types/weather.interface';
import { IForecast } from '@core/types/forecast.interface';
import { SnackBarService } from '@core/providers/snack-bar.service';
import { Notification } from '@core/constants/notification.constants';

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

  failureGetWeather$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherActions.getWeatherFailure),
      tap(() => this.snackBarService.open(Notification.ERROR_GETTING_WEATHER,'X')),
    );
  }, { dispatch: false });

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

  failureGetForecasts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherActions.getForecastsFailure),
      tap(() => this.snackBarService.open(Notification.ERROR_GETTING_FORECAST,'X')),
    );
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService,
    private snackBarService: SnackBarService,
  ) {}
}
