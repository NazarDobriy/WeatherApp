import { Inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, Observable, of, Subscriber, switchMap, tap } from "rxjs";

import * as NavigationActions from '@core/store/navigation/actions';
import { SnackBarService } from "@core/providers/snack-bar.service";
import { WINDOW } from "@core/tokens/window.token";

@Injectable()
export class NavigationEffects {
  getNavigation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NavigationActions.getNavigation),
      switchMap(() => {
        return new Observable<GeolocationPosition>((observer: Subscriber<GeolocationPosition>) => {
          this.window.navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition) => {
              observer.next(position);
              observer.complete();
            },
            (error: GeolocationPositionError) => observer.error(error),
          );
        });
      }),
      map((position: GeolocationPosition) => {
        return NavigationActions.getNavigationSuccess({ coords: position.coords });
      }),
      catchError((error: GeolocationPositionError) => {
        return of(NavigationActions.getNavigationFailure({ error: error.message }));
      }),
    );
  });

  getNavigationFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NavigationActions.getNavigationFailure),
      tap(({ error }) => this.snackBarService.open(error, 'X')),
    );
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private snackBarService: SnackBarService,
    @Inject(WINDOW) private window: Window,
  ) {}

}
