import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import * as LocationActions from './actions';
import { LocationService } from 'src/core/providers/location.service';
import { ILocation } from 'src/core/types/location.interface';

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

  constructor(
    private actions$: Actions,
    private locationService: LocationService
  ) {}
}
