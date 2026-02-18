import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { routerNavigatedAction } from "@ngrx/router-store";
import { filter, map, withLatestFrom } from "rxjs";

import * as LocationActions from '@core/store/location/actions';
import { LocationStoreService } from "@core/providers/location-store.service";

@Injectable()
export class LocationRouteEffects {
  homeLocationRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(({ payload }) => {
        return payload.routerState.url.startsWith('/home');
      }),
      withLatestFrom(this.locationStore.location$),
      filter(([, location]) => !location),
      map(() => LocationActions.getLocation()),
    );
  });

  constructor(
    private actions$: Actions,
    private locationStore: LocationStoreService,
  ) {}
}
