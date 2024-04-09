import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import * as LocationsActions from './actions';
import { LocationsService } from 'src/pages/home/providers/locations.service';
import { ILocation } from 'src/pages/home/types/location.interface';

@Injectable()
export class LocationsEffects {
  getLocations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LocationsActions.getLocations),
      switchMap((action: { query: string }) => {
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

  constructor(
    private actions$: Actions,
    private locationsService: LocationsService
  ) {}
}
