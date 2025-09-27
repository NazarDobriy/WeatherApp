import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import * as LocationsActions from './actions';
import { LocationsService } from '@pages/home/providers/locations.service';
import { ILocation } from '@core/types/location.interface';
import { SnackBarService } from '@core/providers/snack-bar.service';
import { Notification } from '@core/constants/notification.constants';

@Injectable()
export class LocationsEffects {
  getLocations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LocationsActions.getLocations),
      switchMap((action) => {
        return this.locationsService.getLocations(action.query).pipe(
          map((locations: ILocation[]) =>
            LocationsActions.getLocationsSuccess({ locations })
          ),
          catchError((error: Error) =>
            of(LocationsActions.getLocationsFailure({ error: error.message }))
          )
        );
      })
    );
  });

  failureGetLocations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LocationsActions.getLocationsFailure),
      tap(() => this.snackBarService.open(Notification.ERROR_SEARCHING_LOCATION,'X')),
    );
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private snackBarService: SnackBarService,
    private locationsService: LocationsService
  ) {}
}
