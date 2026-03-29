import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, exhaustMap, tap } from 'rxjs';

import * as WeatherActions from './actions';
import { WeatherService } from '@core/providers/weather.service';
import { SnackBarService } from '@core/providers/snack-bar.service';
import { NOTIFICATION } from '@core/constants/notification.constants';
import { WeatherFacadeService } from '@core/providers/weather-facade.service';
import { minLoadingTime } from '@utils/index';

@Injectable()
export class WeatherEffects {
  getWeather$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherActions.getWeather),
      switchMap(({ key }) => {
        return this.weatherFacadeService.joinedWeather(key).pipe(
          map(([weather, forecasts]) => {
            return WeatherActions.getWeatherSuccess({ weather, forecasts });
          }),
          catchError((error: Error) => {
            return of(WeatherActions.getWeatherFailure({ error: error.message }));
          }),
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

  updateWeather$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherActions.updateWeather),
      exhaustMap(({ key, name }) => {
        return this.weatherFacadeService.joinedWeather(key).pipe(
          map(([weather, forecasts]) => {
            return WeatherActions.updateWeatherSuccess({ name, weather, forecasts });
          }),
          catchError((error: Error) =>
            of(WeatherActions.updateWeatherFailure({ name, error: error.message })),
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
    private weatherFacadeService: WeatherFacadeService,
  ) {}
}
