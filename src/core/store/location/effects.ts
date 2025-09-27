import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import * as LocationActions from './actions';
import { LocationService } from '@core/providers/location.service';
import { ILocation } from '@core/types/location.interface';
import { Notification } from '@core/constants/notification.constants';
import { SnackBarService } from '@core/providers/snack-bar.service';

@Injectable()
export class LocationEffects {
  getLocation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LocationActions.getLocation),
      switchMap((action) => {
        return this.locationService.getLocation(action.geoPosition).pipe(
          map((location: ILocation) =>
            LocationActions.getLocationSuccess({ location })
          ),
          catchError((error: Error) =>
            of(LocationActions.getLocationFailure({ error: error.message }))
          )
        );
      })
    );
  });

  failureLocation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LocationActions.getLocationFailure),
      tap(() => this.snackBarService.open(Notification.ERROR_GETTING_LOCATION, 'X')),
    );
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private locationService: LocationService,
    private snackBarService: SnackBarService,
  ) {}
}
