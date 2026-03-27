import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, exhaustMap, tap } from 'rxjs';

import * as WeatherActions from './actions';
import { WeatherService } from '@core/providers/weather.service';
import { IWeather } from '@core/types/weather.interface';
import { IForecast } from '@core/types/forecast.interface';
import { SnackBarService } from '@core/providers/snack-bar.service';
import { NOTIFICATION } from '@core/constants/notification.constants';
import { minLoadingTime } from '@utils/index';

@Injectable()
export class WeatherEffects {
  getWeather$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherActions.getWeather),
      switchMap(({ key }) => {
        return this.weatherService.getWeather(key).pipe(
          map((weather: IWeather) => WeatherActions.getWeatherSuccess({ weather })),
          catchError((error: Error) => of(WeatherActions.getWeatherFailure({ error: error.message }))),
        );
      }),
    );
  });

  failureGetWeather$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(WeatherActions.getWeatherFailure),
        tap(() => this.snackBarService.open(NOTIFICATION.ERROR_GETTING_WEATHER, 'X')),
      );
    },
    { dispatch: false },
  );

  getForecasts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherActions.getForecasts),
      switchMap((action) => {
        return this.weatherService.getForecasts(action.key).pipe(
          map((forecasts: IForecast[]) => WeatherActions.getForecastsSuccess({ forecasts })),
          catchError((error: Error) => of(WeatherActions.getForecastsFailure({ error: error.message }))),
        );
      }),
    );
  });

  failureGetForecasts$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(WeatherActions.getForecastsFailure),
        tap(() => this.snackBarService.open(NOTIFICATION.ERROR_GETTING_FORECAST, 'X')),
      );
    },
    { dispatch: false },
  );

  updateWeather$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherActions.updateWeather),
      exhaustMap(({ key, name }) => {
        return this.weatherService.getWeather(key).pipe(
          map((weather: IWeather) => WeatherActions.updateWeatherSuccess({ key, name, weather })),
          catchError((error: Error) =>
            of(WeatherActions.updateWeatherFailure({ key, name, error: error.message })),
          ),
          minLoadingTime(300),
        );
      }),
    );
  });

  successUpdateWeather$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(WeatherActions.updateWeatherSuccess),
        tap(({ name }) => {
          this.snackBarService.open(NOTIFICATION.SUCCESS_UPDATING_WEATHER(name), 'X');
        }),
      );
    },
    { dispatch: false },
  );

  failureUpdateWeather$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(WeatherActions.updateWeatherFailure),
        tap(({ name }) => {
          this.snackBarService.open(NOTIFICATION.ERROR_UPDATING_WEATHER(name), 'X');
        }),
      );
    },
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService,
    private snackBarService: SnackBarService,
  ) {}
}
